'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { Mic, MicOff, Send, Volume2, StopCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/Modal';

export default function InterviewRoomPage() {
  const params = useParams(); 
  const interviewId = params.id;
  
  const router = useRouter();
  
  const [attempt, setAttempt] = useState(null);
  const [history, setHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Modals
  const [confirmEndModal, setConfirmEndModal] = useState(false);
  const [resultModal, setResultModal] = useState({ isOpen: false, data: null });

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Initialize standard browser APIs
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
           const currentTranscript = Array.from(event.results)
             .map(result => result[0])
             .map(result => result.transcript)
             .join('');
           setTranscript(currentTranscript);
        };

        recognitionRef.current.onend = () => {
           setIsRecording(false);
        };
      } else {
        setError('Browser does not support Speech Recognition. Please use Chrome or Edge.');
      }

      synthRef.current = window.speechSynthesis;
    }

    startInterview();

    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const startInterview = async () => {
    try {
      const attemptData = await apiFetch('/mock-interview/start', {
        method: 'POST',
        body: JSON.stringify({ mock_interview_id: interviewId })
      });
      setAttempt(attemptData);
      
      if (attemptData.conversation_history) {
         setHistory(attemptData.conversation_history.filter(m => m.role !== 'system'));
         
         const visibleHistory = attemptData.conversation_history.filter(m => m.role !== 'system');
         if (visibleHistory.length === 0) {
            processInteraction(attemptData.id, ''); 
         }
         // Assuming if loaded with history, check if it was already finished? 
         // But logic here assumes 'in_progress'. 
      }
    } catch (err) {
      setError('Failed to start interview: ' + err.message);
    }
  };

  const processInteraction = async (attemptId, text) => {
    setIsProcessing(true);
    try {
      if(text) {
        setHistory(prev => [...prev, { role: 'user', content: text }]);
      }

      const data = await apiFetch('/mock-interview/process-interaction', {
        method: 'POST',
        body: JSON.stringify({
          attempt_id: attemptId,
          user_transcript: text
        })
      });

      setHistory(data.history.filter(m => m.role !== 'system'));
      speakText(data.response);

    } catch (err) {
      console.error(err);
      setError('AI Processing Failed');
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const speakText = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Zira'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleSend = () => {
    if (!transcript.trim() && !isRecording) return;
    if (isRecording) recognitionRef.current?.stop();
    if (transcript.trim() && attempt) {
       processInteraction(attempt.id, transcript);
    }
  };

  const confirmFinish = async () => {
      try {
         setIsProcessing(true);
         const result = await apiFetch('/mock-interview/submit', {
            method: 'POST',
            body: JSON.stringify({ attempt_id: attempt?.id })
         });
         setConfirmEndModal(false);
         setResultModal({ isOpen: true, data: result.feedback });
      } catch(err) {
         alert('Error finishing: ' + err.message); // Keep alert for error fallback or use error state
         setConfirmEndModal(false);
      } finally {
          setIsProcessing(false);
      }
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/dashboard/mock-interviews" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold">
           <ArrowLeft size={18} /> Exit
        </Link>
        <button 
          onClick={() => setConfirmEndModal(true)}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition-colors text-sm"
        >
          End Interview
        </button>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
           {history.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}
                `}>
                   {msg.content}
                </div>
             </div>
           ))}
           {isProcessing && (
              <div className="flex justify-start">
                 <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-200 flex gap-2 items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
           )}
           <div ref={chatEndRef} />
        </div>

        {/* Controls Area */}
        <div className="p-6 bg-white border-t border-slate-100">
           
           <div className="flex justify-center mb-6 h-12 items-center">
              {isSpeaking ? (
                <div className="flex gap-1 items-center bg-green-50 px-4 py-2 rounded-full border border-green-100">
                   <Volume2 size={18} className="text-green-600 animate-pulse" />
                   <span className="text-xs font-bold text-green-600 uppercase tracking-widest">AI Speaking...</span>
                </div>
              ) : isRecording ? (
                <div className="flex gap-1 items-center bg-red-50 px-4 py-2 rounded-full border border-red-100 animate-pulse">
                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                   <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Listening...</span>
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ready</div>
              )}
           </div>

           <div className="flex gap-4 items-center">
              <button
                onClick={toggleRecording}
                disabled={isProcessing || isSpeaking}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl
                   ${isRecording 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95'
                   } disabled:opacity-50 disabled:scale-100`}
              >
                 {isRecording ? <StopCircle size={32} /> : <Mic size={28} />}
              </button>

              <div className="flex-1 relative">
                 <input 
                   type="text"
                   value={transcript}
                   onChange={(e) => setTranscript(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Speak or type your answer..."
                   className="w-full bg-slate-100 border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl py-4 pl-6 pr-14 outline-none font-medium transition-all"
                   disabled={isProcessing}
                 />
                 <button 
                   onClick={handleSend}
                   disabled={!transcript.trim() || isProcessing}
                   className="absolute right-2 top-2 p-2 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-0"
                 >
                    <Send size={20} />
                 </button>
              </div>
           </div>
           
           {error && (
             <p className="text-red-500 text-xs font-bold mt-4 text-center">{error}</p>
           )}
        </div>
      </div>

      <Modal
        isOpen={confirmEndModal}
        title="End Interview"
        message="Are you sure you want to finish the interview? This will submit your answers for evaluation."
        type="danger"
        confirmText="Yes, Finish"
        onClose={() => setConfirmEndModal(false)}
        onConfirm={confirmFinish}
      />

      <Modal
        isOpen={resultModal.isOpen}
        title={`Interview Completed! Score: ${resultModal.data?.score}/100`}
        message={resultModal.data?.feedback}
        type="success"
        confirmText="Go to List"
        cancelText="Close"
        onClose={() => router.push('/dashboard/mock-interviews')}
        onConfirm={() => router.push('/dashboard/mock-interviews')}
      />
    </div>
  );
}

