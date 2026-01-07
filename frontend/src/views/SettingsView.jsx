import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, BookOpen, Download, Building2, Phone, MapPin, Save, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

/**
 * SettingsView Component: Admin interface for global institution settings and CSV exports.
 */
export function SettingsView() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [settings, setSettings] = useState({
        institutionName: '',
        phone: '',
        email: '',
        address: ''
    });

    /** Initial load of institution settings from public endpoint */
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await axios.get('/settings/public');
                setSettings(res.data);
            } catch (err) {
                console.error("Error loading settings", err);
            } finally {
                setFetching(false);
            }
        };
        loadSettings();
    }, []);

    /** Saves configuration changes to the backend */
    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/settings', settings);
            toast.success("Οι ρυθμίσεις ενημερώθηκαν επιτυχώς!");
        } catch (err) {
            toast.error("Σφάλμα κατά την αποθήκευση.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Data export utility to CSV.
     * Formats student/teacher data and adds UTF-8 BOM for Excel compatibility.
     */
    const handleExport = async (entity, fileName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/${entity}`);
            const data = response.data;

            if (!data || data.length === 0) {
                alert("Δεν υπάρχουν δεδομένα για εξαγωγή.");
                return;
            }

            let csvContent = "";
            if (entity === 'students') {
                csvContent = "ID,Ονοματεπώνυμο,Email,Τηλέφωνο\n";
                data.forEach(item => {
                    csvContent += `${item.id},${item.fullName},${item.email},${item.phone || '-'}\n`;
                });
            } else if (entity === 'teachers') {
                csvContent = "ID,Ονοματεπώνυμο,Email,Τηλέφωνο,Ειδικότητα\n";
                data.forEach(item => {
                    csvContent += `${item.id},${item.fullName},${item.email},${item.phone || '-'},${item.specialty || '-'}\n`;
                });
            }

            const BOM = "\uFEFF"; // Byte Order Mark for Greek characters
            const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `${fileName}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Export error:", error);
            alert("Παρουσιάστηκε σφάλμα κατά την εξαγωγή.");
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64 text-blue-600">
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Ρυθμίσεις</h1>
                <p className="text-slate-500">Διαχείριση συστήματος και εξαγωγή δεδομένων.</p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5 text-blue-600" />
                            Στοιχεία Φροντιστηρίου
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 flex items-center gap-1">
                                    <Building2 size={10} /> Όνομα Φροντιστηρίου
                                </label>
                                <Input
                                    value={settings.institutionName}
                                    onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 flex items-center gap-1">
                                    <Mail size={10} /> Email Επικοινωνίας
                                </label>
                                <Input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 flex items-center gap-1">
                                    <Phone size={10} /> Τηλέφωνο
                                </label>
                                <Input
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 flex items-center gap-1">
                                    <MapPin size={10} /> Διεύθυνση
                                </label>
                                <Input
                                    value={settings.address}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button disabled={loading} className="w-fit mt-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    Αποθήκευση Αλλαγών
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm border-l-4 border-l-orange-500">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-orange-600" />
                            Ασφάλεια & Δεδομένα
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <p className="text-sm text-slate-600">
                            Εξάγετε τα δεδομένα σας σε αρχεία CSV για το Microsoft Excel.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 border-blue-200 hover:bg-blue-50"
                                onClick={() => handleExport('students', 'Λίστα_Μαθητών')}
                            >
                                <Download size={16} /> Εξαγωγή Μαθητών
                            </Button>

                            <Button
                                variant="outline"
                                className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
                                onClick={() => handleExport('teachers', 'Λίστα_Καθηγητών')}
                            >
                                <Download size={16} /> Εξαγωγή Καθηγητών
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}