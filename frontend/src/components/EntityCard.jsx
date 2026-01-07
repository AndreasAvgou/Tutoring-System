import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Phone, GraduationCap, Pencil, FileText, Calendar, Clock, Key } from 'lucide-react';

/**
 * EntityCard Component: A polymorphic card used to display summary information 
 * for Students, Teachers, or Courses.
 */
export function EntityCard({ item, view, onDelete, onEdit, onViewReport, onResetPassword, userRole }) {

    // Check if the current user has Administrative privileges
    const isAdmin = userRole === 'ROLE_ADMIN' || userRole === 'ADMIN';

    return (
        <Card className="overflow-hidden border-none ring-1 ring-slate-200 hover:shadow-md transition-all bg-white rounded-2xl group">
            <CardContent className="p-0">
                {/* Dynamic Indicator Bar: Blue for Students, Purple for Teachers, Orange for Courses */}
                <div className={`h-1.5 ${view === 'students' ? 'bg-blue-500' :
                    view === 'teachers' ? 'bg-purple-500' :
                        'bg-orange-500'
                    }`} />

                <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            {/* Title Display logic based on view type */}
                            <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                                {view === 'courses' ? item.title : item.fullName}
                            </h3>

                            {/* Teacher Specialty (Visible only in Teachers view) */}
                            {view === 'teachers' && item.specialty && (
                                <p className="text-xs font-bold text-purple-600 flex items-center gap-1 mt-1">
                                    <GraduationCap size={12} /> {item.specialty}
                                </p>
                            )}
                        </div>

                        {/* STUDENT ACTION: View Academic Report Button */}
                        {view === 'students' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onViewReport(item)}
                                className="h-8 w-8 text-blue-500 hover:bg-blue-50 rounded-lg shrink-0"
                                title="Προβολή Καρτέλας"
                            >
                                <FileText size={18} />
                            </Button>
                        )}
                    </div>

                    <div className="space-y-1.5 text-sm text-slate-500">
                        {/* Contact Information Section */}
                        {item.email && (
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="opacity-70" /> {item.email}
                            </div>
                        )}
                        {item.phone && (
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="opacity-70" /> {item.phone}
                            </div>
                        )}

                        {/* --- COURSE SECTION: Class Schedule --- */}
                        {view === 'courses' && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {item.dayOfWeek && (
                                    <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-[10px] font-bold border border-orange-100">
                                        <Calendar size={12} /> {item.dayOfWeek}
                                    </div>
                                )}
                                {item.lessonTime && (
                                    <div className="flex items-center gap-1.5 bg-slate-50 text-slate-700 px-2 py-1 rounded-md text-[10px] font-bold border border-slate-100">
                                        <Clock size={12} /> {item.lessonTime}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Teacher details displayed within a course card context */}
                        {view === 'courses' && item.teacher && (
                            <div className="flex items-center gap-2 font-medium text-slate-700 mt-3 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                                <GraduationCap size={14} className="text-blue-500" />
                                <span className="text-[10px] uppercase font-black text-slate-400 mr-1">Καθηγητής:</span>
                                <span className="text-xs">{item.teacher.fullName}</span>
                            </div>
                        )}
                    </div>

                    {/* ADMINISTRATIVE ACTIONS - Restricted to Admin users */}
                    {isAdmin && (
                        <div className="pt-4 border-t flex justify-end gap-1">

                            {/* TEACHER ACTION: Reset Access Credentials */}
                            {view === 'teachers' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onResetPassword(item.id)}
                                    className="text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                                    title="Επαναφορά Κωδικού"
                                >
                                    <Key size={16} />
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit(item)}
                                className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            >
                                <Pencil size={16} />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDelete(item.id)}
                                className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}