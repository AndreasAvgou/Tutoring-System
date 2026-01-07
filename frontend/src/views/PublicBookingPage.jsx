import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Calendar,
    Clock,
    User,
    Phone,
    MapPin,
    Mail,
    ArrowLeft,
    MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * PublicBookingPage Component: Provides a public-facing interface for parents/students
 * to book appointments without requiring authentication.
 * It interacts with the Settings API to display contact info and submits
 * appointment requests to the backend.
 */
export function PublicBookingPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', reason: 'Ενημέρωση/Εγγραφή' });

    // State to store institution settings (contact details) fetched from the backend
    const [settings, setSettings] = useState({
        institutionName: 'Φροντιστήριο TMS',
        phone: 'Φόρτωση...',
        email: 'Φόρτωση...',
        address: 'Φόρτωση...'
    });

    /**
     * Effect Hook: Fetches the public institution configuration on component mount.
     * Hits the /settings/public endpoint to populate the contact section.
     */
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('/settings/public');
                setSettings(res.data);
            } catch (err) {
                console.error("Could not load institution settings");
            }
        };
        fetchSettings();
    }, []);

    /**
     * Handles the submission of the public appointment form.
     * Formats the payload and sets the initial status to 'PENDING' 
     * for administrative approval in the dashboard.
     */
    const handlePublicSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title: `ΔΗΜΟΣΙΑ ΚΡΑΤΗΣΗ: ${form.reason}`,
                notes: `Γονέας: ${form.name} | Τηλ: ${form.phone}`,
                startDateTime: `${form.date}T${form.time}:00`,
                status: 'PENDING'
            };
            await axios.post('/appointments/public', payload);
            setIsSubmitted(true);
        } catch (err) {
            toast.error("Κάτι πήγε στραβά. Παρακαλώ καλέστε μας στο τηλέφωνο.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Success View: Rendered after the appointment request is successfully processed.
     */
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
                <Card className="max-w-2xl w-full p-0 overflow-hidden rounded-[40px] shadow-2xl bg-white border-none animate-in zoom-in duration-500">
                    <div className="bg-emerald-500 p-12 text-center text-white relative overflow-hidden">
                        <CheckCircle2 size={120} className="mx-auto mb-4 opacity-20 absolute -right-10 -top-10" />
                        <div className="relative z-10">
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                                <CheckCircle2 size={40} className="text-white" />
                            </div>
                            <h2 className="text-4xl font-black mb-2">Επιτυχής Καταχώρηση!</h2>
                            <p className="text-emerald-50 font-medium">Σας ευχαριστούμε για την εμπιστοσύνη σας.</p>
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="text-center space-y-2">
                            <p className="text-slate-500 leading-relaxed">
                                Το αίτημά σας για ραντεβού την <strong className="text-slate-900">{new Date(form.date).toLocaleDateString('el-GR')}</strong> στις <strong className="text-slate-900">{form.time}</strong> έχει ληφθεί. <br />
                                Θα επικοινωνήσουμε μαζί σας σύντομα στο <strong className="text-slate-900">{form.phone}</strong> για την τελική επιβεβαίωση.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Στοιχεία Επικοινωνίας</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Phone size={16} /></div>
                                        {settings.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail size={16} /></div>
                                        {settings.email}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Τοποθεσία</h4>
                                <div className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><MapPin size={16} /></div>
                                    {settings.address}
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => window.location.pathname = '/'}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-2 transition-all"
                        >
                            <ArrowLeft size={18} /> Επιστροφή στην Αρχική
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    /**
     * Main Form View: Public booking form interface.
     */
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 flex items-center justify-center text-slate-900 font-sans">
            <div className="max-w-xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Tutoring Management System</h1>
                    <p className="text-slate-500 font-medium">Προγραμματίστε μια συνάντηση με τη διεύθυνση</p>
                </div>

                <Card className="p-8 md:p-10 rounded-[32px] shadow-2xl border-none bg-white ring-1 ring-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <MessageSquare size={100} />
                    </div>

                    <form onSubmit={handlePublicSubmit} className="space-y-5 relative z-10">
                        <div className="grid gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Ονοματεπώνυμο</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                                    <input required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                                        placeholder="" onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Κινητό Τηλέφωνο</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-slate-300" size={18} />
                                    <input required type="tel" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                                        placeholder="" onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Ημερομηνία</label>
                                    <input required type="date" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                        onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Ώρα</label>
                                    <input required type="time" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                        onChange={e => setForm({ ...form, time: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <Button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-2xl text-lg shadow-xl shadow-blue-100 transition-all active:scale-95">
                            {loading ? "Αποστολή..." : "Κλείσιμο Ραντεβού"}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}