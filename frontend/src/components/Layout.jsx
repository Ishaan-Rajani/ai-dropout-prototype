import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 overflow-y-auto min-h-screen bg-slate-900/50 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-950/20 z-0 pointer-events-none" />
                <div className="relative z-10 p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
