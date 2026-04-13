'use client';

import { AddressInput } from './AddressInput';
import { Zap } from 'lucide-react';

interface HeroSectionProps {
  onAnalyze: (address: string) => Promise<void>;
  isLoading: boolean;
}

export function HeroSection({ onAnalyze, isLoading }: HeroSectionProps) {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">Instant Web3 Security Analysis</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Detect Rug Pulls
          </span>
          <br />
          <span className="text-slate-100">Before They Happen</span>
        </h1>

        <p className="text-xl text-slate-400 mb-8 leading-relaxed">
          Analyze any Ethereum wallet or token contract in seconds. Get AI-powered risk assessments and detailed insights to protect your crypto.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400">10M+</div>
            <div className="text-slate-400 text-xs">Addresses Analyzed</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl font-bold text-purple-400">99%</div>
            <div className="text-slate-400 text-xs">Accuracy Rate</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl font-bold text-pink-400">&lt;1s</div>
            <div className="text-slate-400 text-xs">Analysis Time</div>
          </div>
        </div>
      </div>

      {/* Input */}
      <AddressInput onAnalyze={onAnalyze} isLoading={isLoading} />
    </section>
  );
}
