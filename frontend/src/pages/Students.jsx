import React from 'react';
import { User, MoreHorizontal, Filter } from 'lucide-react';

const Students = () => {
    // Placeholder Data
    const students = [
        { id: 1, name: "Alice Smith", grade: "10th", risk: "Low", lastActive: "2 hours ago" },
        { id: 2, name: "Bob Johnson", grade: "11th", risk: "High", lastActive: "1 day ago" },
        { id: 3, name: "Charlie Brown", grade: "9th", risk: "Medium", lastActive: "5 mins ago" },
        { id: 4, name: "David Wilson", grade: "12th", risk: "Low", lastActive: "3 days ago" },
        { id: 5, name: "Eva Davis", grade: "10th", risk: "Medium", lastActive: "Just now" },
    ];

    const getRiskBadge = (risk) => {
        switch (risk) {
            case 'Low': return <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md text-xs font-semibold border border-emerald-500/20">LOW</span>;
            case 'Medium': return <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md text-xs font-semibold border border-amber-500/20">MEDIUM</span>;
            case 'High': return <span className="bg-rose-500/10 text-rose-400 px-2 py-1 rounded-md text-xs font-semibold border border-rose-500/20">HIGH</span>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Students Directory</h1>
                    <p className="text-slate-400 text-sm">Manage and monitor student profiles.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700 text-slate-300">
                    <Filter className="w-4 h-4" />
                    Filter List
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-950/50 uppercase tracking-wider font-semibold text-xs text-slate-500 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4">Grade Level</th>
                            <th className="px-6 py-4">Risk Status</th>
                            <th className="px-6 py-4">Last Activity</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                                        <User className="w-4 h-4" />
                                    </div>
                                    {student.name}
                                </td>
                                <td className="px-6 py-4">{student.grade}</td>
                                <td className="px-6 py-4">{getRiskBadge(student.risk)}</td>
                                <td className="px-6 py-4">{student.lastActive}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;
