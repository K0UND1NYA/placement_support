'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Modal from '@/components/Modal';

export default function NewExamPage() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [duration, setDuration] = useState(30);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errorModal, setErrorModal] = useState({ isOpen: false, title: '', message: '' });
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correct_answer: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiParams, setAiParams] = useState({
    pattern: 'Standard MCQ',
    type: 'Aptitude',
    count: 5,
    difficulty: 'Medium',
    description: ''
  });
  const router = useRouter();

  const handleAIGenerate = async () => {
    if (!aiParams.type || !aiParams.pattern) {
      setErrorModal({
        isOpen: true,
        title: 'Missing Info',
        message: 'Please provide at least a Topic and a Pattern for AI generation.'
      });
      return;
    }

    setAiLoading(true);
    try {
      const data = await apiFetch('/ai/generate-questions', {
        method: 'POST',
        body: JSON.stringify(aiParams)
      });

      if (data.questions && Array.isArray(data.questions)) {
        // Map any questions that might be missing options or correct_answer
        const formattedQuestions = data.questions.map(q => ({
          question: q.question || '',
          options: q.options || ['', '', '', ''],
          correct_answer: q.correct_answer || ''
        }));
        setQuestions([...questions, ...formattedQuestions].filter(q => q.question || q.options.some(o => o.trim() !== '')));
      }
    } catch (err) {
      setErrorModal({
        isOpen: true,
        title: 'AI Generation Failed',
        message: err.message || 'Failed to generate questions. Please check if backend is running and HF_TOKEN is configured.'
      });
    } finally {
      setAiLoading(false);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correct_answer: '' }]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if every question has a correct answer selected
    const missingAnswers = questions.some(q => !q.correct_answer);
    if (missingAnswers) {
      setErrorModal({
        isOpen: true,
        title: 'Validation Error',
        message: "Some questions do not have a correct answer selected. Please select a correct answer for each question."
      });
      return;
    }

    setLoading(true);

    try {
      const exam = await apiFetch('/exams', {
        method: 'POST',
        body: JSON.stringify({
          title,
          duration,
          code,
          start_time: startTime || null,
          end_time: endTime || null
        }),
      });

      await apiFetch(`/exams/${exam.id}/questions`, {
        method: 'POST',
        body: JSON.stringify({ questions }),
      });

      router.push('/dashboard/exams');
    } catch (err) {
      setErrorModal({
        isOpen: true,
        title: 'Creation Failed',
        message: err.message || 'Failed to create exam'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-900">Create Placement Exam</h2>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Real-time Edition</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-slate-900">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Exam Title</label>
              <input
                type="text"
                required
                className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-0 transition-all outline-none"
                placeholder="e.g. TCS Ninja Test"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Exam Code (6 Digits)</label>
              <input
                type="text"
                required
                maxLength="6"
                pattern="\d{6}"
                className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-0 transition-all outline-none"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Duration (mins)</label>
              <input
                type="number"
                required
                min="1"
                className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-0 transition-all outline-none"
                value={duration || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setDuration(isNaN(val) ? 0 : val);
                }}
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Scheduling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Start Time</label>
              <input
                type="datetime-local"
                className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-0 transition-all outline-none"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">End Time</label>
              <input
                type="datetime-local"
                className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-0 transition-all outline-none"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Improved AI Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-8 rounded-3xl border border-blue-700 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 blur-3xl -mr-32 -mt-32 group-hover:bg-indigo-500 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 opacity-10 blur-3xl -ml-32 -mb-32 group-hover:bg-blue-500 transition-all duration-700"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">AI Content Generator</h3>
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest opacity-80">Real-time Placement Standards</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-blue-300 mb-2 uppercase tracking-widest">Topic/Category</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:bg-white/10 focus:border-blue-400 transition-all outline-none backdrop-blur-sm"
                    placeholder="e.g. JavaScript, Logical Reasoning"
                    value={aiParams.type}
                    onChange={(e) => setAiParams({ ...aiParams, type: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-blue-300 mb-2 uppercase tracking-widest">Difficulty</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:bg-white/10 focus:border-blue-400 transition-all outline-none backdrop-blur-sm appearance-none"
                    value={aiParams.difficulty}
                    onChange={(e) => setAiParams({ ...aiParams, difficulty: e.target.value })}
                  >
                    <option className="bg-slate-900" value="Easy">Entry Level / Easy</option>
                    <option className="bg-slate-900" value="Medium">Standard Placement / Medium</option>
                    <option className="bg-slate-900" value="Hard">Advanced / Hard</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-blue-300 mb-2 uppercase tracking-widest">Additional Context (Optional)</label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:bg-white/10 focus:border-blue-400 transition-all outline-none backdrop-blur-sm h-[115px] resize-none"
                    placeholder="e.g. Focus on React hooks, or TCS NQT 2024 pattern..."
                    value={aiParams.description}
                    onChange={(e) => setAiParams({ ...aiParams, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-xs font-black text-blue-300 mb-2 uppercase tracking-widest">Questions Count</label>
                  <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/10">
                    {[3, 5, 10, 15].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setAiParams({ ...aiParams, count: n })}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${aiParams.count === n ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-200 hover:bg-white/5'}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={aiLoading}
                onClick={handleAIGenerate}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg uppercase tracking-tighter"
              >
                {aiLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    Generate with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">Exam Content</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold shadow-sm hover:shadow-md border border-blue-200 transition-all"
            >
              + Add Question Manually
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-6 text-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                <h4 className="font-bold text-blue-600 uppercase tracking-widest text-sm">Question {qIndex + 1}</h4>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setQuestions(questions.filter((_, i) => i !== qIndex))}
                    className="text-red-400 hover:text-red-600 text-xs font-bold uppercase"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Question Text</label>
                <textarea
                  required
                  className="w-full border-2 border-slate-100 bg-slate-50 rounded-xl p-4 focus:border-blue-400 transition-all outline-none"
                  rows="3"
                  placeholder="Enter the question here..."
                  value={q.question}
                  onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="relative">
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tighter ml-1">Option {oIndex + 1}</label>
                    <input
                      type="text"
                      required
                      className="w-full border-b-2 border-slate-100 py-2 focus:border-blue-400 transition-all outline-none bg-transparent"
                      placeholder={`Choice ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-600">Select Correct Answer</label>
                  {!q.correct_answer && (
                    <span className="text-red-500 text-xs font-bold animate-pulse">Required: Please select one option below</span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {q.options.map((opt, oIndex) => (
                    opt && (
                      <button
                        key={oIndex}
                        type="button"
                        onClick={() => updateQuestion(qIndex, 'correct_answer', opt)}
                        className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${q.correct_answer === opt
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-200'
                          }`}
                      >
                        {opt}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white font-black py-4 rounded-2xl hover:bg-blue-800 shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0 text-xl tracking-widest uppercase"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Publish Exam Now
            </span>
          ) : 'Publish Exam Now'}
        </button>
      </form>

      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
        onConfirm={() => setErrorModal({ ...errorModal, isOpen: false })}
        title={errorModal.title}
        message={errorModal.message}
        type="danger"
        confirmText="Understood"
        showCancel={false}
      />
    </div>
  );
}
