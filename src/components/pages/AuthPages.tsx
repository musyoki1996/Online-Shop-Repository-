import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

interface AuthPagesProps {
  initialMode?: 'login' | 'register' | 'forgot-password';
}

export const AuthPages: React.FC<AuthPagesProps> = ({ initialMode = 'login' }) => {
  const { login, registerUser, navigateTo, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (email && password) {
        login(email, 'customer');
        navigateTo('account');
      } else {
        showToast('Please enter your email and password', 'warning');
      }
    } else if (mode === 'register') {
      if (!name || !email || !password || !agreeTerms) {
        showToast('Please fill out all fields and accept terms', 'warning');
        return;
      }
      registerUser(name, email, phone, 'customer');
      navigateTo('account');
    } else if (mode === 'forgot-password') {
      showToast(`Password reset link dispatched to ${email}`, 'info');
      setMode('login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl border border-[#E7EBE8] shadow-lg p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <BrandLogo size="md" onClick={() => navigateTo('home')} />
          <h2 className="mt-4 text-2xl font-bold text-slate-900 font-display">
            {mode === 'login' && 'Sign in to Kavora'}
            {mode === 'register' && 'Create your Kavora Account'}
            {mode === 'forgot-password' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login' && 'Access order history, live parcel tracking & saved items.'}
            {mode === 'register' && 'Join Kenya\'s premier verified marketplace.'}
            {mode === 'forgot-password' && 'Enter your registered email to receive a recovery link.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Legal Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. David Mwangi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7F8F6] border border-slate-300 rounded focus:outline-hidden focus:border-[#104D49]"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#F7F8F6] border border-slate-300 rounded focus:outline-hidden focus:border-[#104D49]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kenyan Mobile Number (M-Pesa) *</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+254 7XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7F8F6] border border-slate-300 rounded focus:outline-hidden focus:border-[#104D49]"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          {mode !== 'forgot-password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Password *</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot-password')}
                    className="text-[11px] text-[#104D49] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7F8F6] border border-slate-300 rounded focus:outline-hidden focus:border-[#104D49]"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <label className="flex items-start gap-2 pt-1 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-slate-300 text-[#104D49] mt-0.5"
              />
              <span className="text-[11px] leading-tight">
                I accept the Kavora Terms of Service and Privacy Policy.
              </span>
            </label>
          )}

          <button
            type="submit"
            className="w-full bg-[#104D49] hover:bg-[#083C39] text-white py-3 px-4 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>{mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'login' && (
            <p>
              Don't have an account yet?{' '}
              <button onClick={() => setMode('register')} className="font-bold text-[#104D49] hover:underline">
                Create one now
              </button>
            </p>
          )}
          {mode === 'register' && (
            <p>
              Already registered with Kavora?{' '}
              <button onClick={() => setMode('login')} className="font-bold text-[#104D49] hover:underline">
                Sign in
              </button>
            </p>
          )}
          {mode === 'forgot-password' && (
            <button onClick={() => setMode('login')} className="font-semibold text-[#104D49] hover:underline">
              ← Back to Sign In
            </button>
          )}
        </div>

        {/* Trust Note */}
        <div className="p-3 bg-slate-50 rounded text-[11px] text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#104D49]" />
          <span>SSL 256-bit secure customer credential authentication</span>
        </div>
      </div>
    </div>
  );
};
