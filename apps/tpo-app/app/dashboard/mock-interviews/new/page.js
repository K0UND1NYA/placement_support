'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { ArrowLeft, Mic, Save, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NewMockInterviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    topic: '',
    description: '',
    difficulty: 'Medium',
    date: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time to ISO UTC strings
      const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.date}T${formData.endTime}`);

      await apiFetch('/mock-interview/create', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          domain: formData.domain,
          topic: formData.topic,
          description: formData.description,
          difficulty: formData.difficulty,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString()
        })
      });

      router.push('/dashboard/mock-interviews');
    } catch (err) {
      alert('Failed to create interview: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/mock-interviews" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-4 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </Link>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
             <Mic size={24} />
          </div>
          Scheduled Mock Interview
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            Interview Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Title</label>
              <input
                name="title"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                placeholder="e.g. Frontend Developer Round 1"
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Domain</label>
              <input
                name="domain"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                placeholder="e.g. Web Development, Data Science"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Detailed Topic</label>
              <input
                name="topic"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                placeholder="e.g. React Hooks & State Management"
                onChange={handleChange}
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Difficulty</label>
              <select
                name="difficulty"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                onChange={handleChange}
                value={formData.difficulty}
              >
                <option value="Easy">Easy / Entry Level</option>
                <option value="Medium">Medium / Standard</option>
                <option value="Hard">Hard / Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 mb-6">
             <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Description / Guidelines</label>
             <textarea
               name="description"
               rows="3"
               className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 resize-none"
               placeholder="Specific instructions for the AI or context for the student..."
               onChange={handleChange}
             />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2">
            <Clock size={18} className="text-blue-500" />
            Scheduling
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                  onChange={handleChange}
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                  onChange={handleChange}
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 uppercase tracking-wide">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition-all font-semibold text-slate-700"
                  onChange={handleChange}
                />
             </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3"
        >
          {loading ? (
             <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
          ) : (
             <>
               <Save size={20} />
               <span>Schedule Interview</span>
             </>
          )}
        </button>
      </form>
    </div>
  );
}
