import React from 'react';
import { BarChart, PieChart, TrendingUp, Users } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Risk Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <BarChart className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h3 className="font-semibold text-slate-800">Attendance Trends</h3>
                    </div>
                    <p className="text-slate-500 text-sm">Monthly attendance data analysis across all grade levels.</p>
                    <div className="h-32 mt-4 bg-slate-50 rounded flex items-center justify-center text-slate-400 text-xs border border-slate-100">
                        [Chart Placeholder]
                    </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <PieChart className="w-5 h-5 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold text-slate-800">Risk Distribution</h3>
                    </div>
                    <p className="text-slate-500 text-sm">Breakdown of student body by risk category.</p>
                    <div className="h-32 mt-4 bg-slate-50 rounded flex items-center justify-center text-slate-400 text-xs border border-slate-100">
                        [Pie Chart Placeholder]
                    </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-rose-50 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-rose-500" />
                        </div>
                        <h3 className="font-semibold text-slate-800">Dropout Forecast</h3>
                    </div>
                    <p className="text-slate-500 text-sm">Predictive modeling for the upcoming semester.</p>
                    <div className="h-32 mt-4 bg-slate-50 rounded flex items-center justify-center text-slate-400 text-xs border border-slate-100">
                        [Line Graph Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
