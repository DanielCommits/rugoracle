'use client';

import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TokenAnalysisCardProps {
  liquidity: string;
  topHolders: string;
  suspiciousFlags: string[];
}

export function TokenAnalysisCard({
  liquidity,
  topHolders,
  suspiciousFlags,
}: TokenAnalysisCardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
      <h3 className="text-slate-100 text-sm font-semibold mb-6 uppercase tracking-wider">Token Details</h3>
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-800">
          <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Liquidity</div>
          <div className="text-2xl font-bold text-cyan-400">{liquidity}</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-800">
          <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">Top Holder</div>
          <div className="text-2xl font-bold text-purple-400">{topHolders}</div>
        </div>
        {suspiciousFlags.length > 0 && (
          <div className="pt-6 border-t border-slate-800">
            <div className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Risk Indicators
            </div>
            <div className="flex flex-wrap gap-2">
              {suspiciousFlags.map((flag) => (
                <span
                  key={flag}
                  className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
