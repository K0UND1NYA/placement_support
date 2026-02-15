'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import { Mic, Play, CheckCircle, Clock, Calendar, ChevronRight } from 'lucide-react';

export default function StudentMockInterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await apiFetch('/mock-interview/student/list');
      setInterviews(data);
    } catch (err) {
      console.error('Failed to fetch interviews', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
         <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mock Interviews</h2>
         <p className="text-slate-500 font-medium mt-1">Practice with AI-driven technical interviews</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        </div>
      ) : interviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
           <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <Mic size={40} className="text-indigo-500" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">No Interviews Available</h3>
           <p className="text-slate-500 mb-8 max-w-md mx-auto">Your placement officer hasn't scheduled any mock interviews yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => {
            const isCompleted = interview.attempt_status === 'completed';
            const inProgress = interview.attempt_status === 'in_progress';
            const isActive = new Date() >= new Date(interview.start_time) && new Date() <= new Date(interview.end_time);
            
            return (
              <div key={interview.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden flex flex-col">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                 
                 <div className="relative z-10 flex-1">
                   <div className="flex justify-between items-start mb-4">
                     <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                       {interview.domain}
                     </div>
                     {isCompleted && (
                       <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                         <CheckCircle size={12} /> Completed
                       </div>
                     )}
                   </div>

                   <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{interview.title}</h3>
                   <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2 h-10">{interview.topic}</p>

                   <div className="space-y-3 mb-6">
                     <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                       <Calendar size={16} className="text-slate-400" />
                       <span>{new Date(interview.start_time).toLocaleDateString()}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                       <Clock size={16} className="text-slate-400" />
                       <span>{new Date(interview.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                     </div>
                   </div>
                 </div>

                 <div className="relative z-10 pt-4 border-t border-slate-100">
                    {isCompleted ? (
                      <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-3 rounded-xl cursor-not-allowed">
                        View Results (Coming Soon)
                      </button>
                    ) : (
                      <Link 
                        href={`/dashboard/mock-interviews/${interview.id}`}
                        className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 text-white
                          ${isActive || inProgress ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-300 cursor-not-allowed pointer-events-none'}
                        `}
                      >
                         <Play size={18} className="fill-current" />
                         <span>{inProgress ? 'Resume Interview' : 'Start Interview'}</span>
                      </Link>
                    )}
                 </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
