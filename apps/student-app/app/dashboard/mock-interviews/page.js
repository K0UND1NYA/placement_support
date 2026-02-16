'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import { Mic, Play, CheckCircle2, Clock, CalendarDays, ChevronRight, Layout } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function StudentMockInterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchInterviews();
  }, []);

  const StatusBadge = ({ isCompleted, inProgress }) => {
    let style = 'bg-amber-50 text-amber-600';
    let label = 'Pending';

    if (isCompleted) {
      style = 'bg-green-50 text-green-600';
      label = 'Completed';
    } else if (inProgress) {
      style = 'bg-blue-50 text-blue-600';
      label = 'In Progress';
    }

    return (
      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${style}`}>
        {label}
      </span>
    );
  };

  const InterviewCard = ({ interview }) => {
    const isCompleted = interview.attempt_status === 'completed';
    const inProgress = interview.attempt_status === 'in_progress';
    const isActive = true; // Logic matching previous implementation

    // Check if card should be clickable/interactive
    const clickable = !isCompleted;

    return (
      <div
        className={`bg-white rounded-xl p-5 border-4 border-slate-100 shadow-sm
        transition-all duration-300 ease-in-out transform
        ${clickable ? 'hover:scale-105 hover:border-blue-200 hover:shadow-xl cursor-pointer' : 'opacity-90'}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <StatusBadge isCompleted={isCompleted} inProgress={inProgress} />
          <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
            <Mic size={16} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-slate-900 tracking-tight mb-2 leading-snug">
          {interview.title}
        </h3>

        {/* Domain Badge */}
        <div className="mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${interview.domain === 'Technical'
              ? 'bg-blue-50 text-blue-600 border-blue-100'
              : 'bg-indigo-50 text-indigo-600 border-indigo-100'
            }`}>
            {interview.domain || 'General'}
          </span>
        </div>

        {/* Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <CalendarDays size={12} className="text-blue-400" />
            {new Date(interview.start_time).toLocaleDateString()}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">
            <div>
              {new Date(interview.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(interview.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Action */}
        {isCompleted ? (
          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 py-1 border-t border-slate-50 pt-3">
            Feedback Available Soon
          </div>
        ) : (
          (() => {
             const now = new Date();
             const start = new Date(interview.start_time);
             const end = new Date(interview.end_time);
             const isUpcoming = now < start;
             const isExpired = now > end;
             const isActiveWindow = now >= start && now <= end;
             
             // Allow resume if in progress, even if expired (optional policy, but usually good ux)
             // But strict requirement says "expired the student can still attend... fix that".
             // So if expired, disable everything unless maybe they are already inside? 
             // Let's stick to strict: if expired, cannot enter.
             
             if (isExpired) {
                 return (
                    <div className="text-center text-[10px] font-bold uppercase tracking-widest text-red-400 py-1 border-t border-slate-50 pt-3">
                        Expired
                    </div>
                 );
             }
             
             if (isUpcoming) {
                 return (
                    <div className="text-center text-[10px] font-bold uppercase tracking-widest text-amber-500 py-1 border-t border-slate-50 pt-3">
                        Starts {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                 );
             }

             return (
              <Link
                href={`/dashboard/mock-interviews/${interview.id}`}
                className={`flex items-center justify-center gap-2 w-full
                py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md hover:shadow-lg
                ${isActiveWindow || inProgress ? 'bg-slate-900 text-white hover:bg-blue-600' : 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none'}`}
              >
                {inProgress ? 'Resume' : 'Start'}
                <ChevronRight size={14} />
              </Link>
             );
          })()
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Dashboard-style header */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
            Career Prep
          </p>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Mock Interviews
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white h-40 rounded-lg border-4 border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : interviews.length === 0 ? (
          <div className="bg-white rounded-lg p-10 border-4 border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic size={24} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold text-sm">
              No interviews scheduled.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interviews.map(interview => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
