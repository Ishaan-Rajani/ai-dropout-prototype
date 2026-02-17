import React, { useState } from 'react';
import { X, Save, User, Activity, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddStudentModal = ({ isOpen, onClose, onStudentAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        grades: '',
        assignments: '',
        mood: 'okay',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateRisk = (data) => {
        // Simple mock risk calculation
        const attendanceRisk = Math.max(0, 100 - parseFloat(data.attendance || 100));
        const gradesRisk = Math.max(0, 100 - parseFloat(data.grades || 100));

        // Sentiment weight
        let sentimentRisk = 20;
        if (data.mood === 'good') sentimentRisk = 10;
        if (data.mood === 'bad') sentimentRisk = 60;

        const totalRisk = Math.round((attendanceRisk * 0.4) + (gradesRisk * 0.4) + (sentimentRisk * 0.2));

        let riskLevel = 'LOW';
        if (totalRisk > 70) riskLevel = 'HIGH';
        else if (totalRisk > 40) riskLevel = 'MEDIUM';

        return { totalRisk, riskLevel, sentimentRisk };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate processing
        setTimeout(() => {
            const riskData = calculateRisk(formData);

            const newStudent = {
                student_id: Math.floor(Math.random() * 10000) + 1000, // Mock ID
                name: formData.name,
                attendance: parseFloat(formData.attendance),
                grades: parseFloat(formData.grades),
                assignments: parseInt(formData.assignments) || 0,
                academic_risk: Math.round((100 - parseFloat(formData.grades) + (100 - parseFloat(formData.attendance))) / 2),
                sentiment_risk: riskData.sentimentRisk,
                risk_percentage: riskData.totalRisk,
                risk_level: riskData.riskLevel,
                mood: formData.mood,
                notes: formData.notes,
                crisis_detected: riskData.totalRisk > 80,
                added_at: new Date().toISOString()
            };

            // Save to LocalStorage
            const existingStudents = JSON.parse(localStorage.getItem('addedStudents') || '[]');
            const updatedStudents = [...existingStudents, newStudent];
            localStorage.setItem('addedStudents', JSON.stringify(updatedStudents));

            // Notify parent
            if (onStudentAdded) onStudentAdded(newStudent);

            // Reset and close
            setFormData({
                name: '',
                attendance: '',
                grades: '',
                assignments: '',
                mood: 'okay',
                notes: ''
            });
            setIsSubmitting(false);
            onClose();
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white w-full max-w-md max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
                    >
                        {/* Header - Fixed */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Add New Student
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">

                            {/* Identity Section */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Personal Details
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Academic Metrics
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="attendance"
                                            required
                                            min="0" max="100"
                                            value={formData.attendance}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                            placeholder="Attendance %"
                                        />
                                        <Activity className="w-4 h-4 text-slate-400 absolute right-3 top-3 opacity-50" />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="grades"
                                            required
                                            min="0" max="100"
                                            value={formData.grades}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                            placeholder="Grades %"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <input
                                        type="number"
                                        name="assignments"
                                        required
                                        min="0"
                                        value={formData.assignments}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                        placeholder="Missing Assignments"
                                    />
                                </div>
                            </div>

                            {/* Quick Assessment */}
                            <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-primary" />
                                    Risk Assessment
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <select
                                            name="mood"
                                            value={formData.mood}
                                            onChange={handleChange}
                                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium appearance-none cursor-pointer"
                                        >
                                            <option value="good">Good</option>
                                            <option value="okay">Okay</option>
                                            <option value="bad">High Risk</option>
                                        </select>
                                    </div>

                                    <textarea
                                        name="notes"
                                        rows="2"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                                        placeholder="Add observation notes..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Fixed */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 sticky bottom-0 z-10">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-[#3d5a31] text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Saving...</span>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Student Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddStudentModal;
