'use client';

import { Wallet, Clock, Coins } from 'lucide-react';

interface WalletOverviewCardProps {
  totalTransactions: number;
  tokensHeld: number;
  lastActivity: string;
}

export function WalletOverviewCard({
  totalTransactions,
  tokensHeld,
  lastActivity,
}: WalletOverviewCardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
      <h3 className="text-slate-100 text-sm font-semibold mb-6 uppercase tracking-wider">Wallet Activity</h3>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Wallet className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wide">Transactions</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">{totalTransactions}</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Coins className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wide">Tokens Held</div>
            <div className="text-2xl font-bold text-slate-100 mt-1">{tokensHeld}</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs uppercase tracking-wide">Last Activity</div>
            <div className="text-sm font-semibold text-slate-100 mt-1">{lastActivity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
