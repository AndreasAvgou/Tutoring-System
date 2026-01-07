import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle, Calendar as CalendarIcon, Save, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * AttendanceView Component: Manages student presence logs for specific course sessions.
 */
export function AttendanceView({ allCourses = [], studentsData = [] }) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    /**
     * Effect Hook: Fetches attendance data when course or date changes.
     * 1. Checks backend for existing history.
     * 2. If no history is found, initializes a new log from student enrollment data.
     */
    useEffect(() => {
        const fetchAttendance = async () => {
            if (!selectedCourse) {
                setAttendanceList([]);
                return;
            }

            setFetching(true);
            try {
                const response = await axios.get(`/attendance/history?date=${date}&courseId=${selectedCourse}`);

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    const history = response.data.map(record => ({
                        id: record.student?.id,
                        fullName: record.student?.fullName || "Άγνωστος Μαθητής",
                        present: record.present,
                        isExisting: true
                    }));
                    setAttendanceList(history);
                } else {
                    const courseStudents = (studentsData || [])
                        .filter(student =>
                            Array.isArray(student?.courses) &&
                            student.courses.some(c => c.id?.toString() === selectedCourse)
                        )
                        .map(s => ({
                            id: s.id,
                            fullName: s.fullName || "Χωρίς Όνομα",
                            present: true,
                            isExisting: false
                        }));
                    setAttendanceList(courseStudents);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                toast.error("Σφάλμα κατά την ανάκτηση δεδομένων.");
                setAttendanceList([]);
            } finally {
                setFetching(false);
            }
        };

        fetchAttendance();
    }, [selectedCourse, date, studentsData]);

    /** Toggles local attendance status for a student */
    const toggleAttendance = (id) => {
        setAttendanceList(prev => prev.map(item =>
            item.id === id ? { ...item, present: !item.present } : item
        ));
    };

    /** Persists the entire attendance list via a batch POST request */
    const handleSave = async () => {
        if (!selectedCourse) return;
        setLoading(true);

        const payload = attendanceList.map(item => ({
            date: date,
            present: item.present,
            student: { id: item.id },
            course: { id: parseInt(selectedCourse) }
        }));

        try {
            await axios.post('/attendance/batch', payload);
            toast.success("Οι παρουσίες ενημερώθηκαν!");
        } catch (err) {
            toast.error("Αποτυχία αποθήκευσης.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-slate-800">Παρουσιολόγιο</h1>
            </header>

            <Card className="p-5 border-none shadow-sm ring-1 ring-slate-100 bg-white rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Τμήμα</label>
                        <Select onValueChange={setSelectedCourse}>
                            <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50/50 h-11">
                                <SelectValue placeholder="Επιλέξτε..." />
                            </SelectTrigger>
                            <SelectContent>
                                {(allCourses || []).map(c => (
                                    <SelectItem key={c.id} value={c.id?.toString()}>{c.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Ημερομηνία</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-slate-100 bg-slate-50/50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
            </Card>

            {fetching ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
                </div>
            ) : selectedCourse ? (
                <div className="space-y-4">
                    <div className="grid gap-3">
                        {attendanceList.length > 0 ? (
                            attendanceList.map(student => (
                                <div
                                    key={student.id}
                                    onClick={() => toggleAttendance(student.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${student.present ? 'bg-emerald-50/30 border-emerald-100' : 'bg-rose-50/30 border-rose-100'
                                        }`}
                                >
                                    <span className="font-bold text-sm">{student.fullName}</span>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${student.present ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                        }`}>
                                        {student.present ? 'Παρών' : 'Απών'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                                <p className="italic">Δεν βρέθηκαν μαθητές στο τμήμα.</p>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={handleSave}
                        disabled={loading || attendanceList.length === 0}
                        className="w-full py-7 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg"
                    >
                        {loading ? "Αποθήκευση..." : "Αποθήκευση Παρουσιών"}
                    </Button>
                </div>
            ) : (
                <div className="text-center py-20 text-slate-400 italic">
                    Επιλέξτε τμήμα για να ξεκινήσετε
                </div>
            )}
        </div>
    );
}