'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { Clock, Shield, Send, ChevronRight, CheckCircle2, ChevronLeft, Layout, MousePointer2, AlertTriangle, XCircle, Info } from 'lucide-react';
import gsap from 'gsap';
import Modal from '@/components/Modal';

export default function ExamAttemptPage() {
  const { id: examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attemptId, setAttemptId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [tabViolations, setTabViolations] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const router = useRouter();

  const mainContentRef = useRef(null);
  const qCardRef = useRef(null);
  const questionStartTime = useRef(Date.now());
  const terminationRef = useRef(false);

  // Logging utility
  const logEvent = useCallback((type, metadata = {}) => {
    if (!attemptId) return;
    apiFetch('/integrity/log', {
      method: 'POST',
      body: JSON.stringify({ attempt_id: attemptId, type, metadata }),
    }).catch(console.error);
  }, [attemptId]);

  // Initialize Data
  useEffect(() => {
    const initExam = async () => {
      try {
        const [attemptRes, exams] = await Promise.all([
          apiFetch('/attempts/start', {
            method: 'POST',
            body: JSON.stringify({ exam_id: examId }),
          }),
          apiFetch('/exams'),
        ]);

        setAttemptId(attemptRes.attempt_id);
        const currentExam = exams.find(e => e.id === examId);
        if (!currentExam) throw new Error('Exam not found');

        const questionsData = await apiFetch(`/exams/${examId}/questions`).catch(() => []);

        setExam(currentExam);
        setQuestions(questionsData);

        const startTime = new Date(attemptRes.started_at).getTime();
        const durationMs = currentExam.duration * 60 * 1000;
        const endTime = startTime + durationMs;
        const remainingSeconds = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

        setTimeLeft(remainingSeconds);
      } catch (err) {
        console.error('Initialization error:', err);
        router.push('/dashboard/exams');
      } finally {
        setLoading(false);
      }
    };
    initExam();
  }, [examId, router]);

  // Entrance Animation
  useEffect(() => {
    if (!loading && exam) {
      gsap.fromTo(".nav-item",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" }
      );
      gsap.fromTo(".q-container",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [loading, exam]);

  // Question Switch Animation
  useEffect(() => {
    if (qCardRef.current) {
      gsap.fromTo(qCardRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    questionStartTime.current = Date.now();
  }, [activeQuestion]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(true);
      return;
    }
    if (timeLeft === null) return;
    const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Integrity Controls
  useEffect(() => {
    if (!attemptId) return;

    const handleBlur = () => {
      if (!hasStarted || isTerminated) return;
      logEvent('window_blur', { timestamp: new Date().toISOString() });
      setTabViolations(prev => {
        const next = prev + 1;
        if (next >= 5) triggerTermination('Too many tab switches/window blurs');
        return next;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted && !isTerminated) {
        logEvent('tab_hidden', { timestamp: new Date().toISOString() });
        setTabViolations(prev => {
          const next = prev + 1;
          if (next >= 5) triggerTermination('Excessive tab switching detected');
          return next;
        });
      }
    };

    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (!hasStarted || isTerminated) return;
      if ((e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'p' || e.key === 'r')) || e.key === 'F5') {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('paste', handlePaste);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [attemptId, logEvent, hasStarted, isTerminated]);

  const triggerTermination = (reason) => {
    if (terminationRef.current) return;
    terminationRef.current = true;

    setIsTerminated(true);
    logEvent('automatic_termination', { reason, timestamp: new Date().toISOString() });
    handleSubmit(true, reason);
  };

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (auto = false, terminationReason = null) => {
    if (!attemptId || isSubmitting) return;

    const performSubmission = async () => {
      setIsSubmitting(true);
      try {
        await apiFetch(`/exams/${examId}/attempt`, {
          method: 'POST',
          body: JSON.stringify({
            answers,
            attempt_id: attemptId,
            is_termination: !!terminationReason,
            termination_reason: terminationReason
          }),
        });

        setModalConfig({ isOpen: false });
        if (!terminationReason) {
          router.push('/dashboard/exams');
        }
      } catch (err) {
        console.error('Submission technical error:', err);
        if (!terminationReason) setIsSubmitting(false);
      }
    };

    if (!auto) {
      const unansweredCount = questions.length - Object.keys(answers).length;
      if (unansweredCount > 0) {
        setModalConfig({
          isOpen: true,
          type: 'warning',
          title: 'Unanswered Questions',
          message: `You have ${unansweredCount} unanswered questions. Are you sure you want to end your exam session now?`,
          confirmText: 'Submit Anyway',
          onConfirm: performSubmission,
          onClose: () => setModalConfig({ isOpen: false })
        });
        return;
      }

      setModalConfig({
        isOpen: true,
        type: 'info',
        title: 'Submit Exam',
        message: 'Are you sure you want to end this exam session? Once submitted, you cannot change your answers.',
        confirmText: 'Submit Exam',
        onConfirm: performSubmission,
        onClose: () => setModalConfig({ isOpen: false })
      });
      return;
    }

    performSubmission();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return (Object.keys(answers).length / questions.length) * 100;
  }, [answers, questions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] text-center">Initalizing Secure Interface...</p>
      </div>
    );
  }

  const currentQ = questions[activeQuestion];

  return (
    <div className="h-screen bg-[#FDFDFF] flex flex-col font-sans select-none overflow-hidden max-w-[900px] mx-auto border-x border-slate-100 shadow-2xl">

      {/* Optimized Header for 900px width */}
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Shield size={18} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black text-slate-950 leading-tight truncate max-w-[150px]">{exam?.title}</h1>
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Session</p>
          </div>
        </div>

        {/* Progress Bar centered in header */}
        <div className="flex-1 max-w-[200px] mx-4">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[8px] font-black text-center mt-1.5 text-slate-400 uppercase tracking-[0.2em]">
            {Object.keys(answers).length}/{questions.length} Questions
          </p>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-black text-lg transition-all ${timeLeft < 180 ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-slate-50 border-slate-100 text-slate-800'
          }`}>
          <Clock size={16} className={timeLeft < 180 ? 'text-red-500' : 'text-slate-400'} />
          {formatTime(timeLeft)}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Compact Question Map Sidebar - Reduced Width for 900px fit */}
        <aside className="w-56 bg-white border-r border-slate-100 p-6 flex flex-col overflow-y-auto hidden sm:flex shrink-0">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Question Map</h3>
          <div className="grid grid-cols-3 gap-2 pb-6">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveQuestion(idx)}
                className={`nav-item h-10 rounded-lg text-xs font-bold transition-all duration-300 ${activeQuestion === idx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  : answers[questions[idx].id]
                    ? 'bg-green-50 text-green-600 border border-green-100'
                    : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-auto p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <span className="text-[8px] font-black uppercase tracking-widest text-blue-900 block mb-1">Security Status</span>
            <p className="text-[10px] font-bold text-blue-700/70 leading-relaxed">
              Secure Environment Active
            </p>
          </div>
        </aside>

        {/* Optimized Content Area for 900px Width and 1020px Height */}
        <section className="flex-1 p-6 lg:p-8 overflow-y-auto q-container bg-slate-50/20" ref={mainContentRef}>
          <div className="max-w-2xl mx-auto flex flex-col h-full" ref={qCardRef}>

            {/* Question Display */}
            <div className="mb-8 text-center pt-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-black text-[9px] uppercase tracking-widest mb-3">
                Question {activeQuestion + 1} of {questions.length}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {currentQ?.question}
              </h2>
            </div>

            {/* Optimized 2x2 Grid for Response Options */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 flex-1 content-start">
              {currentQ?.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === opt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(currentQ.id, opt)}
                    className={`group relative flex items-center p-5 md:p-6 rounded-[2rem] border-4 text-left transition-all duration-300 ${isSelected
                      ? 'bg-white border-blue-600 shadow-xl shadow-blue-600/5 ring-4 ring-blue-600/5'
                      : 'bg-white border-white shadow-md shadow-slate-200/20 hover:border-slate-100'
                      }`}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl border-2 flex items-center justify-center mr-4 md:mr-6 shrink-0 transition-all duration-300 ${isSelected ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-slate-100'
                      }`}>
                      <span className="font-black text-xs md:text-sm">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 flex-1 leading-snug ${isSelected ? 'text-blue-950' : 'text-slate-600 group-hover:text-slate-900'
                      }`}>
                      {opt}
                    </span>
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-blue-600 animate-in zoom-in">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
              <button
                onClick={() => setActiveQuestion(prev => Math.max(0, prev - 1))}
                disabled={activeQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 disabled:opacity-30 transition-all font-black uppercase tracking-widest text-[10px]"
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              {activeQuestion < questions.length - 1 ? (
                <button
                  onClick={() => setActiveQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-950 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                >
                  Next Question
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  {isSubmitting ? 'Submitting...' : 'End Exam'}
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Violation Overlay */}
      {isTerminated && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[200] flex items-center justify-center p-6 text-slate-900">
          <div className="max-w-sm w-full bg-white rounded-[2.5rem] p-8 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <XCircle size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-950 mb-3">Terminated</h2>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8">
              Your session has been submitted due to integrity violations.
            </p>
            <button
              onClick={() => router.push('/dashboard/exams')}
              className="w-full bg-slate-950 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Security Protocol Overlay */}
      {!hasStarted && !loading && (
        <div className="fixed inset-0 bg-white z-[150] flex items-center justify-center p-6 text-slate-900">
          <div className="max-w-md w-full">
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shield size={32} />
              </div>
              <h2 className="text-4xl font-black text-slate-950 tracking-tight mb-4 uppercase">Security<br />Protocol</h2>
              <div className="space-y-4 text-left">
                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="shrink-0 text-blue-600"><Info size={20} /></div>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">
                    This session is monitored. <span className="text-slate-950 font-bold">Tab switching</span> is prohibited.
                  </p>
                </div>
                <div className="flex gap-4 p-5 bg-red-50 rounded-2xl border border-red-100">
                  <div className="shrink-0 text-red-600"><AlertTriangle size={20} /></div>
                  <p className="text-red-900 text-xs font-bold leading-relaxed">
                    Limit: 5 Violations. Exceeding this triggers immediate termination.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setHasStarted(true)}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-slate-950 transition-all active:scale-[0.98]"
            >
              Accept & Start
            </button>
          </div>
        </div>
      )}

      <Modal {...modalConfig} isLoading={isSubmitting} />
    </div>
  );
}
