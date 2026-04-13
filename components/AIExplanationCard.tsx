'use client';

import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

interface StructuredAI {
  summary: string;
  drivers: string[];
  verdict: 'Safe' | 'Caution' | 'Warning' | 'Highly Risky';
}

interface AIExplanationCardProps {
  analysis?: StructuredAI | null;
  confidenceScore: number;
}

export function AIExplanationCard({ analysis, confidenceScore }: AIExplanationCardProps) {
  // Defensive check - if analysis is undefined, return a fallback
  if (!analysis) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-slate-100 text-lg font-semibold">AI Analysis</h3>
        </div>
        <p className="text-slate-300 text-sm">Analysis data unavailable</p>
      </div>
    );
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Safe':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'Caution':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'Warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'Highly Risky':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-400';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === 'Safe' || verdict === 'Caution') {
      return <CheckCircle className="w-5 h-5" />;
    }
    return <AlertCircle className="w-5 h-5" />;
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 md:col-span-2">
      {/* Header with Confidence Score */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-slate-100 text-lg font-semibold">AI Analysis</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1">Confidence</p>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                style={{ width: `${confidenceScore}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-purple-400">{confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-slate-300 leading-relaxed mb-6 text-sm">{analysis.summary}</p>

      {/* Risk Drivers */}
      <div className="mb-6">
        <h4 className="text-slate-200 font-semibold text-sm mb-3">Risk Drivers</h4>
        <ul className="space-y-2">
          {analysis.drivers.map((driver, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-slate-300">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{driver}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Verdict Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm ${getVerdictColor(analysis.verdict)}`}>
        {getVerdictIcon(analysis.verdict)}
        <span>Verdict: {analysis.verdict}</span>
      </div>
    </div>
  );
}
