import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

/**
 * EditModal: Polymorphic component for updating Student, Teacher, or Course details.
 */
export function EditModal({ isOpen, onClose, onSave, formData, setFormData, view, teachers, allCourses }) {

    /** Logic for toggling course selection in the student's list */
    const handleCourseToggle = (courseId) => {
        const currentCourses = formData.courses || [];
        const courseIdStr = courseId.toString();
        const isSelected = currentCourses.includes(courseIdStr);

        if (isSelected) {
            setFormData({
                ...formData,
                courses: currentCourses.filter(id => id !== courseIdStr)
            });
        } else {
            setFormData({
                ...formData,
                courses: [...currentCourses, courseIdStr]
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-[2rem] p-8 bg-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
                        Επεξεργασία {view === 'students' ? 'Μαθητή' : view === 'teachers' ? 'Καθηγητή' : 'Μαθήματος'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSave} className="space-y-5 mt-4">
                    {/* COMMON FIELDS: Name, Email, Phone */}
                    {(view === 'students' || view === 'teachers') && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Ονοματεπώνυμο</Label>
                                <Input className="rounded-xl border-slate-100 bg-slate-50/50" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Email</Label>
                                    <Input className="rounded-xl border-slate-100 bg-slate-50/50" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Τηλέφωνο</Label>
                                    <Input className="rounded-xl border-slate-100 bg-slate-50/50" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STUDENT-SPECIFIC: Course Enrollment Selection List */}
                    {view === 'students' && (
                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            <Label className="text-xs font-bold text-blue-600 uppercase ml-1 tracking-wider">Εγγραφή σε Μαθήματα</Label>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {allCourses && allCourses.length > 0 ? (
                                    allCourses.map(course => (
                                        <div
                                            key={course.id}
                                            onClick={() => handleCourseToggle(course.id)}
                                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${formData.courses?.includes(course.id.toString())
                                                ? 'border-blue-500 bg-blue-50/50'
                                                : 'border-slate-100 bg-slate-50/30 hover:border-slate-200'
                                                }`}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-700">{course.title}</span>
                                                <span className="text-[10px] text-slate-400 uppercase font-medium">{course.dayOfWeek} • {course.lessonTime}</span>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.courses?.includes(course.id.toString())
                                                ? 'bg-blue-500 border-blue-500'
                                                : 'border-slate-200'
                                                }`}>
                                                {formData.courses?.includes(course.id.toString()) && (
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-400 italic">Δεν υπάρχουν διαθέσιμα μαθήματα.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TEACHER-SPECIFIC: Specialty and Portal Credentials */}
                    {view === 'teachers' && (
                        <div className="space-y-4 pt-2 border-t border-slate-50">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Ειδικότητα</Label>
                                <Input className="rounded-xl border-slate-100 bg-slate-50/50" value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Username</Label>
                                    <Input
                                        className="rounded-xl border-slate-100 bg-slate-50/50"
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Νέος Κωδικός</Label>
                                    <Input
                                        className="rounded-xl border-slate-100 bg-slate-50/50"
                                        type="password"
                                        placeholder="Αφήστε κενό"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* COURSE-SPECIFIC: Scheduling Details (Teacher, Day, Time) */}
                    {view === 'courses' && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Τίτλος Μαθήματος</Label>
                                <Input className="rounded-xl border-slate-100 bg-slate-50/50" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Καθηγητής</Label>
                                <Select onValueChange={val => setFormData({ ...formData, teacherId: val })} value={formData.teacherId?.toString()}>
                                    <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50/50"><SelectValue /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {teachers.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.fullName}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Ημέρα</Label>
                                    <Select onValueChange={val => setFormData({ ...formData, dayOfWeek: val })} value={formData.dayOfWeek}>
                                        <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50/50"><SelectValue /></SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Ώρα</Label>
                                    <Input className="rounded-xl border-slate-100 bg-slate-50/50" type="time" value={formData.lessonTime} onChange={e => setFormData({ ...formData, lessonTime: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="pt-6 gap-2">
                        <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl text-slate-400">Ακύρωση</Button>
                        <Button type="submit" className="bg-slate-900 hover:bg-black text-white px-8 rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95">Ενημέρωση Στοιχείων</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}