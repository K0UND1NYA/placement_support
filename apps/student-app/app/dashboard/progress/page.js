'use client';

import { useState, useEffect, useMemo } from 'react';
import { apiFetch } from '@/lib/api';
import { Trophy, Medal, Award, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

/* ---------- helpers ---------- */
const formatYearLabel = (year) => {
  if (year === 'All') return 'All Years';
  if (!year) return 'N/A';
  
  // Handle already formatted strings or non-numeric
  const numericYear = parseInt(year);
  if (isNaN(numericYear)) return year;

  if (numericYear === 1) return '1st Year';
  if (numericYear === 2) return '2nd Year';
  if (numericYear === 3) return '3rd Year';
  if (numericYear === 4) return '4th Year';
  return `${numericYear}th Year`;
};

export default function StudentProgressPage() {
  const [rankings, setRankings] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState('All');

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) setCurrentUser(JSON.parse(userData));

    // Fetch exams for selection
    apiFetch('/exams')
      .then(setExams)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = selectedExamId !== 'All' ? `?examId=${selectedExamId}` : '';
    apiFetch(`/analytics/student/rankings${query}`)
      .then(setRankings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedExamId]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={18} />;
    if (rank === 2) return <Medal className="text-slate-400" size={18} />;
    if (rank === 3) return <Award className="text-orange-500" size={18} />;
    return <span className="font-black text-slate-500 text-sm">{rank}</span>;
  };

  const getRowStyle = (studentId) =>
    currentUser?.id === studentId
      ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100'
      : 'bg-white border-slate-100 hover:bg-slate-50';

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
            Performance
          </p>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Class Standings
          </h2>
        </div>

        {/* Exam Filter */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter size={16} />
            <span className="text-xs font-black text-black uppercase tracking-widest">
              Filter by Exam
            </span>
          </div>

          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-50
              border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
          >
            <option value="All">Global Rankings (All Exams)</option>
            {exams.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 border-b-4 border-blue-600 rounded-full" />
          </div>
        ) : rankings.length === 0 ? (
          <div className="bg-white p-16 rounded-2xl border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              No participation data available
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {rankings.map(student => (
              <div
                key={student.student_id}
                className={`rounded-2xl p-4 border shadow-sm transition-all ${getRowStyle(student.student_id)}`}
              >
                <div className="flex items-center justify-between">

                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-slate-100">
                      {getRankIcon(student.rank)}
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-800">
                        {student.name}
                        {currentUser?.id === student.student_id && (
                          <span className="ml-2 text-[9px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            YOU
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400">
                        {formatYearLabel(student.year)}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-right flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                        Exams
                      </p>
                      <p className="text-sm font-black text-slate-700">
                        {student.exams_taken}
                      </p>
                    </div>
                    <div className="text-right min-w-[60px]">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                        Points
                      </p>
                      <p className="text-lg font-black text-blue-600">
                        {student.total_score}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
