import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, AlertCircle, Filter } from 'lucide-react';
import { EntityCard } from '../components/EntityCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StudentsView({
    data,
    isAdmin,
    formData,
    setFormData,
    handleSubmit,
    onSubmit,
    handleDelete,
    onDelete,
    onEdit,
    onViewReport,
    userRole,
    searchTerm,
    setSearchTerm,
    allCourses = []
}) {
    const [selectedCourse, setSelectedCourse] = useState("all");

    /**
     * Handler to prevent page refresh on form submission.
     * It attempts to call either handleSubmit or onSubmit from props.
     */
    const internalSubmit = (e) => {
        if (e) e.preventDefault();

        const saveFunction = handleSubmit || onSubmit;

        if (saveFunction) {
            console.log("Saving student data...");
            saveFunction(e);
        } else {
            console.error("Error: Save function not found in props!");
        }
    };

    /**
     * Filters the student list based on search term and selected course.
     */
    const filteredStudents = (data || []).filter(student => {
        const matchesSearch = (student?.fullName || "").toLowerCase().includes((searchTerm || "").toLowerCase());
        const matchesCourse = selectedCourse === "all" ||
            (Array.isArray(student?.courses) && student.courses.some(c => c.id?.toString() === selectedCourse));
        return matchesSearch && matchesCourse;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Διαχείριση Μαθητών</h1>
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input className="pl-10 rounded-xl" placeholder="Αναζήτηση..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </header>

            {isAdmin && (
                <Card className="p-8 border-l-8 border-l-blue-600 rounded-2xl shadow-xl">
                    <form onSubmit={internalSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <Input placeholder="Ονοματεπώνυμο" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
                        <Input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                        <Input placeholder="Τηλέφωνο" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        <Button type="submit" className="bg-blue-600 font-bold h-11 rounded-lg">Αποθήκευση</Button>
                    </form>
                </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map(item => (
                    <EntityCard
                        key={item.id}
                        item={item}
                        view="students"
                        onDelete={handleDelete || onDelete}
                        onEdit={onEdit}
                        onViewReport={onViewReport}
                        userRole={userRole}
                    />
                ))}
            </div>
        </div>
    );
}