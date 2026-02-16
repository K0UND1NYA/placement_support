'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ExamReviewPage() {
    const { id: examId } = useParams();
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await apiFetch(`/exams/${examId}/review`);
                setReviewData(data);
            } catch (err) {
                setError(err.message || 'Failed to load review. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [examId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Review Unavailable</h2>
                    <p className="text-slate-500 mb-6">{error}</p>
                    <Link href="/dashboard/exams" className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">
                        Back to Exams
                    </Link>
                </div>
            </div>
        );
    }

    const { attempt, questions } = reviewData;
    const userAnswers = attempt.answers || {}; // { questionId: answer }

    const correctCount = questions.filter(q => userAnswers[q.id] === q.correct_answer).length;
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/exams" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-lg font-black text-slate-900">Exam Review</h1>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Results Analysis</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-slate-500">Total Score</div>
                        <div className="text-2xl font-black text-blue-600">{correctCount} <span className="text-sm text-slate-400 font-medium">/ {questions.length}</span></div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">

                {/* Score Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border-8 text-2xl font-black shrink-0 ${percentage >= 80 ? 'border-green-100 text-green-600 bg-green-50' :
                            percentage >= 50 ? 'border-blue-100 text-blue-600 bg-blue-50' :
                                'border-red-100 text-red-500 bg-red-50'
                        }`}>
                        {percentage}%
                    </div>

                    <div className="z-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">
                            {percentage >= 80 ? 'Excellent Performance!' :
                                percentage >= 50 ? 'Good Effort!' :
                                    'Needs Improvement'}
                        </h2>
                        <p className="text-slate-500 max-w-sm">
                            {percentage >= 80 ? 'You demonstrated strong understanding of the topics.' :
                                percentage >= 50 ? 'You have a solid foundation but could improve in some areas.' :
                                    'We recommend reviewing the learning materials and trying again.'}
                        </p>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                    {questions.map((q, idx) => {
                        const userAnswer = userAnswers[q.id];
                        const isCorrect = userAnswer === q.correct_answer;
                        const isSkipped = !userAnswer;

                        return (
                            <div key={q.id} className={`bg-white rounded-2xl p-6 border-2 transition-all ${isCorrect ? 'border-green-100 shadow-sm' : 'border-red-50 shadow-sm'
                                }`}>
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Question {idx + 1}</span>
                                    {isCorrect ? (
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                                            <CheckCircle2 size={14} /> Correct
                                        </span>
                                    ) : isSkipped ? (
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-wide">
                                            Skipped
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                                            <XCircle size={14} /> Incorrect
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 mb-6">{q.question}</h3>

                                <div className="space-y-3">
                                    {q.options.map((opt, optIdx) => {
                                        // Logic for displaying options colors
                                        let style = "bg-slate-50 border-slate-100 text-slate-500";
                                        let icon = null;

                                        if (opt === q.correct_answer) {
                                            style = "bg-green-50 border-green-200 text-green-800 font-bold ring-1 ring-green-200"; // Always show correct answer in green
                                            icon = <CheckCircle2 size={16} className="text-green-600" />;
                                        } else if (opt === userAnswer && !isCorrect) {
                                            style = "bg-red-50 border-red-200 text-red-800 font-bold ring-1 ring-red-200"; // Show wrong selection in red
                                            icon = <XCircle size={16} className="text-red-500" />;
                                        }

                                        return (
                                            <div key={optIdx} className={`flex items-center justify-between p-4 rounded-xl border ${style}`}>
                                                <span>{opt}</span>
                                                {icon}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </main>
        </div>
    );
}
