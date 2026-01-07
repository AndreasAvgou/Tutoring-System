import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, User, XCircle, CheckCircle, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";

/**
 * StudentReportModal Component: Displays a detailed academic profile and attendance history.
 * Includes a print functionality that generates a professional A4 report.
 */
export function StudentReportModal({ isOpen, onClose, student, history = [] }) {
    if (!student) return null;

    // Calculation logic for presence statistics
    const totalLessons = (history || []).length;
    const totalAbsences = (history || []).filter(h => h.present === false || h.status === 'ABSENT' || h.status === 'ΑΠΩΝ').length;
    const presenceRate = totalLessons > 0 ? Math.round(((totalLessons - totalAbsences) / totalLessons) * 100) : 0;

    /**
     * handlePrint: Dynamically creates an off-screen iframe to generate 
     * a styled PDF/Printable version of the student's status.
     */
    const handlePrint = () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const printWindow = iframe.contentWindow;
        const doc = printWindow.document;

        const htmlContent = `
            <html>
                <head>
                    <title>Αναφορά - ${student.fullName}</title>
                    <style>
                        @page { size: A4; margin: 15mm; }
                        html, body { height: 100%; margin: 0; padding: 0; }
                        body { 
                            font-family: 'Segoe UI', Arial, sans-serif; 
                            display: flex; 
                            flex-direction: column; 
                            color: #1e293b;
                        }
                        .content-wrapper { flex: 1; } /* Pushes footer to the bottom */
                        
                        .header { display: flex; justify-content: space-between; border-bottom: 3px solid #000; padding-bottom: 15px; margin-bottom: 30px; }
                        .school-name { font-size: 26px; font-weight: 900; letter-spacing: -1px; }
                        .report-title { font-size: 14px; color: #64748b; font-weight: bold; }
                        
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; }
                        .info-item { font-size: 14px; }
                        
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th { background: #f1f5f9; border-bottom: 2px solid #000; padding: 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
                        td { padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
                        .status-present { color: #059669; font-weight: bold; }
                        .status-absent { color: #dc2626; font-weight: bold; }
                        
                        .stats-footer { margin-top: 30px; display: flex; justify-content: flex-end; }
                        .stats-table { border: 2px solid #000; padding: 15px; width: 220px; background: #fff; }
                        .stats-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; }
                        .final-rate { border-top: 2px solid #000; margin-top: 10px; padding-top: 10px; font-weight: 900; font-size: 16px; }
                        
                        .signatures { 
                            margin-top: 50px; 
                            padding-top: 20px;
                            display: flex; 
                            justify-content: space-between; 
                            padding-bottom: 20px;
                        }
                        .sig-box { width: 220px; border-top: 2px solid #000; text-align: center; padding-top: 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
                    </style>
                </head>
                <body>
                    <div class="content-wrapper">
                        <div class="header">
                            <div>
                                <div class="school-name">ΕΚΠΑΙΔΕΥΤΙΚΟΣ ΟΜΙΛΟΣ</div>
                                <div class="report-title">Επίσημη Κατάσταση Παρουσιών</div>
                            </div>
                            <div style="text-align: right; font-size: 11px; font-weight: bold;">
                                ΕΚΔΟΣΗ: ${new Date().toLocaleDateString('el-GR')}<br>
                                ΜΑΘΗΤΗΣ ID: #${student.id}
                            </div>
                        </div>

                        <div class="info-grid">
                            <div class="info-item"><strong>Ονοματεπώνυμο:</strong> ${student.fullName}</div>
                            <div class="info-item"><strong>Email:</strong> ${student.email}</div>
                            <div class="info-item"><strong>Τηλέφωνο:</strong> ${student.phone}</div>
                            <div class="info-item"><strong>Συνολική Φοίτηση:</strong> ${presenceRate}%</div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Ημερομηνία</th>
                                    <th>Μάθημα / Τμήμα</th>
                                    <th style="text-align: right;">Κατάσταση</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${history.sort((a, b) => new Date(b.date) - new Date(a.date)).map(record => `
                                    <tr>
                                        <td>${new Date(record.date).toLocaleDateString('el-GR')}</td>
                                        <td><strong>${record.course?.title || 'Πληροφορική'}</strong></td>
                                        <td style="text-align: right;" class="${record.present || record.status === 'PRESENT' || record.status === 'ΠΑΡΩΝ' ? 'status-present' : 'status-absent'}">
                                            ${record.present || record.status === 'PRESENT' || record.status === 'ΠΑΡΩΝ' ? 'ΠΑΡΩΝ' : 'ΑΠΩΝ'}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="stats-footer">
                            <div class="stats-table">
                                <div class="stats-row"><span>Σύνολο:</span> <span>${totalLessons}</span></div>
                                <div class="stats-row"><span>Απουσίες:</span> <span>${totalAbsences}</span></div>
                                <div class="stats-row final-rate"><span>ΠΟΣΟΣΤΟ:</span> <span>${presenceRate}%</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="signatures">
                        <div class="sig-box">ΣΦΡΑΓΙΔΑ ΕΚΠΑΙΔΕΥΤΗΡΙΟΥ</div>
                        <div class="sig-box">ΥΠΟΓΡΑΦΗ ΔΙΕΥΘΥΝΣΗΣ</div>
                    </div>
                </body>
            </html>
        `;

        doc.open();
        doc.write(htmlContent);
        doc.close();

        iframe.onload = () => {
            printWindow.focus();
            printWindow.print();
            setTimeout(() => document.body.removeChild(iframe), 1000);
        };
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                {/* On-screen User Interface Header */}
                <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-500 p-2 rounded-xl text-white">
                            <User size={24} />
                        </div>
                        <DialogTitle className="text-xl font-bold text-white">Καρτέλα Μαθητή</DialogTitle>
                    </div>
                    <Button onClick={handlePrint} variant="secondary" className="gap-2 font-bold bg-white text-slate-900 hover:bg-slate-200 transition-all active:scale-95">
                        <Printer size={18} /> Εκτύπωση
                    </Button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{student.fullName}</h2>
                            <p className="text-slate-500 font-medium">{student.email} • {student.phone}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center min-w-[100px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Φοίτηση</p>
                            <p className={`text-3xl font-black ${presenceRate > 80 ? 'text-emerald-500' : 'text-orange-500'}`}>
                                {presenceRate}%
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center">
                            <span className="text-2xl font-black text-blue-700">{totalLessons}</span>
                            <span className="text-[10px] font-bold text-blue-400 uppercase">Μαθήματα</span>
                        </div>
                        <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex flex-col items-center">
                            <span className="text-2xl font-black text-rose-700">{totalAbsences}</span>
                            <span className="text-[10px] font-bold text-rose-400 uppercase">Απουσίες</span>
                        </div>
                        <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center">
                            <span className="text-2xl font-black text-emerald-700">{totalLessons - totalAbsences}</span>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase">Παρουσίες</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Πρόσφατο Ιστορικό</h3>
                        <div className="border border-slate-100 rounded-2xl divide-y divide-slate-50 max-h-48 overflow-y-auto custom-scrollbar">
                            {history.length > 0 ? (
                                history.map((record, i) => (
                                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700">{new Date(record.date).toLocaleDateString('el-GR')}</span>
                                            <span className="text-xs text-slate-400 font-medium">{record.course?.title || 'Μάθημα'}</span>
                                        </div>
                                        {record.present || record.status === 'PRESENT' || record.status === 'ΠΑΡΩΝ' ?
                                            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-bold">
                                                <CheckCircle size={12} /> ΠΑΡΩΝ
                                            </div> :
                                            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-[10px] font-bold">
                                                <XCircle size={12} /> ΑΠΩΝ
                                            </div>
                                        }
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-400 italic text-sm">Δεν υπάρχει ιστορικό παρουσιών.</div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}