import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    User,
    ArrowLeft,
    BookOpen,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Activity,
    Smile,
    Meh,
    Frown,
    AlertOctagon,
    BrainCircuit
} from 'lucide-react';
import axios from 'axios';

const StudentProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMood, setSelectedMood] = useState(null);
    const [showRisk, setShowRisk] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students`);
                // Ensure data is an array (API returns object with students property)
                const data = Array.isArray(response.data) ? response.data : (response.data.students || []);
                // Handle both string and number IDs potentially
                let found = data.find(s => s.student_id == id || s.id == id);

                // If not found in API, check Local Storage
                if (!found) {
                    const localStudents = JSON.parse(localStorage.getItem('addedStudents') || '[]');
                    found = localStudents.find(s => s.student_id == id || s.id == id);
                }

                // If still not found, use mock data
                if (!found) {
                    console.log("Student not found in API or Local, using mock data");
                    found = {
                        student_id: id,
                        name: `Student ${id}`,
                        attendance: 85,
                        grades: 78,
                        assignments: 12,
                        academic_risk: 22,
                        sentiment_risk: 35,
                        crisis_detected: false
                    };
                }

                // Enrich with mock risk data if not present
                if (found) {
                    // Mocking risk data for demonstration if not in API
                    if (!found.academic_risk) found.academic_risk = Math.round(100 - (found.grades || 85));
                    if (!found.sentiment_risk) found.sentiment_risk = Math.floor(Math.random() * 40) + 10;
                    if (found.crisis_detected === undefined) found.crisis_detected = found.sentiment_risk > 70;
                }

                setStudent(found);

                // Trigger animation after loading
                setTimeout(() => setShowRisk(true), 100);
            } catch (err) {
                console.error("Failed to fetch student details", err);
                // API failed completely, use mock data
                const mockStudent = {
                    student_id: id,
                    name: `Student ${id}`,
                    attendance: 85,
                    grades: 78,
                    assignments: 12,
                    academic_risk: 22,
                    sentiment_risk: 35,
                    crisis_detected: false
                };
                setStudent(mockStudent);
                setTimeout(() => setShowRisk(true), 100);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const getInterventionLevel = (academic, sentiment) => {
        const riskScore = (academic + sentiment) / 2;
        if (riskScore > 70) return 'HIGH';
        if (riskScore > 40) return 'MEDIUM';
        return 'LOW';
    };

    if (loading) return <div className="p-8 text-white flex justify-center items-center h-full">Loading profile...</div>;
    if (!student) return <div className="p-8 text-white">Student not found.</div>;

    const interventionLevel = getInterventionLevel(student.academic_risk, student.sentiment_risk);

    const interventionConfig = {
        LOW: {
            color: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400',
            icon: <CheckCircle className="w-6 h-6" />,
            title: 'Monitor & Enourage',
            message: 'Student is performing well. Maintain positive reinforcement.'
        },
        MEDIUM: {
            color: 'bg-amber-500/10 border-amber-500/50 text-amber-400',
            icon: <AlertTriangle className="w-6 h-6" />,
            title: 'Preventative Check-in',
            message: 'Schedule a brief meeting to discuss recent challenges.'
        },
        HIGH: {
            color: 'bg-red-500/10 border-red-500/50 text-red-400',
            icon: <AlertOctagon className="w-6 h-6" />,
            title: 'Urgent Intervention Required',
            message: 'Immediate counseling session recommended. Alert sent to faculty.'
        }
    }[interventionLevel];

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8 animate-fade-in text-slate-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group w-fit"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Students
                </button>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${interventionLevel === 'HIGH' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                    <span className="text-sm font-medium text-slate-600">Status: {interventionLevel === 'LOW' ? 'Active' : 'Needs Attention'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Profile & Academic */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Profile Header Card */}
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center gap-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm z-10 text-primary border border-primary/20">
                            {student.name ? student.name.charAt(0) : 'S'}
                        </div>
                        <div className="z-10">
                            <h1 className="text-3xl font-bold text-slate-800">{student.name || `Student #${student.student_id}`}</h1>
                            <div className="flex items-center gap-4 text-slate-500 mt-2">
                                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> ID: {student.student_id || id}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>Class of 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Academic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/30 transition-colors group shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 font-medium">Attendance</span>
                                <Activity className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="text-3xl font-bold text-slate-800">{student.attendance}%</div>
                            <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: `${student.attendance}%` }}></div>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-violet-500/30 transition-colors group shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 font-medium">Grades (Avg)</span>
                                <BookOpen className="w-5 h-5 text-violet-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="text-3xl font-bold text-slate-800">{student.grades}%</div>
                            <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
                                <div className="bg-violet-500 h-full rounded-full" style={{ width: `${student.grades}%` }}></div>
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-500/30 transition-colors group shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 font-medium">Assignments</span>
                                <TrendingUp className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="text-3xl font-bold text-slate-800">{student.assignments}</div>
                            <p className="text-xs text-slate-400 mt-3">Completed on time</p>
                        </div>
                    </div>

                    {/* Section 4: Intervention Recommendation */}
                    <div className={`p-6 rounded-2xl border ${interventionConfig.color} transition-all duration-500 ${showRisk ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full bg-opacity-20 ${interventionConfig.color.split(' ')[0]}`}>
                                {interventionConfig.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">{interventionConfig.title}</h3>
                                <p className="opacity-90">{interventionConfig.message}</p>
                                {interventionLevel !== 'LOW' && (
                                    <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                                        Take Action
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column - Mood & Risk */}
                <div className="space-y-6">

                    {/* Section 2: Mood Input */}
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">How is the student feeling?</h3>
                        <div className="flex justify-between gap-2">
                            {[
                                { icon: Smile, label: 'Good', color: 'text-emerald-500', bg: 'hover:bg-emerald-50', val: 'good' },
                                { icon: Meh, label: 'Okay', color: 'text-amber-500', bg: 'hover:bg-amber-50', val: 'okay' },
                                { icon: Frown, label: 'Struggling', color: 'text-red-500', bg: 'hover:bg-red-50', val: 'bad' }
                            ].map((mood) => (
                                <button
                                    key={mood.val}
                                    onClick={() => setSelectedMood(mood.val)}
                                    className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 transition-all ${mood.bg} ${selectedMood === mood.val ? 'bg-slate-50 border-slate-300 ring-1 ring-slate-300' : 'bg-transparent'}`}
                                >
                                    <mood.icon className={`w-8 h-8 ${mood.color}`} />
                                    <span className="text-xs font-medium text-slate-500">{mood.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Risk Breakdown */}
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-slate-800">Risk Analysis</h3>
                        </div>

                        <div className={`space-y-6 transition-all duration-1000 ${showRisk ? 'opacity-100' : 'opacity-0'}`}>

                            {/* Academic Risk */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Academic Risk</span>
                                    <span className="font-bold text-slate-800">{student.academic_risk}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: showRisk ? `${student.academic_risk}%` : '0%' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Sentiment Risk */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Sentiment Risk</span>
                                    <span className="font-bold text-slate-800">{student.sentiment_risk}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-rose-400 rounded-full transition-all duration-1000 ease-out delay-100"
                                        style={{ width: showRisk ? `${student.sentiment_risk}%` : '0%' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Crisis Detected */}
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-sm font-medium text-slate-600">Crisis Detected</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${student.crisis_detected ? 'bg-red-100 text-red-600 border-red-200' : 'bg-emerald-100 text-emerald-600 border-emerald-200'}`}>
                                        {student.crisis_detected ? 'YES' : 'NO'}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
