import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Bell, BarChart2, Brain } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/students', label: 'Students', icon: Users },
        { path: '/alerts', label: 'Alerts', icon: Bell },
        { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    ];

    return (
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 shadow-sm z-20">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-slate-200">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">EduCare AI</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-primary/10 text-primary font-medium shadow-sm border border-primary/20'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Profile Placeholder */}
            <div className="p-4 border-t border-slate-200">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
                        A
                    </div>
                    <div className="text-sm">
                        <p className="text-slate-800 font-medium">Admin User</p>
                        <p className="text-slate-500 text-xs">admin@school.edu</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
