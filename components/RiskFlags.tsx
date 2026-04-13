import { AlertTriangle, Zap, Clock, TrendingDown, Users } from 'lucide-react';

interface RiskFlagsProps {
  flags: string[];
}

export function RiskFlags({ flags }: RiskFlagsProps) {
  const flagDetails: Record<string, { icon: React.ReactNode; label: string; severity: 'danger' | 'warning' | 'info' }> = {
    high_concentration: {
      icon: <Users className="w-4 h-4" />,
      label: 'Whale Dominated Supply',
      severity: 'danger',
    },
    low_liquidity: {
      icon: <TrendingDown className="w-4 h-4" />,
      label: 'Low Liquidity',
      severity: 'danger',
    },
    new_contract: {
      icon: <Clock className="w-4 h-4" />,
      label: 'Newly Created Contract',
      severity: 'warning',
    },
    high_transaction_velocity: {
      icon: <Zap className="w-4 h-4" />,
      label: 'Suspicious Transaction Spike',
      severity: 'danger',
    },
    concentrated_holders: {
      icon: <AlertTriangle className="w-4 h-4" />,
      label: 'Concentrated Holder Distribution',
      severity: 'warning',
    },
  };

  const getSeverityStyles = (severity: 'danger' | 'warning' | 'info') => {
    switch (severity) {
      case 'danger':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    }
  };

  if (flags.length === 0) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <p className="text-green-400 text-sm font-medium">✓ No red flags detected</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-300">Risk Indicators</h3>
      <div className="flex flex-wrap gap-2">
        {flags.map((flag) => {
          const details = flagDetails[flag];
          if (!details) return null;
          
          return (
            <div
              key={flag}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium transition-all ${getSeverityStyles(
                details.severity
              )}`}
            >
              {details.icon}
              <span>{details.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
