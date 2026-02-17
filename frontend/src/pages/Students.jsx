import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, Filter, Search, MoreHorizontal, User } from 'lucide-react';

const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/students');
                // Ensure data is an array
                const data = Array.isArray(response.data) ? response.data :
                    (response.data.students || []);
                setStudents(data);
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to load students directory.");
                // Fallback / Mock Data if API fails for demo purposes
                setStudents([
                    { student_id: 101, attendance: 92, grades: 88, risk_level: 'LOW', risk_percentage: 12 },
                    { student_id: 102, attendance: 65, grades: 54, risk_level: 'HIGH', risk_percentage: 89 },
                    { student_id: 103, attendance: 78, grades: 72, risk_level: 'MEDIUM', risk_percentage: 45 },
                    { student_id: 104, attendance: 95, grades: 91, risk_level: 'LOW', risk_percentage: 5 },
                    { student_id: 105, attendance: 82, grades: 79, risk_level: 'MEDIUM', risk_percentage: 38 },
                    { student_id: 106, attendance: 45, grades: 60, risk_level: 'HIGH', risk_percentage: 92 },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const getRiskColor = (level) => {
        switch (level) {
            case 'LOW': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'HIGH': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getRiskBorder = (level) => {
        switch (level) {
            case 'LOW': return 'border-l-emerald-500';
            case 'MEDIUM': return 'border-l-amber-500';
            case 'HIGH': return 'border-l-rose-500';
            default: return 'border-l-slate-500';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-slate-400">
            <div className="animate-pulse flex flex-col items-center">
                <Users className="w-8 h-8 mb-2 opacity-50" />
                <span>Loading Directory...</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Students Directory</h1>
                    <p className="text-slate-400 text-sm">Monitor academic performance and risk assessments.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none w-64 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors border border-slate-800 text-slate-300">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Grid display as requested: Cards with clickable navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {students.map((student) => (
                    <div
                        key={student.student_id || Math.random()}
                        onClick={() => navigate(`/student/${student.student_id}`)}
                        className={`bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden border-l-4 ${getRiskBorder(student.risk_level)}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-slate-700 transition-colors">
                                <User className="w-6 h-6" />
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${getRiskColor(student.risk_level)}`}>
                                {student.risk_level}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1">Student #{student.student_id}</h3>
                        <p className="text-slate-500 text-xs mb-4">ID: {student.student_id}</p>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-semibold">Attendance</p>
                                <p className="text-white font-medium">{student.attendance}%</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-semibold">Grades</p>
                                <p className="text-white font-medium">{student.grades}%</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-semibold">Risk Score</p>
                                <p className={`${student.risk_percentage > 50 ? 'text-rose-400' : 'text-emerald-400'} font-bold`}>
                                    {student.risk_percentage}%
                                </p>
                            </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                ))}
            </div>

            {students.length === 0 && !loading && (
                <div className="text-center py-20 text-slate-500">
                    <p>No students found.</p>
                </div>
            )}
        </div>
    );
};

export default Students;
