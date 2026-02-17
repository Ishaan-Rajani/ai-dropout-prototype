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
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="p-2 bg-accent/20 rounded-lg">
                    <Brain className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">MindGuard AI</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-accent/10 text-accent font-medium shadow-sm border border-accent/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Profile Placeholder */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/50">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                        A
                    </div>
                    <div className="text-sm">
                        <p className="text-white font-medium">Admin User</p>
                        <p className="text-slate-500 text-xs">admin@school.edu</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
