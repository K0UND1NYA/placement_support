'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { FileText, ExternalLink, BookOpen, Brain, GraduationCap, MessageCircle, Sparkles } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const CATEGORIES = [
  { key: 'all', label: 'All', icon: <Sparkles size={14} /> },
  { key: 'aptitude', label: 'Aptitude', icon: <Brain size={14} /> },
  { key: 'logical', label: 'Logical', icon: <GraduationCap size={14} /> },
  { key: 'verbal', label: 'Verbal', icon: <MessageCircle size={14} /> },
  { key: 'interview', label: 'Interview', icon: <BookOpen size={14} /> },
];

export default function StudentTintPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    apiFetch('/tint')
      .then(setMaterials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredMaterials =
    selectedCategory === 'all'
      ? materials
      : materials.filter(m => m.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
            Learning Toolkit
          </p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Training & Interview Notes (TINT)
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Access curated notes and materials for your preparation.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 px-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                ${selectedCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 ring-4 ring-blue-50'
                  : 'bg-white text-slate-600 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50'
                }
              `}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="bg-white h-44 rounded-3xl border border-slate-100 animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-16 border-2 border-dashed border-slate-100 text-center mx-2 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto mb-4">
              <BookOpen size={32} />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              No materials found in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 animate-in slide-in-from-bottom-4 duration-500">
            {filteredMaterials.map(m => (
              <div
                key={m.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm
                hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900 leading-snug line-clamp-2 mt-1">
                      {m.title}
                    </p>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 mt-1 block px-2 py-0.5 bg-slate-50 rounded-full w-fit">
                      {m.category}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50">
                  <a
                    href={m.file_url}
                    target="_blank"
                    className="inline-flex items-center justify-center w-full gap-2
                    text-[10px] font-black uppercase tracking-widest
                    bg-slate-50 text-slate-400 py-3 rounded-2xl
                    group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-blue-100"
                  >
                    <ExternalLink size={14} />
                    View Material
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
