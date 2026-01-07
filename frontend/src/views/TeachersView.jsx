import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle } from 'lucide-react';
import { EntityCard } from '../components/EntityCard';

/**
 * TeachersView Component: Management dashboard for tutor profiles.
 * Registration section now mirrors the minimal StudentsView design.
 */
export function TeachersView({
    data,
    isAdmin,
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    onEdit,
    onResetPassword,
    userRole,
    searchTerm,
    setSearchTerm
}) {

    /** Prevents default refresh and calls the save handler */
    const internalSubmit = (e) => {
        if (e) e.preventDefault();
        handleSubmit(e);
    };

    /** Filters teachers based on the search string */
    const filteredTeachers = (data || []).filter(t =>
        (t.fullName || "").toLowerCase().includes((searchTerm || "").toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Διαχείριση Καθηγητών</h1>
                <div className="relative w-full max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                        className="pl-10 shadow-sm border-slate-200 rounded-xl"
                        placeholder="Αναζήτηση καθηγητή..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {/* Registration Card */}
            {isAdmin && (
                <Card className="p-8 border-l-8 border-l-purple-600 rounded-2xl shadow-xl">
                    <form onSubmit={internalSubmit} className="space-y-6">
                        {/* Profile Info Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <Input placeholder="Ονοματεπώνυμο" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
                            <Input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                            <Input placeholder="Τηλέφωνο" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            <Input placeholder="Ειδικότητα (π.χ. Φυσικός)" value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} required />
                        </div>

                        {/* Security Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <Input placeholder="Username" value={formData.username || ''} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
                            <Input placeholder="Password" type="password" value={formData.password || ''} onChange={e => setFormData({ ...formData, password: e.target.value })} required={!formData.id} />
                            <div className="hidden md:block" /> {/* Spacer */}
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 h-11 font-bold shadow-lg shadow-purple-100 rounded-lg transition-all text-white">
                                Αποθήκευση
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map(item => (
                        <EntityCard key={item.id} item={item} view="teachers" onDelete={handleDelete} onEdit={onEdit} onResetPassword={onResetPassword} userRole={userRole} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                        <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
                        <p className="italic font-medium text-slate-500">Δεν βρέθηκαν καθηγητές.</p>
                    </div>
                )}
            </div>
        </div>
    );
}