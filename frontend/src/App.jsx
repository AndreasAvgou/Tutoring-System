import { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { LoginPage } from './components/LoginPage';
import { EditModal } from './components/EditModal';
import { StudentReportModal } from './components/StudentReportModal';
import { DashboardCharts } from './components/DashboardCharts';
import { ScheduleAppointmentModal } from './components/ScheduleAppointmentModal';
import { PublicBookingPage } from './views/PublicBookingPage';
import { DashboardCalendar } from './components/DashboardCalendar.jsx';

// UI Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner';

// Views
import { StudentsView } from './views/StudentsView.jsx';
import { TeachersView } from './views/TeachersView.jsx';
import { CoursesView } from './views/CoursesView.jsx';
import { SettingsView } from './views/SettingsView.jsx';
import { AttendanceView } from './views/AttendanceView.jsx';

// Icons
import { Users, GraduationCap, BookOpen, LogOut, ArrowRight, Key, Calendar, Clock, Bell, Plus, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * AXIOS BASE CONFIGURATION
 * Centralized API endpoint setup.
 */
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  // --- APPLICATION STATES ---
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('dashboard');
  const [data, setData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [counts, setCounts] = useState({ students: 0, teachers: 0, courses: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  // --- UI & MODAL STATES ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', specialty: '',
    name: '', teacherId: '', courses: [],
    username: '', password: '',
    dayOfWeek: '', lessonTime: ''
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState(null);
  const [studentHistory, setStudentHistory] = useState([]);

  /** * Helper variables for role-based logic and routing.
   */
  const isAdmin = user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN';
  const isPublicBooking = window.location.pathname === '/book';

  /** * Helper to determine the current day name in Greek for filtering today's schedule.
   */
  const getTodayGreek = () => {
    const days = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];
    return days[new Date().getDay()];
  };
  const todayGreek = getTodayGreek();

  const todaysCourses = allCourses
    .filter(c => c.dayOfWeek === todayGreek)
    .sort((a, b) => (a.lessonTime || "").localeCompare(b.lessonTime || ""));

  /** * Effect Hook: Restores user session from localStorage on application startup.
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('tms_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      const token = btoa(`${parsedUser.username}:${parsedUser.password || 'admin123'}`);
      axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
    }
  }, []);

  /** * Effect Hook: Fetches relevant dashboard/view data whenever the view or authentication status changes.
   */
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      fetchAppointments();
    }
    setSearchTerm("");
  }, [view, isAuthenticated]);

  /** * API Call: Retrieves all scheduled appointments.
   */
  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error("Fetch Appointments Error:", err);
    }
  };

  /** * API Call: Saves a new internal appointment.
   */
  const handleSaveAppointment = async (appData) => {
    try {
      await axios.post('/appointments', appData);
      fetchAppointments();
      toast.success('Το ραντεβού προγραμματίστηκε!');
    } catch (err) {
      toast.error('Σφάλμα κατά την αποθήκευση.');
    }
  };

  /** * API Call: Updates the status of an existing appointment (Approved/Confirmed).
   */
  const handleUpdateAppointmentStatus = async (appointment, newStatus) => {
    try {
      const updatedApp = { ...appointment, status: newStatus };
      await axios.post('/appointments', updatedApp);
      fetchAppointments();
      toast.success(`Το ραντεβού ενημερώθηκε σε ${newStatus}`);
    } catch (err) {
      toast.error("Αποτυχία ενημέρωσης.");
    }
  };

  /** * API Call: Removes an appointment from the system.
   */
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Διαγραφή αυτού του ραντεβού;")) return;
    try {
      await axios.delete(`/appointments/${id}`);
      fetchAppointments();
      toast.success("Το ραντεβού διαγράφηκε.");
    } catch (err) {
      toast.error("Αποτυχία διαγραφής.");
    }
  };

  /** * Centralized Data Fetcher: Loads students, teachers, and courses based on the active view.
   * Implements teacher-specific filtering to ensure data privacy.
   */
  const fetchData = async () => {
    try {
      if (view === 'dashboard' || view === 'attendance') {
        const [s, t, c] = await Promise.all([
          axios.get('/students'),
          axios.get('/teachers'),
          axios.get('/courses')
        ]);
        setCounts({ students: s.data.length, teachers: t.data.length, courses: c.data.length });
        setData(s.data);

        // RBAC Logic: Teachers only see their assigned courses
        const displayCourses = isAdmin ? c.data : c.data.filter(course => {
          const teacherIdInCourse = course.teacher?.id;
          const loggedInTeacherId = user?.teacher?.id || user?.id;
          return teacherIdInCourse === loggedInTeacherId;
        });
        setAllCourses(displayCourses);
      } else if (view !== 'settings') {
        const res = await axios.get(`/${view}`);
        setData(res.data);
        if (view === 'courses') {
          const tRes = await axios.get('/teachers');
          setTeachers(tRes.data);
        }
        if (view === 'students') {
          const cRes = await axios.get('/courses');
          setAllCourses(cRes.data);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  /** * Admin Utility: Resets a teacher's password.
   */
  const handleResetPassword = async (teacherId) => {
    const newPassword = window.prompt("Εισάγετε τον νέο κωδικό για τον καθηγητή:");
    if (!newPassword || newPassword.length < 4) {
      toast.error("Ο κωδικός πρέπει να είναι τουλάχιστον 4 χαρακτήρες.");
      return;
    }
    try {
      await axios.post(`/auth/reset-password`, { teacherId, password: newPassword });
      toast.success('Ο κωδικός άλλαξε επιτυχώς!');
    } catch (err) {
      toast.error('Αποτυχία αλλαγής κωδικού.');
    }
  };

  /** * UI Handler: populates the edit form with selected item data.
   */
  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      ...item,
      name: item.title || item.name || '',
      teacherId: item.teacher?.id || '',
      courses: item.courses?.map(c => c.id.toString()) || [],
      username: item.username || '',
      password: '',
      dayOfWeek: item.dayOfWeek || '',
      lessonTime: item.lessonTime || ''
    });
    setIsEditModalOpen(true);
  };

  /** * API Call: Updates existing record (Student/Teacher/Course) in the database.
   */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let payload = {};
      if (view === 'students') {
        payload = { fullName: formData.fullName, email: formData.email, phone: formData.phone, courses: (formData.courses || []).map(id => ({ id: parseInt(id) })) };
      } else if (view === 'teachers') {
        payload = { fullName: formData.fullName, email: formData.email, phone: formData.phone, specialty: formData.specialty, username: formData.username, password: formData.password || null };
      } else if (view === 'courses') {
        payload = { title: formData.name, dayOfWeek: formData.dayOfWeek, lessonTime: formData.lessonTime, teacher: { id: parseInt(formData.teacherId) } };
      }
      await axios.put(`/${view}/${selectedItem.id}`, payload);
      setIsEditModalOpen(false);
      fetchData();
      toast.success('Η ενημέρωση ολοκληρώθηκε!');
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      toast.error('Σφάλμα στην ενημέρωση.');
    }
  };

  /** * API Call: Persists a new record (Student/Teacher/Course) to the database.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {};
      if (view === 'students') {
        payload = { fullName: formData.fullName, email: formData.email, phone: formData.phone, courses: (formData.courses || []).map(id => ({ id: parseInt(id) })) };
      } else if (view === 'teachers') {
        payload = { fullName: formData.fullName, email: formData.email, phone: formData.phone, specialty: formData.specialty, username: formData.username, password: formData.password };
      } else if (view === 'courses') {
        payload = { title: formData.name, dayOfWeek: formData.dayOfWeek, lessonTime: formData.lessonTime, teacher: { id: parseInt(formData.teacherId) } };
      }
      await axios.post(`/${view}`, payload);
      fetchData();
      toast.success('Η εγγραφή αποθηκεύτηκε!');
      setFormData({ fullName: '', email: '', phone: '', specialty: '', name: '', teacherId: '', courses: [], username: '', password: '', dayOfWeek: '', lessonTime: '' });
    } catch (err) {
      console.error("Submit Error:", err.response?.data);
      toast.error(err.response?.data?.message || 'Κάτι πήγε στραβά.');
    }
  };

  /** * UI Handler: Fetches and displays specific student attendance history.
   */
  const handleViewReport = async (student) => {
    try {
      const res = await axios.get(`/attendance/student/${student.id}`);
      setStudentHistory(res.data);
      setSelectedStudentForReport(student);
      setIsReportModalOpen(true);
    } catch (err) {
      toast.error("Αποτυχία φόρτωσης ιστορικού.");
    }
  };

  /** * API Call: Deletes a record from the active view.
   */
  const handleDelete = async (id) => {
    if (window.confirm("Είστε σίγουροι ότι θέλετε να προχωρήσετε σε διαγραφή;")) {
      try {
        await axios.delete(`/${view}/${id}`);
        fetchData();
        toast.success('Η διαγραφή έγινε επιτυχώς.');
      } catch (err) {
        toast.error('Αποτυχία διαγραφής.');
      }
    }
  };

  /** * Session Handler: Establishes application session and global headers.
   */
  const handleLogin = (u) => {
    setUser(u);
    setIsAuthenticated(true);
    localStorage.setItem('tms_user', JSON.stringify(u));
    const token = btoa(`${u.username}:${u.password}`);
    axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
  };

  /** * Navigation Guard: Redirects for public booking or authentication pages.
   */
  if (isPublicBooking) return <PublicBookingPage />;
  if (!isAuthenticated) return <LoginPage onLogin={handleLogin} />;

  /** * Frontend Filter: Filters list data based on search bar input and user role constraints.
   */
  const filteredData = (data || []).filter(item => {
    const matchesSearch = (item.fullName || item.name || item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    if (!isAdmin) {
      const currentUserId = user?.teacher?.id || user?.id;
      if (view === 'courses') return matchesSearch && item.teacher?.id === currentUserId;
      if (view === 'students') return matchesSearch && item.courses?.some(c => c.teacher?.id === currentUserId);
    }
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Toaster position="top-right" richColors />
      <Sidebar view={view} setView={setView} userRole={user?.role} />

      <main className="flex-1 md:pl-56 p-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Top Navigation / Session Header */}
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-lg p-1 pr-1.5 shadow-sm">
              <div className="pl-2 leading-tight border-r border-slate-50 pr-2 text-right">
                <p className="text-[8px] font-bold text-slate-400 leading-none">Συνδεδεμένος ως</p>
                <p className="text-[11px] font-bold text-slate-700 leading-none">{user?.username}</p>
              </div>
              <Button variant="ghost" onClick={() => { localStorage.clear(); window.location.reload(); }} className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                <LogOut size={13} />
              </Button>
            </div>
          </div>

          {/* DASHBOARD VIEW SECTION */}
          {view === 'dashboard' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              <div className="text-center">
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">{isAdmin ? 'Dashboard' : 'Ο Πίνακας μου'}</h1>
                <p className="text-slate-500 mt-2 font-medium">{isAdmin ? 'Στατιστικά στοιχεία φροντιστηρίου' : `Καλώς ήρθες, ${user?.username}. Δες την εικόνα των τμημάτων σου.`}</p>
              </div>

              {/* Statistical Metrics Row */}
              <div className="grid gap-8 md:grid-cols-3">
                {isAdmin ? (
                  <>
                    <StatsCard title="Μαθητές" value={counts.students} icon={<Users size={28} className="text-blue-600" />} color="bg-blue-50" />
                    <StatsCard title="Καθηγητές" value={counts.teachers} icon={<GraduationCap size={28} className="text-purple-600" />} color="bg-purple-50" />
                    <StatsCard title="Μαθήματα" value={counts.courses} icon={<BookOpen size={28} className="text-orange-600" />} color="bg-orange-50" />
                  </>
                ) : (
                  <>
                    <StatsCard title="Οι Μαθητές μου" value={data.filter(s => s.courses?.some(c => c.teacher?.id === (user?.teacher?.id || user?.id))).length} icon={<Users size={28} className="text-blue-600" />} color="bg-blue-50" />
                    <StatsCard title="Τα Μαθήματά μου" value={allCourses.length} icon={<BookOpen size={28} className="text-orange-600" />} color="bg-orange-50" />
                    <StatsCard title="Κατάσταση" value="Ενεργός" icon={<GraduationCap size={28} className="text-green-600" />} color="bg-green-50" />
                  </>
                )}
              </div>

              {/* Data Visualization & Personal Schedule Row */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {isAdmin && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="text-indigo-600" size={20} />
                        <h2 className="text-xl font-bold text-slate-800">Στατιστικά Διαγράμματα</h2>
                      </div>
                      <DashboardCharts counts={counts} />
                    </div>
                  )}

                  {!isAdmin && (
                    <Card className="p-8 border-none shadow-xl bg-white rounded-3xl ring-1 ring-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calendar size={24} /></div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">Το Πρόγραμμά μου σήμερα</h3>
                            <p className="text-slate-400 text-sm font-medium">{todayGreek}, {new Date().toLocaleDateString('el-GR')}</p>
                          </div>
                        </div>
                        <Bell className="text-slate-200" size={20} />
                      </div>
                      <div className="space-y-3">
                        {todaysCourses.length > 0 ? todaysCourses.map(course => (
                          <div key={course.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group">
                            <div className="flex items-center gap-4">
                              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 text-blue-600 font-bold text-sm min-w-[70px] text-center">{course.lessonTime}</div>
                              <div>
                                <p className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{course.title}</p>
                                <p className="text-xs text-slate-400 font-medium tracking-wider">ID: {course.id}</p>
                              </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                          </div>
                        )) : (
                          <div className="py-10 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                            <p className="text-slate-400 font-medium italic">Δεν υπάρχουν μαθήματα για σήμερα.</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </div>

                {/* Right Sidebar: Appointment Agenda for Admins or Quick Attendance Link for Teachers */}
                <div className="lg:col-span-1">
                  {isAdmin && (
                    <Card className="p-8 border-none shadow-xl bg-white rounded-3xl ring-1 ring-slate-100 sticky top-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Clock size={24} /></div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">Ατζέντα Ραντεβού</h3>
                          </div>
                        </div>
                        <Button onClick={() => setIsAppointmentModalOpen(true)} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-8 px-3 text-[10px] font-bold shadow-lg shadow-orange-100">
                          <Plus size={14} className="mr-1" /> Νέο
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {appointments.length > 0 ? appointments.map(app => (
                          <div key={app.id} className="flex flex-col p-4 bg-slate-50 rounded-2xl border border-slate-100 group transition-all">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 text-orange-600 font-bold text-[10px] min-w-[65px] text-center italic">{new Date(app.startDateTime).toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}</div>
                                <div>
                                  <p className="font-bold text-slate-700 text-sm">{app.title}</p>
                                  <p className="text-[10px] text-slate-400 font-bold line-clamp-1">{app.notes || app.student?.fullName}</p>
                                </div>
                              </div>
                              <div className={`text-[9px] font-bold px-2 py-1 rounded-full ${app.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>{app.status === 'PENDING' ? 'Εκκρεμεί' : 'Εγκρίθηκε'}</div>
                            </div>
                            <div className="flex gap-2 pt-2 border-t border-slate-200/50">
                              {app.status === 'PENDING' && (
                                <Button onClick={() => handleUpdateAppointmentStatus(app, 'CONFIRMED')} className="h-6 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold rounded-lg transition-colors ">Έγκριση</Button>
                              )}
                              <Button onClick={() => handleDeleteAppointment(app.id)} variant="ghost" className="h-6 px-3 text-rose-500 hover:bg-rose-50 text-[9px] font-bold rounded-lg transition-colors ">Διαγραφή</Button>
                            </div>
                          </div>
                        )) : (
                          <div className="py-10 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                            <p className="text-slate-400 font-medium italic text-sm">Δεν υπάρχουν ραντεβού.</p>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                  {!isAdmin && (
                    <div className="space-y-8">
                      <Card className="p-12 border-none shadow-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl overflow-hidden relative text-center">
                        <div className="relative z-10 space-y-6">
                          <h2 className="text-3xl font-bold">Παρουσιολόγιο</h2>
                          <Button onClick={() => setView('attendance')} className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 h-12 rounded-xl flex items-center gap-2 group mx-auto">Μετάβαση <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Button>
                        </div>
                        <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION: PLANNING CALENDAR (COLLAPSIBLE) */}
              <div className="pt-8 border-t border-slate-100 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-600" size={20} />
                    <h2 className="text-xl font-bold text-slate-800">Ημερολόγιο Πλάνου</h2>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setShowCalendar(!showCalendar)} className="h-8 w-8 p-0 rounded-full hover:bg-blue-50 text-blue-600 transition-all border border-blue-100">
                    {showCalendar ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </div>
                {showCalendar && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 pb-10">
                    <DashboardCalendar courses={allCourses} appointments={appointments} />
                  </div>
                )}
              </div>

            </div>
          )}

          {/* DYNAMIC VIEW ROUTING - Passing shared state and API handlers to child views */}
          {view === 'attendance' && <AttendanceView allCourses={allCourses} studentsData={data} />}
          {view === 'students' && <StudentsView data={filteredData} isAdmin={isAdmin} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleDelete={handleDelete} onEdit={openEditModal} userRole={user?.role} searchTerm={searchTerm} setSearchTerm={setSearchTerm} allCourses={allCourses} onViewReport={handleViewReport} />}
          {view === 'teachers' && <TeachersView data={filteredData} isAdmin={isAdmin} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleDelete={handleDelete} onEdit={openEditModal} onResetPassword={handleResetPassword} userRole={user?.role} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {view === 'courses' && <CoursesView data={filteredData} teachers={teachers} isAdmin={isAdmin} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleDelete={handleDelete} onEdit={openEditModal} userRole={user?.role} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
          {view === 'settings' && <SettingsView />}

          {/* SHARED MODALS */}
          <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleUpdate} formData={formData} setFormData={setFormData} view={view} teachers={teachers} allCourses={allCourses} />
          {isReportModalOpen && <StudentReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} student={selectedStudentForReport} history={studentHistory} />}
          <ScheduleAppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} students={data} onSave={handleSaveAppointment} />
        </div>
      </main>
    </div>
  );
}

export default App;