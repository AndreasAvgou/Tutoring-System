import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, AlertCircle, BookOpen, Clock, Calendar } from 'lucide-react';
import { EntityCard } from '../components/EntityCard';

/**
 * CoursesView Component: Manages institution departments, subjects, and scheduling.
 */
export function CoursesView({
    data,
    teachers,
    isAdmin,
    formData,
    setFormData,
    handleSubmit,
    onSubmit,     // Added for fallback/consistency with StudentsView logic
    handleDelete,
    onEdit,
    userRole,
    searchTerm,
    setSearchTerm
}) {

    /**
     * Internal handler to prevent page refresh on form submission.
     * Bridges the UI with the parent save function (either handleSubmit or onSubmit).
     */
    const internalSubmit = (e) => {
        if (e) e.preventDefault();

        const saveFunction = handleSubmit || onSubmit;

        if (saveFunction) {
            console.log("Saving course data...");
            saveFunction(e);
        } else {
            console.error("Error: Save function not found in props!");
        }
    };

    /** * Logic to filter courses based on the search query 
     */
    const filteredCourses = (data || []).filter(course =>
        (course.title || course.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Διαχείριση Μαθημάτων</h1>
                <div className="relative w-full max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                        className="pl-10 shadow-sm border-slate-200 rounded-xl"
                        placeholder="Αναζήτηση μαθήματος..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {/* Registration Card */}
            {isAdmin && (
                <Card className="p-8 border-l-8 border-l-orange-500 rounded-2xl shadow-xl">
                    <form onSubmit={internalSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                        <div className="space-y-2">
                            <Input
                                placeholder="Όνομα Μαθήματος"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Select
                                onValueChange={val => setFormData({ ...formData, teacherId: val })}
                                value={formData.teacherId?.toString()}
                                required
                            >
                                <SelectTrigger className="rounded-lg border-slate-200">
                                    <SelectValue placeholder="Καθηγητής" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {teachers.map(t => (
                                        <SelectItem key={t.id} value={t.id.toString()}>{t.fullName}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Select
                                onValueChange={val => setFormData({ ...formData, dayOfWeek: val })}
                                value={formData.dayOfWeek}
                                required
                            >
                                <SelectTrigger className="rounded-lg border-slate-200">
                                    <SelectValue placeholder="Ημέρα" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'].map(day => (
                                        <SelectItem key={day} value={day}>{day}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="time"
                                value={formData.lessonTime || ''}
                                onChange={e => setFormData({ ...formData, lessonTime: e.target.value })}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="bg-orange-600 hover:bg-orange-700 h-11 font-bold rounded-lg transition-all shadow-lg shadow-orange-100"
                        >
                            Αποθήκευση
                        </Button>
                    </form>
                </Card>
            )}

            {/* Courses Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map(item => (
                    <EntityCard
                        key={item.id}
                        item={item}
                        view="courses"
                        onDelete={handleDelete}
                        onEdit={onEdit}
                        userRole={userRole}
                    />
                ))}
            </div>
        </div>
    );
}