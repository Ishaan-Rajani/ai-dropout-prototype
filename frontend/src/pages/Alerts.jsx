import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

const Alerts = () => {
    const alerts = [
        { id: 1, message: "Risk Threshold Exceeded for Grade 11", type: "high", time: "1 hour ago" },
        { id: 2, message: "Attendance Data Mismatch", type: "medium", time: "3 hours ago" },
        { id: 3, message: "System Maintenance Scheduled", type: "low", time: "1 day ago" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">System Alerts</h1>

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-lg 
              ${alert.type === 'high' ? 'bg-red-500/10 text-red-400' :
                                alert.type === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                    'bg-blue-500/10 text-blue-400'}`}>
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white">{alert.message}</h3>
                            <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>{alert.time}</span>
                            </div>
                        </div>
                        <button className="text-sm text-slate-400 hover:text-white transition-colors">Dismiss</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alerts;
