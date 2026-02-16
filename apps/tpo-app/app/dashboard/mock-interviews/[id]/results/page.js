'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function MockInterviewResultsPage() {
  const params = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await apiFetch(`/mock-interview/tpo/attempts/${params.id}`);
        setAttempts(data);
      } catch (err) {
        console.error('Failed to fetch results', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [params.id]);

  const toggleRow = (id) => {
      setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/dashboard/mock-interviews" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-4 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Interviews</span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Interview Results & Integrity Logs</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
             <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : attempts.length === 0 ? (
         <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-sm">
             <p className="text-slate-500 font-bold">No students have attempted this interview yet.</p>
         </div>
      ) : (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Violations</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {attempts.map((attempt) => (
                <React.Fragment key={attempt.id}>
                <tr className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleRow(attempt.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{attempt.student_name}</span>
                        <span className="text-xs text-slate-500">{attempt.student_usn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                        ${attempt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {attempt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="text-sm font-bold text-slate-700">{attempt.score ?? '-'} / 100</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     {attempt.violation_count > 0 ? (
                         <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full w-fit">
                             <AlertTriangle size={14} />
                             <span className="text-xs font-bold">{attempt.violation_count} Flags</span>
                         </div>
                     ) : (
                         <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                             <CheckCircle size={14} />
                             <span className="text-xs font-bold">Clean</span>
                         </div>
                     )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-blue-600 font-bold text-xs uppercase tracking-wide">
                          {expandedRow === attempt.id ? 'Hide' : 'View'}
                      </button>
                  </td>
                </tr>
                {expandedRow === attempt.id && (
                    <tr className="bg-slate-50">
                        <td colSpan="5" className="px-6 py-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-slate-400" />
                                    Integrity Logs
                                </h4>
                                {attempt.logs && attempt.logs.length > 0 ? (
                                    <div className="space-y-3">
                                        {attempt.logs.map((log, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                    <span className="font-bold text-red-700 capitalize">
                                                        {log.event_type.replace(/_/g, ' ')}
                                                    </span>
                                                </div>
                                                <span className="text-slate-500 font-medium text-xs">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm italic">No integrity violations recorded for this attempt.</p>
                                )}
                            </div>
                        </td>
                    </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
