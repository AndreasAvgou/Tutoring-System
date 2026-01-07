import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText, CheckCircle } from 'lucide-react';

/**
 * ScheduleAppointmentModal Component: Used by Admins to schedule internal meetings.
 */
export function ScheduleAppointmentModal({ isOpen, onClose, students, onSave }) {
    const [formData, setFormData] = useState({
        studentId: '',
        title: '',
        notes: '',
        date: '',
        time: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Format date and time into an ISO string compatible with Java LocalDateTime
        const startDateTime = `${formData.date}T${formData.time}:00`;

        onSave({
            title: formData.title,
            notes: formData.notes,
            startDateTime: startDateTime,
            status: 'PENDING',
            student: { id: parseInt(formData.studentId) }
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                <div className="bg-orange-600 p-6 text-white flex items-center gap-3">
                    <Calendar size={24} />
                    <DialogTitle className="text-xl font-bold text-white">Προγραμματισμός Ραντεβού</DialogTitle>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Μαθητής / Γονέας</label>
                        <select
                            required
                            className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        >
                            <option value="">Επιλέξτε Μαθητή...</option>
                            {students.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Θέμα</label>
                        <input
                            required
                            className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="π.χ. Ενημέρωση Γονέων"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Ημερομηνία</label>
                            <input
                                type="date"
                                required
                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Ώρα</label>
                            <input
                                type="time"
                                required
                                className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Σημειώσεις</label>
                        <textarea
                            className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                            rows="2"
                            placeholder="Λεπτομέρειες..."
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-orange-100 transition-all">
                        Αποθήκευση Ραντεβού
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}