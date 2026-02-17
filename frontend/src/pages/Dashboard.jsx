import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, ShieldAlert, CheckCircle, AlertTriangle, AlertOctagon, Brain,
    Users, TrendingUp, TrendingDown, UserPlus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import AddStudentModal from '../components/AddStudentModal';

const StatCard = ({ title, value, color, icon: Icon, trend }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-slate-800`}>
            <Icon className="w-16 h-16" />
        </div>
        <div className="relative z-10">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
            {trend && (
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                    <span className={trend > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-slate-400">vs last month</span>
                </div>
            )}
        </div>
    </motion.div>
);

const Dashboard = () => {
    // Stats State - Initialized with fallback data to ensure chart renders immediately
    const [stats, setStats] = useState({
        totalStudents: 856,
        highRisk: 98,
        mediumRisk: 267,
        lowRisk: 491
    });

    // Predictor State
    const [formData, setFormData] = useState({ attendance: '', grades: '', assignments: '', mood: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Add Student Modal State
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

    // Fetch Stats Data
    useEffect(() => {
        const fetchStats = async () => {
            const localStudents = JSON.parse(localStorage.getItem('addedStudents') || '[]');
            try {
                // Fetching from backend endpoints as requested
                const [studentsRes, highRiskRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/students'),
                    axios.get('http://127.0.0.1:8000/high-risk')
                ]);

                // Adjust logic based on actual API response format
                const apiTotal = studentsRes.data.length || studentsRes.data.students?.length || 0;
                const total = apiTotal + localStudents.length;

                const apiHigh = highRiskRes.data.length || highRiskRes.data.count || 0;
                const high = apiHigh + localStudents.filter(s => s.risk_level === 'HIGH').length;

                // For demo purposes, estimating Medium/Low
                const medium = Math.floor((total - high) * 0.3) + localStudents.filter(s => s.risk_level === 'MEDIUM').length;
                const low = total - high - medium;

                setStats({
                    totalStudents: total,
                    highRisk: high,
                    mediumRisk: medium,
                    lowRisk: low
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
                // Fallback data
                const total = 856 + localStudents.length;
                const high = 98 + localStudents.filter(s => s.risk_level === 'HIGH').length;
                const medium = 267 + localStudents.filter(s => s.risk_level === 'MEDIUM').length;
                const low = total - high - medium;

                setStats({
                    totalStudents: total,
                    highRisk: high,
                    mediumRisk: medium,
                    lowRisk: low
                });
            }
        };

        fetchStats();
    }, [isAddStudentOpen]);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const calculateRisk = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        if (!formData.attendance || !formData.grades || !formData.assignments || !formData.mood) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/predict', {
                attendance: parseFloat(formData.attendance),
                grades: parseFloat(formData.grades),
                assignments: parseFloat(formData.assignments),
                mood: formData.mood
            });
            setTimeout(() => setResult(response.data), 800);
        } catch (err) {
            console.error("API Error:", err);
            setError("Failed to analyze data. Ensure the backend is running.");
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };

    const chartData = [
        { name: 'High Risk', value: stats.highRisk, color: '#ef4444' },
        { name: 'Medium Risk', value: stats.mediumRisk, color: '#eab308' },
        { name: 'Low Risk', value: stats.lowRisk, color: '#22c55e' },
    ];

    const getRiskColor = (level) => {
        switch (level) {
            case 'LOW': return 'text-emerald-600 border-emerald-200 bg-emerald-50';
            case 'MEDIUM': return 'text-amber-600 border-amber-200 bg-amber-50';
            case 'HIGH': return 'text-rose-600 border-rose-200 bg-rose-50';
            default: return 'text-slate-400 border-slate-200 bg-slate-50';
        }
    };

    const getIcon = (level) => {
        switch (level) {
            case 'LOW': return <CheckCircle className="w-16 h-16 mb-4 text-emerald-500 drop-shadow-sm" />;
            case 'MEDIUM': return <AlertTriangle className="w-16 h-16 mb-4 text-amber-500 drop-shadow-sm" />;
            case 'HIGH': return <AlertOctagon className="w-16 h-16 mb-4 text-rose-500 drop-shadow-sm" />;
            default: return <Activity className="w-16 h-16 mb-4 text-slate-400" />;
        }
    };

    const getIntervention = (level) => {
        switch (level) {
            case 'LOW': return "Student Stable - Keep up the good work!";
            case 'MEDIUM': return "Recommend Monitoring - Schedule a check-in.";
            case 'HIGH': return "Immediate Counselor Intervention Required.";
            default: return "";
        }
    };

    return (
        <div className="space-y-8 animate-fade-in relative">
            <AddStudentModal
                isOpen={isAddStudentOpen}
                onClose={() => setIsAddStudentOpen(false)}
                onStudentAdded={() => setIsAddStudentOpen(false)} // Trigger re-render via dependency
            />

            {/* Page Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Overview of student performance and risk assessments.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        System Online
                    </div>

                    <button
                        onClick={() => setIsAddStudentOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#3d5a31] text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary/20 group"
                    >
                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Add Student
                    </button>
                </div>
            </div>

            {/* Top Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    color="text-indigo-500"
                    trend={2.5}
                />
                <StatCard
                    title="High Risk"
                    value={stats.highRisk}
                    icon={AlertOctagon}
                    color="text-rose-500"
                    trend={-5.2}
                />
                <StatCard
                    title="Medium Risk"
                    value={stats.mediumRisk}
                    icon={AlertTriangle}
                    color="text-amber-500"
                    trend={1.8}
                />
                <StatCard
                    title="Low Risk"
                    value={stats.lowRisk}
                    icon={CheckCircle}
                    color="text-emerald-500"
                    trend={4.3}
                />
            </div>

            {/* Charts & Interactive Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Risk Distribution Chart */}
                <div className="lg:col-span-1 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Risk Distribution
                    </h3>
                    <div className="h-64 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-slate-600 font-medium">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Individual Predictor Tool */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Brain className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">Quick Risk Assessment</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Input Side */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Attendance (%)</label>
                                    <input type="number" name="attendance" value={formData.attendance} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="0-100" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Grades (%)</label>
                                    <input type="number" name="grades" value={formData.grades} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="0-100" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Pending Tasks</label>
                                    <input type="number" name="assignments" value={formData.assignments} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Count" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Mood</label>
                                    <input type="text" name="mood" value={formData.mood} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Details..." />
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-xs flex items-center gap-1 bg-rose-50 p-2 rounded"><ShieldAlert className="w-3 h-3" />{error}</motion.div>}
                            </AnimatePresence>

                            <button onClick={calculateRisk} disabled={loading} className="w-full bg-primary hover:bg-[#3d5a31] text-white font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm shadow-md hover:shadow-lg">
                                {loading ? "Analyzing..." : "Run Analysis"}
                            </button>
                        </div>

                        {/* Result Side */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-center relative overflow-hidden min-h-[200px]">
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="res"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center w-full z-10"
                                    >
                                        <div className={`inline-flex p-3 rounded-full mb-2 border ${getRiskColor(result.risk_level)}`}>
                                            {getIcon(result.risk_level)}
                                        </div>
                                        <div className="text-3xl font-bold text-slate-800 mb-1">{result.risk_percentage}% Risk</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">{result.risk_level} LEVEL</div>
                                        <p className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200 shadow-sm mx-auto max-w-[200px]">
                                            {getIntervention(result.risk_level)}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="text-center text-slate-400">
                                        <Brain className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Awaiting Inputs</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
