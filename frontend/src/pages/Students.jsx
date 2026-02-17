import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, Filter, Search, MoreHorizontal, User } from 'lucide-react';

const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            const localStudents = JSON.parse(localStorage.getItem('addedStudents') || '[]');
            try {
                const response = await axios.get('http://127.0.0.1:8000/students');
                // Ensure data is an array
                const data = Array.isArray(response.data) ? response.data :
                    (response.data.students || []);
                setStudents([...data, ...localStudents]);
            } catch (err) {
                console.error("Error fetching students:", err);
                setError("Failed to load students directory.");
                // Fallback / Mock Data if API fails for demo purposes
                setStudents([
                    ...localStudents,
                    {
                        student_id: 101,
                        name: "Sarah Connor",
                        program: "Computer Science",
                        email: "sarah.connor@uni.edu",
                        attendance: 92,
                        grades: 88,
                        risk_level: 'LOW',
                        risk_percentage: 12,
                        last_active: "2h ago"
                    },
                    {
                        student_id: 102,
                        name: "John Doe",
                        program: "Civil Engineering",
                        email: "john.doe@uni.edu",
                        attendance: 65,
                        grades: 54,
                        risk_level: 'HIGH',
                        risk_percentage: 89,
                        last_active: "1d ago"
                    },
                    {
                        student_id: 103,
                        name: "Emily Blunt",
                        program: "Psychology",
                        email: "emily.b@uni.edu",
                        attendance: 78,
                        grades: 72,
                        risk_level: 'MEDIUM',
                        risk_percentage: 45,
                        last_active: "5h ago"
                    },
                    {
                        student_id: 104,
                        name: "Michael Scott",
                        program: "Business Admin",
                        email: "m.scott@uni.edu",
                        attendance: 95,
                        grades: 91,
                        risk_level: 'LOW',
                        risk_percentage: 5,
                        last_active: "30m ago"
                    },
                    {
                        student_id: 105,
                        name: "Jessica Jones",
                        program: "Physics",
                        email: "j.jones@uni.edu",
                        attendance: 82,
                        grades: 79,
                        risk_level: 'MEDIUM',
                        risk_percentage: 38,
                        last_active: "3h ago"
                    },
                    {
                        student_id: 106,
                        name: "Saitama One",
                        program: "Physical Education",
                        email: "saitama@uni.edu",
                        attendance: 45,
                        grades: 60,
                        risk_level: 'HIGH',
                        risk_percentage: 92,
                        last_active: "2d ago"
                    },
                    {
                        student_id: 107,
                        name: "Tony Stark",
                        program: "Mechanical Engineering",
                        email: "tony@stark.edu",
                        attendance: 98,
                        grades: 99,
                        risk_level: 'LOW',
                        risk_percentage: 2,
                        last_active: "Active now"
                    },
                    {
                        student_id: 108,
                        name: "Bruce Banner",
                        program: "Nuclear Physics",
                        email: "bruce@uni.edu",
                        attendance: 85,
                        grades: 95,
                        risk_level: 'LOW',
                        risk_percentage: 15,
                        last_active: "1h ago"
                    },
                ]);
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
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border-2 border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-64 transition-all placeholder:text-slate-400"
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
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
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

                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 px-1">
                            <span>ID: {student.student_id}</span>
                            <span>•</span>
                            <span className="truncate max-w-[150px]">{student.email || `student${student.student_id}@uni.edu`}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Attendance</p>
                                <p className={`font-bold text-base ${student.attendance < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                                    {student.attendance}%
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Grades</p>
                                <p className={`font-bold text-base ${student.grades < 70 ? 'text-amber-600' : 'text-slate-800'}`}>
                                    {student.grades}%
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Last Active</p>
                                <p className="text-slate-600 text-sm font-medium">
                                    {student.last_active || "Recently"}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Risk Score</p>
                                <p className={`${student.risk_percentage > 50 ? 'text-rose-600' : 'text-emerald-600'} font-bold text-base`}>
                                    {student.risk_percentage}%
                                </p>
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
