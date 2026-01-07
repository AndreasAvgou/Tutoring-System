import { Card, CardContent } from "@/components/ui/card";
/**
 * StatsCard: Generic presentational component for dashboard metric tiles.
 */
export function StatsCard({ title, value, icon, color }) {
    return (
        <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 tracking-wider">{title}</p>
                        <h3 className="text-3xl font-bold mt-1 text-slate-900">{value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${color}`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}