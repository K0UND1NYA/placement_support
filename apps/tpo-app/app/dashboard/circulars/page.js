"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { MessageSquare, Plus, Trash2, Calendar, User, Send } from "lucide-react";
import ParticleCard from "@/components/ParticleCard";

export default function CircularsPage() {
    const [circulars, setCirculars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachmentUrl, setAttachmentUrl] = useState("");
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

    const fetchCirculars = async () => {
        try {
            setLoading(true);
            const data = await apiFetch("/circulars");
            setCirculars(data);
        } catch (err) {
            console.error("Failed to fetch circulars:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCirculars();
    }, []);

    const handleCreateCircular = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            setIsSubmitting(true);

            let finalUrl = attachmentUrl;

            // If a file is selected, upload it first
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                // We use fetch directly or fix apiFetch to handle FormData if needed
                // Assuming apiFetch might not handle FormData by default, let's use fetch with session token
                const token = sessionStorage.getItem('token');
                const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads-manager`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    finalUrl = uploadData.file_url;
                } else {
                    throw new Error(uploadData.error || 'File upload failed');
                }
            }

            await apiFetch("/circulars", {
                method: "POST",
                body: JSON.stringify({ title, content, attachment_url: finalUrl }),
            });
            setTitle("");
            setContent("");
            setAttachmentUrl("");
            setFile(null);
            fetchCirculars();
        } catch (err) {
            console.error("Failed to create circular:", err);
            alert(err.message || "Failed to create circular");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCircular = async () => {
        if (!deleteModal.id) return;

        try {
            await apiFetch(`/circulars/${deleteModal.id}`, { method: "DELETE" });
            setCirculars(circulars.filter((c) => c.id !== deleteModal.id));
            setDeleteModal({ show: false, id: null });
        } catch (err) {
            console.error("Failed to delete circular:", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <MessageSquare className="text-blue-600" size={32} />
                        College Circulars
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">Manage and broadcast important notifications to all students.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Circular Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-100/50 border border-slate-100 sticky top-8">
                        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Plus className="text-blue-600" size={24} />
                            Create New Circular
                        </h3>
                        <form onSubmit={handleCreateCircular} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                                    Circular Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Placement Drive - Google"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                                    Notification Message
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter the detailed announcement here..."
                                    rows={5}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                                    Attachment (PDF or Link)
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3 text-xs font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none text-black"
                                    />
                                    <div className="flex items-center gap-2">
                                        <div className="h-px flex-1 bg-slate-100"></div>
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Or provide URL</span>
                                        <div className="h-px flex-1 bg-slate-100"></div>
                                    </div>
                                    <input
                                        type="url"
                                        value={attachmentUrl}
                                        onChange={(e) => setAttachmentUrl(e.target.value)}
                                        placeholder="https://drive.google.com/..."
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none text-black"
                                        disabled={!!file}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                {isSubmitting ? "Broadcasting..." : "Broadcast Circular"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Circulars List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 ml-2">
                        Recent Broadcasts
                    </h3>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading circulars...</p>
                        </div>
                    ) : circulars.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] p-12 border-2 border-dashed border-slate-200 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                                <MessageSquare size={32} />
                            </div>
                            <p className="text-slate-500 font-bold mb-1">No circulars found</p>
                            <p className="text-slate-400 text-sm">Start by creating your first announcement to students.</p>
                        </div>
                    ) : (
                        circulars.map((circular) => (
                            <div key={circular.id} className="group relative">
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-100/20 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h4 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                                                {circular.title}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Calendar size={14} className="text-blue-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                                        {new Date(circular.created_at).toLocaleDateString(undefined, {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <User size={14} className="text-blue-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                                        By {circular.creator_name || 'TPO Officer'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setDeleteModal({ show: true, id: circular.id })}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                            title="Delete circular"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="prose prose-slate max-w-none mb-6">
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-wrap">
                                            {circular.content}
                                        </p>
                                    </div>
                                    {circular.attachment_url && (
                                        <div className="mb-6">
                                            <a
                                                href={circular.attachment_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                <Send size={14} className="rotate-45" />
                                                View Attachment
                                            </a>
                                        </div>
                                    )}
                                    <div className="h-1.5 w-12 bg-blue-600 rounded-full"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300 text-center">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Trash2 size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Delete Circular?</h3>
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                            This action cannot be undone. All students will lose access to this announcement.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteModal({ show: false, id: null })}
                                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteCircular}
                                className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200 active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
