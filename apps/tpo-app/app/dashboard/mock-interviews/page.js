'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import { Plus, Mic, Calendar, Clock, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';

export default function MockInterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await apiFetch('/mock-interview/tpo/list');
      setInterviews(data);
    } catch (err) {
      console.error('Failed to fetch interviews', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ open: true, id, title });
  };

  const confirmDelete = async () => {
    try {
      await apiFetch(`/mock-interview/delete/${deleteModal.id}`, { method: 'DELETE' });
      // Refresh the list
      setInterviews(interviews.filter(i => i.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null, title: '' });
    } catch (err) {
      alert('Failed to delete interview: ' + err.message);
      setDeleteModal({ open: false, id: null, title: '' });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, id: null, title: '' });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-bold text-black flex items-center gap-3">
            <Mic size={28} className="text-blue-600" />
            Mock Interviews
         </h2>
        
        <Link 
          href="/dashboard/mock-interviews/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
        >
          <Plus size={20} className="stroke-[3]" />
          <span>Create Interview</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
           <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-slate-50">
               <tr>
                 <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Domain & Topic</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                 <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="bg-white divide-y divide-gray-100">
               {interviews.map((interview) => (
                 <tr key={interview.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">{interview.title}</div>
                      <div className="text-xs text-slate-400 font-medium">ID: {interview.id.slice(0, 8)}</div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-700">{interview.domain}</div>
                      <div className="text-xs text-slate-500 font-medium line-clamp-1">{interview.topic}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                        ${interview.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                          interview.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }
                      `}>
                        {interview.difficulty}
                      </span>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                           <Calendar size={14} className="text-slate-400" />
                           <span>{new Date(interview.start_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                           <Clock size={14} className="text-slate-400" />
                           <span>
                             {new Date(interview.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                             {new Date(interview.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                           </span>
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                        ${new Date(interview.end_time) < new Date() ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-600'}`
                      }>
                        <span className={`w-2 h-2 rounded-full ${new Date(interview.end_time) < new Date() ? 'bg-slate-400' : 'bg-blue-500 animate-pulse'}`}></span>
                        {new Date(interview.end_time) < new Date() ? 'Ended' : 'Active'}
                      </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/dashboard/mock-interviews/${interview.id}/results`}
                          className="text-slate-400 hover:text-blue-600 font-bold transition-colors"
                        >
                          View Logs
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(interview.id, interview.title)}
                          className="text-slate-400 hover:text-red-600 font-bold transition-colors p-1 hover:bg-red-50 rounded"
                          title="Delete Interview"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                   </td>
                 </tr>
               ))}
               {interviews.length === 0 && (
                 <tr>
                    <td colSpan="6" className="px-6 py-24 text-center">
                       <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                             <Mic size={32} className="text-blue-400" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 mb-1">No Interviews Scheduled</h3>
                          <p className="text-slate-500 max-w-sm mx-auto mb-6">Create your first AI-driven mock interview to help students prepare.</p>
                          <Link 
                            href="/dashboard/mock-interviews/new"
                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-6 py-2 rounded-xl transition-colors border border-blue-100"
                          >
                            <Plus size={18} />
                            <span>Schedule Interview</span>
                          </Link>
                       </div>
                    </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={deleteModal.open} 
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Mock Interview"
        message={`Are you sure you want to delete "${deleteModal.title}"?\n\n⚠️ This will permanently remove all student attempts and integrity logs. This action cannot be undone.`}
        type="danger"
        confirmText="Delete Interview"
        cancelText="Cancel"
      />
    </div>
  );
}
