import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, ShieldAlert, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    attendance: '',
    grades: '',
    assignments: '',
    mood: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateRisk = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Validate inputs
    if (!formData.attendance || !formData.grades || !formData.assignments || !formData.mood) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        attendance: parseFloat(formData.attendance),
        grades: parseFloat(formData.grades),
        assignments: parseFloat(formData.assignments),
        mood: formData.mood
      };

      const response = await axios.post('http://127.0.0.1:8000/predict', payload);
      setResult(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to analyze data. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'LOW': return 'text-success border-success bg-success/10';
      case 'MEDIUM': return 'text-warning border-warning bg-warning/10';
      case 'HIGH': return 'text-danger border-danger bg-danger/10';
      default: return 'text-slate-400 border-slate-600 bg-slate-800';
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

  const getIcon = (level) => {
    switch (level) {
      case 'LOW': return <CheckCircle className="w-12 h-12 mb-2" />;
      case 'MEDIUM': return <AlertTriangle className="w-12 h-12 mb-2" />;
      case 'HIGH': return <AlertOctagon className="w-12 h-12 mb-2" />;
      default: return <Activity className="w-12 h-12 mb-2" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700"
      >
        {/* Header */}
        <div className="bg-slate-900/50 p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Brain className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MindGuard AI</h1>
            <p className="text-xs text-slate-400">Dropout & Mental Health Detection</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="attendance">Attendance (%)</label>
              <input
                type="number"
                id="attendance"
                name="attendance"
                placeholder="e.g. 85"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="grades">Grades (%)</label>
                <input
                  type="number"
                  id="grades"
                  name="grades"
                  placeholder="e.g. 78"
                  min="0"
                  max="100"
                  value={formData.grades}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="assignments">Assignments</label>
                <input
                  type="number"
                  id="assignments"
                  name="assignments"
                  placeholder="e.g. 12"
                  min="0"
                  value={formData.assignments}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="mood">How are you feeling this week?</label>
              <textarea
                id="mood"
                name="mood"
                rows="3"
                placeholder="I felt overwhelmed with exams..."
                value={formData.mood}
                onChange={handleInputChange}
                className="resize-none"
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-danger text-sm bg-danger/10 p-3 rounded-lg flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <button
            onClick={calculateRisk}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Activity className="w-5 h-5 group-hover:animate-pulse" />
                Analyze Student Risk
              </>
            )}
          </button>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`mt-6 p-6 rounded-xl border-2 text-center relative overflow-hidden ${getRiskColor(result.risk_level)}`}
              >
                <div className="absolute inset-0 bg-current opacity-5 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  {getIcon(result.risk_level)}

                  <div className="text-4xl font-bold mb-1">
                    {result.risk_percentage}%
                  </div>
                  <div className="text-sm font-bold tracking-wider uppercase opacity-80 mb-4">
                    RISK LEVEL: {result.risk_level}
                  </div>

                  <div className="bg-slate-900/40 backdrop-blur-sm p-3 rounded-lg w-full text-sm font-medium">
                    {getIntervention(result.risk_level)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
