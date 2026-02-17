import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, Filter, Search, MoreHorizontal, User } from 'lucide-react';
import { mockStudents } from '../data/students';

const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            const localStudents = JSON.parse(localStorage.getItem('addedStudents') || '[]');
            try {
                // Try fetching from API but always include mock data for this demo
                const response = await axios.get('http://127.0.0.1:8000/students');
                const apiData = Array.isArray(response.data) ? response.data :
                    (response.data.students || []);

                // Combine: Local Store -> API -> Mock Data
                setStudents([...localStudents, ...apiData, ...mockStudents]);
            } catch (err) {
                console.error("Error fetching students (using fallback):", err);
                // Fallback: Local + Mock
                setStudents([...localStudents, ...mockStudents]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student =>
        student.student_id?.toString().includes(searchTerm) ||
        student.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRiskColor = (level) => {
        switch (level) {
            case 'LOW': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'MEDIUM': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'HIGH': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    const getRiskBorder = (level) => {
        switch (level) {
            case 'LOW': return 'border-l-emerald-500';
            case 'MEDIUM': return 'border-l-amber-500';
            case 'HIGH': return 'border-l-rose-500';
            default: return 'border-l-slate-400';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="animate-pulse flex flex-col items-center">
                <Users className="w-8 h-8 mb-2 opacity-50" />
                <span>Loading Directory...</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Students Directory</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor academic performance and risk assessments.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center h-10 transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-64 bg-white border-2 border-slate-200 px-3 rounded-lg' : 'w-8 bg-transparent border-none px-0 justify-center'}`}>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="flex-shrink-0 focus:outline-none"
                        >
                            <Search className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onBlur={() => !searchTerm && setIsSearchOpen(false)}
                            className={`bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 ml-2 ${isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all duration-300`}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors border-2 border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Grid display as requested: Cards with clickable navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStudents.map((student) => (
                    <div
                        key={student.student_id || Math.random()}
                        onClick={() => navigate(`/student/${student.student_id}`)}
                        className={`bg-white border border-slate-200 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all group relative overflow-hidden border-l-4 ${getRiskBorder(student.risk_level)}`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors font-bold text-lg">
                                    {student.name ? student.name.charAt(0) : <User className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 leading-tight">
                                        {student.name || `Student #${student.student_id}`}
                                    </h3>
                                    <p className="text-slate-500 text-xs">{student.program || "General Studies"}</p>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(student.risk_level)}`}>
                                {student.risk_level}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredStudents.length === 0 && !loading && (
                <div className="text-center py-20 text-slate-400">
                    <p>No students found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Students;
