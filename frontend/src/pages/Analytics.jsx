import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';
import {
    BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart as RechartsPieChart, Pie, Cell,
    LineChart, Line
} from 'recharts';

const Analytics = () => {
    const attendanceData = [
        { name: 'Jan', attendance: 85 },
        { name: 'Feb', attendance: 82 },
        { name: 'Mar', attendance: 88 },
        { name: 'Apr', attendance: 90 },
        { name: 'May', attendance: 85 },
        { name: 'Jun', attendance: 78 },
    ];

    const riskData = [
        { name: 'Low Risk', value: 491, color: '#22c55e' },
        { name: 'Medium Risk', value: 267, color: '#eab308' },
        { name: 'High Risk', value: 98, color: '#ef4444' },
    ];

    const forecastData = [
        { month: 'Jul', rate: 12 },
        { month: 'Aug', rate: 15 },
        { month: 'Sep', rate: 18 },
        { month: 'Oct', rate: 22 },
        { month: 'Nov', rate: 20 },
        { month: 'Dec', rate: 25 },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Risk Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Attendance Trends */}
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <BarChart className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h3 className="font-semibold text-slate-800">Attendance Trends</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">Monthly attendance data analysis across all grade levels.</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" fontSize={12} stroke="#64748b" />
                                <YAxis fontSize={12} stroke="#64748b" />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }}
                                />
                                <Bar dataKey="attendance" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Risk Distribution */}
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <PieChart className="w-5 h-5 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold text-slate-800">Risk Distribution</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">Breakdown of student body by risk category.</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={riskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Dropout Forecast */}
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-rose-50 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-rose-500" />
                        </div>
                        <h3 className="font-semibold text-slate-800">Dropout Forecast</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">Predictive modeling for the upcoming semester.</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" fontSize={12} stroke="#64748b" />
                                <YAxis fontSize={12} stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                                <Line
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="#f43f5e"
                                    strokeWidth={3}
                                    dot={{ fill: '#f43f5e', strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
