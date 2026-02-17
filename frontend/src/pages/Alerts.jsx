import React from 'react';
import { AlertCircle, User, Activity, Brain, AlertTriangle, Eye } from 'lucide-react';

const Alerts = () => {
    // Hardcoded alerts with different severity levels
    const alerts = [
        {
            name: "Sarah Martinez",
            risk: 94,
            mood: "I feel hopeless and can't continue anymore",
            severity: "critical"
        },
        {
            name: "James Chen",
            risk: 88,
            mood: "Extremely stressed about failing exams",
            severity: "immediate"
        },
        {
            name: "Emily Rodriguez",
            risk: 76,
            mood: "Feeling overwhelmed with coursework",
            severity: "warning"
        },
        {
            name: "Michael Thompson",
            risk: 91,
            mood: "Thinking about giving up on everything",
            severity: "critical"
        },
        {
            name: "Jessica Williams",
            risk: 82,
            mood: "Anxious and having trouble sleeping",
            severity: "immediate"
        },
        {
            name: "David Park",
            risk: 68,
            mood: "Concerned about recent grade drops",
            severity: "monitor"
        }
    ];

    const getSeverityConfig = (severity) => {
        switch (severity) {
            case 'critical':
                return {
                    label: 'Critical',
                    badgeClass: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]',
                    borderClass: 'hover:border-red-500/30',
                    riskColor: 'text-red-400'
                };
            case 'immediate':
                return {
                    label: 'Immediate Care',
                    badgeClass: 'bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.15)]',
                    borderClass: 'hover:border-orange-500/30',
                    riskColor: 'text-orange-400'
                };
            case 'warning':
                return {
                    label: 'Warning',
                    badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
                    borderClass: 'hover:border-amber-500/30',
                    riskColor: 'text-amber-400'
                };
            case 'monitor':
                return {
                    label: 'Monitor',
                    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                    borderClass: 'hover:border-blue-500/30',
                    riskColor: 'text-blue-400'
                };
            default:
                return {
                    label: 'Alert',
                    badgeClass: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
                    borderClass: 'hover:border-slate-500/30',
                    riskColor: 'text-slate-400'
                };
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h1 className="text-lg font-semibold text-white">Students Requiring Immediate Intervention</h1>
            </div>

            {/* List */}
            <div className="space-y-3">
                {alerts.map((student, index) => {
                    const severityConfig = getSeverityConfig(student.severity);
                    return (
                        <div
                            key={index}
                            className={`bg-slate-900/50 border border-slate-800 ${severityConfig.borderClass} transition-colors p-4 rounded-lg flex items-center justify-between group`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center border border-slate-700">
                                    <User className="text-slate-400 w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">
                                        {student.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                        <Brain className="w-3 h-3" />
                                        <span>{student.mood}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Risk %</span>
                                    <div className={`flex items-center justify-end gap-1 ${severityConfig.riskColor} font-bold text-sm`}>
                                        <Activity className="w-3 h-3" />
                                        <span>{student.risk}%</span>
                                    </div>
                                </div>
                                <span className={`${severityConfig.badgeClass} text-[10px] uppercase font-bold px-2 py-1 rounded border tracking-wide`}>
                                    {severityConfig.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Alerts;
