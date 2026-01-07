import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Lock, User, Calendar, HelpCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

/**
 * LoginPage Component: Entry point for user authentication and password recovery requests.
 */
export function LoginPage({ onLogin }) {
    // --- COMPONENT STATES ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // States for the Forgot Password workflow
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [forgotUsername, setForgotUsername] = useState('');

    // --- SUBMISSION HANDLERS ---

    /** Authenticates the user and initiates the session */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            onLogin(response.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Λάθος όνομα χρήστη ή κωδικός.');
            } else {
                setError('Αδυναμία σύνδεσης με τον διακομιστή.');
            }
        } finally {
            setLoading(false);
        }
    };

    /** Sends a password reset request to the administrative backend */
    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Backend call to log the reset request
            await axios.post('http://localhost:8080/api/auth/forgot-password', { username: forgotUsername });

            toast.success("Το αίτημα στάλθηκε! Ο διαχειριστής θα ενημερωθεί για την επαναφορά.");
            setIsForgotMode(false);
            setForgotUsername('');
        } catch (err) {
            // Enforce specified error message for missing usernames
            setError("Το όνομα χρήστη δεν βρέθηκε στο σύστημα.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <Card className="w-full max-w-md border-none shadow-xl bg-white rounded-[32px] overflow-hidden">
                <CardHeader className="text-center space-y-2 pb-8 pt-10">
                    <div className="flex justify-center mb-2">
                        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
                            <GraduationCap className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-800">
                        {isForgotMode ? "Επαναφορά Κωδικού" : "Tutoring Management System"}
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        {isForgotMode
                            ? "Εισάγετε το όνομα χρήστη σας για αίτημα νέου κωδικού"
                            : "Εισάγετε τα στοιχεία σας για πρόσβαση στο σύστημα"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8">
                    {!isForgotMode ? (
                        /* --- LOGIN FORM SECTION --- */
                        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 ml-1 flex items-center gap-1">
                                    <User size={14} className="text-blue-500" /> Όνομα χρήστη
                                </label>
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder=""
                                    required
                                    className="bg-slate-50 border-slate-100 h-12 rounded-xl focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 ml-1 flex items-center gap-1">
                                    <Lock size={14} className="text-blue-500" /> Κωδικός πρόσβασης
                                </label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=""
                                    required
                                    className="bg-slate-50 border-slate-100 h-12 rounded-xl focus:ring-blue-500 transition-all"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center font-medium animate-in zoom-in-95 duration-300">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full h-12 font-bold text-base shadow-lg shadow-blue-100 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all active:scale-[0.98]"
                                    disabled={loading}
                                >
                                    {loading ? "Σύνδεση..." : "Είσοδος στο Σύστημα"}
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => { setIsForgotMode(true); setError(''); }}
                                        className="text-sm text-slate-400 hover:text-blue-600 transition-colors font-medium flex items-center justify-center gap-1 mx-auto"
                                    >
                                        <HelpCircle size={14} />
                                        Ξέχασες τον κωδικό σου;
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        /* --- FORGOT PASSWORD FORM SECTION --- */
                        <form onSubmit={handleForgotSubmit} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 ml-1 flex items-center gap-1">
                                    <User size={14} className="text-orange-500" /> Εισάγετε το Username σας
                                </label>
                                <Input
                                    value={forgotUsername}
                                    onChange={(e) => setForgotUsername(e.target.value)}
                                    placeholder=""
                                    required
                                    className="bg-slate-50 border-slate-100 h-12 rounded-xl focus:ring-orange-500 transition-all"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center font-bold animate-in fade-in duration-300">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full h-12 font-bold text-base bg-orange-500 hover:bg-orange-600 rounded-xl transition-all shadow-lg shadow-orange-100"
                                    disabled={loading}
                                >
                                    {loading ? "Αποστολή..." : "Αίτημα Επαναφοράς"}
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => { setIsForgotMode(false); setError(''); }}
                                        className="text-sm text-blue-600 hover:underline transition-colors font-bold flex items-center justify-center gap-1 mx-auto"
                                    >
                                        <ArrowLeft size={14} />
                                        Επιστροφή στη Σύνδεση
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Parent/External Appointments Section */}
                    <div className="mt-8 pt-6 border-t border-slate-50 text-center mb-4">
                        <p className="text-xs text-slate-400 mb-4 font-medium italic">
                            Είστε γονέας και θέλετε να προγραμματίσετε μια συνάντηση;
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.location.pathname = '/book'}
                            className="w-full border-orange-100 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl font-bold h-12 border-2 transition-all group"
                        >
                            <Calendar className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                            Κλείστε ραντεβού εδώ
                        </Button>
                    </div>
                </CardContent>

                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-[9px] text-slate-400 tracking-widest font-bold uppercase">
                        Tutoring Management System v1.0
                    </p>
                </div>
            </Card>
        </div>
    );
}