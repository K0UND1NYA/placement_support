'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { Trash2, ExternalLink, FileText, Plus, X } from 'lucide-react';
import Modal from '@/components/Modal';

export default function TPOTintPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'aptitude', file_url: '' });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    apiFetch('/tint').then(setMaterials).finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      let finalUrl = formData.file_url;

      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const token = sessionStorage.getItem('token');
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads-manager`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: uploadFormData
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          finalUrl = uploadData.file_url;
        } else {
          throw new Error(uploadData.error || 'File upload failed');
        }
      }

      const newMaterial = await apiFetch('/tint', {
        method: 'POST',
        body: JSON.stringify({ ...formData, file_url: finalUrl }),
      });
      setMaterials([newMaterial, ...materials]);
      setShowUpload(false);
      setFormData({ title: '', category: 'aptitude', file_url: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
      setErrorModal({ isOpen: true, message: err.message || 'Upload failed' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await apiFetch(`/tint/${deleteModal.id}`, { method: 'DELETE' });
      setMaterials(materials.filter(m => m.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      console.error(err);
      setDeleteModal({ isOpen: false, id: null });
      setErrorModal({ isOpen: true, message: 'Delete failed' });
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Training & Interview Notes (TINT)</h2>
          <p className="text-slate-500 text-sm font-medium">Manage study resources for students.</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${showUpload
            ? 'bg-slate-100 text-slate-600'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-200'
            }`}
        >
          {showUpload ? <X size={18} /> : <Plus size={18} />}
          {showUpload ? 'Cancel' : 'Upload Material'}
        </button>
      </div>

      {showUpload && (
        <form onSubmit={handleUpload} className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 mb-8 space-y-4 max-w-xl animate-in zoom-in duration-300">
          <h3 className="font-black text-lg text-slate-900 mb-4">New Material Details</h3>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Title</label>
            <input
              type="text" required
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-black"
              value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Aptitude Shortcuts"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Category</label>
            <select
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-black appearance-none cursor-pointer"
              value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="aptitude">Aptitude</option>
              <option value="logical">Logical Reasoning</option>
              <option value="verbal">Verbal</option>
              <option value="interview">Interview Preparation</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Attachment (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-black mb-2"
            />
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-slate-100"></div>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Or provide URL</span>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <input
              type="url"
              className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all text-black disabled:opacity-50"
              placeholder="https://example.com/file.pdf"
              value={formData.file_url} onChange={e => setFormData({ ...formData, file_url: e.target.value })}
              disabled={!!file}
            />
          </div>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            {isUploading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            )}
            {isUploading ? 'Uploading...' : 'Save Material'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['aptitude', 'logical', 'verbal', 'interview'].map(cat => (
            <div key={cat} className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 border-b border-slate-100 pb-2 ml-1">{cat}</h3>
              {materials.filter(m => m.category === cat).map(m => (
                <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 group hover:border-blue-200 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-blue-500" />
                      <span className="font-bold text-slate-800 text-sm line-clamp-1">{m.title}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <a
                    href={m.file_url}
                    target="_blank"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 py-2.5 px-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-center justify-center"
                  >
                    <ExternalLink size={12} />
                    View Material
                  </a>
                </div>
              ))}
              {materials.filter(m => m.category === cat).length === 0 && (
                <div className="bg-slate-50/50 rounded-2xl p-6 border border-dashed border-slate-200 text-center">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No materials</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error Modal */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        onConfirm={() => setErrorModal({ isOpen: false, message: '' })}
        title="Error"
        message={errorModal.message}
        type="danger"
        confirmText="OK"
        showCancel={false}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Material"
        message="Are you sure you want to delete this material? This action cannot be undone."
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
