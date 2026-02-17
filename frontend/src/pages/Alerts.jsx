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
                    badgeClass: 'bg-red-100 text-red-700 border-red-200 shadow-sm',
                    borderClass: 'border-l-4 border-l-red-500 hover:bg-red-50',
                    riskColor: 'text-red-600'
                };
            case 'immediate':
                return {
                    label: 'Immediate Care',
                    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200 shadow-sm',
                    borderClass: 'border-l-4 border-l-orange-500 hover:bg-orange-50',
                    riskColor: 'text-orange-600'
                };
            case 'warning':
                return {
                    label: 'Warning',
                    badgeClass: 'bg-amber-100 text-amber-700 border-amber-200 shadow-sm',
                    borderClass: 'border-l-4 border-l-amber-500 hover:bg-amber-50',
                    riskColor: 'text-amber-600'
                };
            case 'monitor':
                return {
                    label: 'Monitor',
                    badgeClass: 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm',
                    borderClass: 'border-l-4 border-l-blue-500 hover:bg-blue-50',
                    riskColor: 'text-blue-600'
                };
            default:
                return {
                    label: 'Alert',
                    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
                    borderClass: 'border-l-4 border-l-slate-400 hover:bg-slate-50',
                    riskColor: 'text-slate-600'
                };
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h1 className="text-xl font-bold text-slate-800">Students Requiring Immediate Intervention</h1>
            </div>

            {/* List */}
            <div className="space-y-3">
                {alerts.map((student, index) => {
                    const severityConfig = getSeverityConfig(student.severity);
                    return (
                        <div
                            key={index}
                            className={`bg-white border border-slate-200 ${severityConfig.borderClass} transition-all p-4 rounded-lg flex items-center justify-between group shadow-sm hover:shadow-md`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-500">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-semibold text-sm">
                                        {student.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                        <Brain className="w-3 h-3" />
                                        <span>{student.mood}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Risk Level</span>
                                    <div className={`flex items-center justify-end gap-1 ${severityConfig.riskColor} font-bold text-sm`}>
                                        <Activity className="w-3 h-3" />
                                        <span>{student.risk}%</span>
                                    </div>
                                </div>
                                <span className={`${severityConfig.badgeClass} text-[10px] uppercase font-bold px-3 py-1 rounded-full border tracking-wide`}>
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
