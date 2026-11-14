'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, User } from 'lucide-react';
import { useToast } from '@/components/common/Toast';

export default function SignUpPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill in all registration fields', 'error');
      return;
    }
    showToast('Welcome to NOOKORA! Account created.', 'success');
    router.push('/profile');
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-16 px-5 bg-[#111714]">
      <div className="w-full max-w-md p-8 md:p-10 rounded-2xl bg-[#18211C] border border-[rgba(216,193,154,0.18)] ambient-shadow space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded bg-[#202A24] border border-[#D8C19A]/30 flex items-center justify-center mx-auto text-[#D8C19A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-3xl text-[#F2EFE7]">
            Join NOOKORA
          </h1>
          <p className="text-xs text-[#C0BBAF]">
            Make space yours. Curate moods, track budgets, and share spaces.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#898C83]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvi Sharma"
                className="w-full pl-9 pr-3 py-2.5 bg-[#111714] border border-[rgba(216,193,154,0.18)] focus:border-[#D8C19A] rounded text-xs text-[#F2EFE7] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
              Email Address
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

          <div>
            <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#898C83]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#111714] border border-[rgba(216,193,154,0.18)] focus:border-[#D8C19A] rounded text-xs text-[#F2EFE7] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="pt-4 border-t border-[rgba(216,193,154,0.1)] text-center text-xs text-[#898C83]">
          <span>Already have an account? </span>
          <Link href="/login" className="text-[#D8C19A] hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
