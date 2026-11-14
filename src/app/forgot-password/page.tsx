'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/common/Toast';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    setSent(true);
    showToast('Reset instructions sent to your email', 'success');
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-16 px-5 bg-[#111714]">
      <div className="w-full max-w-md p-8 md:p-10 rounded-2xl bg-[#18211C] border border-[rgba(216,193,154,0.18)] ambient-shadow space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded bg-[#202A24] border border-[#D8C19A]/30 flex items-center justify-center mx-auto text-[#D8C19A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-3xl text-[#F2EFE7]">
            Reset Password
          </h1>
          <p className="text-xs text-[#C0BBAF]">
            Enter your email to receive recovery instructions.
          </p>
        </div>

        {sent ? (
          <div className="p-6 bg-[#202A24] rounded-xl border border-[#D8C19A]/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#929F87] mx-auto" />
            <p className="text-xs text-[#F2EFE7]">
              We have emailed a password reset link to <strong className="text-[#D8C19A]">{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 text-xs uppercase tracking-wider text-[#D8C19A] font-semibold hover:underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                Account Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#898C83]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111714] border border-[rgba(216,193,154,0.18)] focus:border-[#D8C19A] rounded text-xs text-[#F2EFE7] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors shadow-lg"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[rgba(216,193,154,0.1)] text-center text-xs text-[#898C83]">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-[#C0BBAF] hover:text-[#D8C19A]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
