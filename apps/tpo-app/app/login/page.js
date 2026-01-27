'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function TPOLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP State
  const [otp, setOtp] = useState('');
  const [otpId, setOtpId] = useState(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // STEP 1: Verify Credentials
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.status === 'OTP_REQUIRED') {
        setOtpId(data.otpId);
      } else {
        // Fallback if backend implementation changes
        throw new Error('Unexpected login response');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiFetch('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ otpId, otp }),
      });

      if (data.user.role !== 'tpo') {
        throw new Error('Access denied: You are not a TPO');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'OTP Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-2xl text-slate-900 border border-slate-800/20">
        <div>
          <h2 className="text-center text-4xl font-black tracking-tight text-slate-900 uppercase italic">
            TPO Access
          </h2>
          <p className="mt-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            College Placement Authority Control
          </p>
        </div>
        
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 font-bold text-center italic">
            ALERT: {error}
          </div>
        )}

        {!otpId ? (
          // STEP 1 FORM
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Credentials | Email</label>
                <input
                  type="email"
                  required
                  className="block w-full rounded-xl border-2 border-slate-100 py-3 px-4 text-slate-900 focus:border-blue-600 transition-all outline-none bg-slate-50 font-medium"
                  placeholder="authority@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Security | Password</label>
                <input
                  type="password"
                  required
                  className="block w-full rounded-xl border-2 border-slate-100 py-3 px-4 text-slate-900 focus:border-blue-600 transition-all outline-none bg-slate-50 font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-black text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest italic"
            >
              {loading ? 'Verifying Identity...' : 'Authorize Login'}
            </button>
          </form>
        ) : (
          // STEP 2 FORM
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">2FA | OTP Code</label>
                <input
                  type="text"
                  required
                  className="block w-full rounded-xl border-2 border-slate-100 py-3 px-4 text-slate-900 focus:border-blue-600 transition-all outline-none bg-slate-50 font-medium text-center tracking-[1em] font-mono text-lg"
                  placeholder="XXXXXX"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-black text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest italic"
            >
              {loading ? 'Validating Token...' : 'Complete Access'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
