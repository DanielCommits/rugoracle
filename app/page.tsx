'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { LoadingState } from '@/components/LoadingState';
import type { AnalysisResult } from '@/lib/mockData';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async (address: string) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to analyze address');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <div className="space-y-8">
            <HeroSection onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Analyze Another Address - Top */}
            <div className="flex justify-center">
              <button
                onClick={() => setResult(null)}
                className="px-6 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-500/50 transition-colors font-medium"
              >
                ← Analyze Another Address
              </button>
            </div>

            {/* Results Dashboard */}
            <ResultsDashboard data={result} />

            {/* Analyze Another Address - Bottom */}
            <div className="flex justify-center pt-8 border-t border-slate-800">
              <button
                onClick={() => setResult(null)}
                className="px-6 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-500/50 transition-colors font-medium"
              >
                ← Analyze Another Address
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="mt-8">
            <LoadingState />
          </div>
        )}
      </main>
    </div>
  );
}
