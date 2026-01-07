import { LayoutDashboard, Users, GraduationCap, BookOpen, Settings, CheckSquare } from 'lucide-react';

/**
 * Sidebar Component: Primary navigation menu.
 * Implements Role-Based Access Control (RBAC) to conditionally show/hide administrative views.
 */
export function Sidebar({ view, setView, userRole }) {
    // Determine administrative privileges based on the current user's role
    const isAdmin = userRole === 'ROLE_ADMIN' || userRole === 'ADMIN';

    return (
        <aside className="w-50 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full shadow-sm">

            {/* Logo and Branding Section */}
            <div className="p-5 text-lg font-extrabold text-blue-600 flex items-center gap-2">
                < GraduationCap className="w-6 h-6 shrink-0" />
                <span className="tracking-tighter leading-tight">Tutoring Management System</span>
            </div>

            {/* Main Navigation Menu Links */}
            <nav className="flex-1 px-3 space-y-1">
                <NavItem
                    icon={<LayoutDashboard size={18} />}
                    label="Αρχική"
                    active={view === 'dashboard'}
                    onClick={() => setView('dashboard')}
                />

                <NavItem
                    icon={<Users size={18} />}
                    label="Μαθητές"
                    active={view === 'students'}
                    onClick={() => setView('students')}
                />

                {/* Conditional Rendering: Tutors are only visible to system Administrators */}
                {isAdmin && (
                    <NavItem
                        icon={<GraduationCap size={18} />}
                        label="Καθηγητές"
                        active={view === 'teachers'}
                        onClick={() => setView('teachers')}
                    />
                )}

                <NavItem
                    icon={<BookOpen size={18} />}
                    label="Μαθήματα"
                    active={view === 'courses'}
                    onClick={() => setView('courses')}
                />

                <NavItem
                    icon={<CheckSquare size={18} />}
                    label="Παρουσιολόγιο"
                    active={view === 'attendance'}
                    onClick={() => setView('attendance')}
                />

                {/* Global Configuration settings: Admin Access Only */}
                {isAdmin && (
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <NavItem
                            icon={<Settings size={18} />}
                            label="Ρυθμίσεις"
                            active={view === 'settings'}
                            onClick={() => setView('settings')}
                        />
                    </div>
                )}
            </nav>

            {/* Footer Section: Displays the active user session mode */}
            <div className="p-4 border-t border-slate-100">
                <p className="text-[9px] text-slate-400 text-center uppercase font-bold tracking-widest">
                    v1.0 {isAdmin ? 'Admin' : 'Teacher'} Mode
                </p>
            </div>
        </aside>
    );
}

/** * NavItem: Reusable sub-component for sidebar navigation buttons.
 */
function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <span className={active ? 'text-white' : 'text-slate-400'}>
                {icon}
            </span>
            {label}
        </button>
    );
}