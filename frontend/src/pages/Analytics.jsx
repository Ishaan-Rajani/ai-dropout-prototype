import React from 'react';
import { BarChart, PieChart, TrendingUp, Users } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white mb-6">Risk Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <BarChart className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="font-semibold text-white">Attendance Trends</h3>
                    </div>
                    <p className="text-slate-400 text-sm">Monthly attendance data analysis across all grade levels.</p>
                    <div className="h-32 mt-4 bg-slate-800/50 rounded flex items-center justify-center text-slate-500 text-xs">
                        [Chart Placeholder]
                    </div>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <PieChart className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-white">Risk Distribution</h3>
                    </div>
                    <p className="text-slate-400 text-sm">Breakdown of student body by risk category.</p>
                    <div className="h-32 mt-4 bg-slate-800/50 rounded flex items-center justify-center text-slate-500 text-xs">
                        [Pie Chart Placeholder]
                    </div>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-rose-500/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-rose-400" />
                        </div>
                        <h3 className="font-semibold text-white">Dropout Forecast</h3>
                    </div>
                    <p className="text-slate-400 text-sm">Predictive modeling for the upcoming semester.</p>
                    <div className="h-32 mt-4 bg-slate-800/50 rounded flex items-center justify-center text-slate-500 text-xs">
                        [Line Graph Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
