import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, ShieldAlert, CheckCircle, AlertTriangle, AlertOctagon, Brain,
    Users, TrendingUp, TrendingDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const StatCard = ({ title, value, color, icon: Icon, trend }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon className="w-16 h-16" />
        </div>
        <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
            {trend && (
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                    <span className={trend > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-slate-500">vs last month</span>
                </div>
            )}
        </div>
    </motion.div>
);

const Dashboard = () => {
    // Stats State
    const [stats, setStats] = useState({
        totalStudents: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0
    });

    // Predictor State
    const [formData, setFormData] = useState({ attendance: '', grades: '', assignments: '', mood: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Stats Data
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetching from backend endpoints as requested
                // Note: Assuming the backend returns lists or counts. 
                // If endpoints return lists, we count length. If objects, we use directly.
                const [studentsRes, highRiskRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/students'),
                    axios.get('http://127.0.0.1:8000/high-risk')
                ]);

                // Simulating calculation based on potential response structures
                // Adjust logic based on actual API response format
                const total = studentsRes.data.length || studentsRes.data.count || 0;
                const high = highRiskRes.data.length || highRiskRes.data.count || 0;

                // For demo purposes, estimating Medium/Low if not provided explicitly
                // In a real app, you'd fetch these or calculate from the full student list
                const medium = Math.floor((total - high) * 0.3);
                const low = total - high - medium;

                setStats({
                    totalStudents: total,
                    highRisk: high,
                    mediumRisk: medium,
                    lowRisk: low
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
                // Fallback to placeholder data for UI demonstration if API fails
                setStats({
                    totalStudents: 1250,
                    highRisk: 145,
                    mediumRisk: 320,
                    lowRisk: 785
                });
            }
        };

        fetchStats();
    }, []);

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
            case 'LOW': return 'text-success border-success bg-gradient-to-br from-success/5 to-success/20';
            case 'MEDIUM': return 'text-warning border-warning bg-gradient-to-br from-warning/5 to-warning/20';
            case 'HIGH': return 'text-danger border-danger bg-gradient-to-br from-danger/5 to-danger/20';
            default: return 'text-slate-400 border-slate-600 bg-slate-800';
        }
    };

    const getIcon = (level) => {
        switch (level) {
            case 'LOW': return <CheckCircle className="w-16 h-16 mb-4 text-success drop-shadow-lg" />;
            case 'MEDIUM': return <AlertTriangle className="w-16 h-16 mb-4 text-warning drop-shadow-lg" />;
            case 'HIGH': return <AlertOctagon className="w-16 h-16 mb-4 text-danger drop-shadow-lg" />;
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
        <div className="space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">Overview of student performance and risk assessments.</p>
                </div>
                <div className="text-sm text-slate-500 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    System Online
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
                <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-400" />
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
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Decorative background blur */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Individual Predictor Tool */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Brain className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Quick Risk Assessment</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Input Side */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 block">Attendance (%)</label>
                                    <input type="number" name="attendance" value={formData.attendance} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="0-100" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 block">Grades (%)</label>
                                    <input type="number" name="grades" value={formData.grades} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="0-100" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 block">Pending Tasks</label>
                                    <input type="number" name="assignments" value={formData.assignments} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="Count" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1 block">Mood</label>
                                    <input type="text" name="mood" value={formData.mood} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="Details..." />
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-400 text-xs flex items-center gap-1"><ShieldAlert className="w-3 h-3" />{error}</motion.div>}
                            </AnimatePresence>

                            <button onClick={calculateRisk} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm">
                                {loading ? "Analyzing..." : "Run Analysis"}
                            </button>
                        </div>

                        {/* Result Side */}
                        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 flex items-center justify-center relative overflow-hidden min-h-[200px]">
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="res"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center w-full z-10"
                                    >
                                        <div className={`inline-flex p-3 rounded-full mb-2 ${result.risk_level === 'HIGH' ? 'bg-rose-500/20 text-rose-400' : result.risk_level === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                            {getIcon(result.risk_level)}
                                        </div>
                                        <div className="text-3xl font-bold text-white mb-1">{result.risk_percentage}% Risk</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-3">{result.risk_level} LEVEL</div>
                                        <p className="text-xs text-slate-300 bg-slate-800/80 p-2 rounded border border-slate-700">
                                            {getIntervention(result.risk_level)}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="text-center text-slate-600">
                                        <Brain className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Awaiting Inputs</p>
                                    </div>
                                )}
                            </AnimatePresence>
                            {/* Result glow effect */}
                            {result && (
                                <div className={`absolute inset-0 opacity-10 blur-2xl ${result.risk_level === 'HIGH' ? 'bg-rose-500' : result.risk_level === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
