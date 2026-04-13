'use client';

import { getRiskColor, getRiskBgColor, getRiskLabel } from '@/lib/scoring';

interface RiskScoreCardProps {
  score: number;
}

export function RiskScoreCard({ score }: RiskScoreCardProps) {
  const color = getRiskColor(score);
  const bgColor = getRiskBgColor(score);
  const label = getRiskLabel(score);

  return (
    <div className={`rounded-lg border p-6 ${bgColor}`}>
      <h3 className="text-slate-100 text-sm font-semibold mb-6 uppercase tracking-wider">Quick Summary</h3>
      <div className="flex items-end gap-3 mb-6">
        <div className={`text-5xl font-bold ${color}`}>{score}</div>
        <div className="mb-1">
          <div className={`text-lg font-bold ${color}`}>/100</div>
        </div>
      </div>
      <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${bgColor} ${color}`}>
        {label}
      </div>
      <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.replace('text', 'bg')} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
