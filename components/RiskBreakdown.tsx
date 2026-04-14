interface RiskBreakdownProps {
  breakdown: {
    liquidityRisk: number;
    holderConcentrationRisk: number;
    transactionBehaviorRisk: number;
    contractAgeRisk: number;
  };
  contractAgeDays: number;
  chain: "ethereum" | "solana";
}

export function RiskBreakdown({
  breakdown,
  contractAgeDays,
  chain,
}: RiskBreakdownProps) {
  const isSolana = chain === "solana";

  const factors = isSolana
    ? [
        {
          label: "Balance Health",
          value: breakdown.liquidityRisk,
          display: `${breakdown.liquidityRisk}%`,
          color: "from-cyan-500 to-blue-500",
        },
        {
          label: "Token Holdings",
          value: breakdown.holderConcentrationRisk,
          display: `${breakdown.holderConcentrationRisk}%`,
          color: "from-purple-500 to-pink-500",
        },
        {
          label: "Recent Activity",
          value: breakdown.transactionBehaviorRisk,
          display: `${breakdown.transactionBehaviorRisk}%`,
          color: "from-orange-500 to-red-500",
        },
        {
          label: "Historical Activity",
          value: breakdown.contractAgeRisk,
          display: `${breakdown.contractAgeRisk}%`,
          color: "from-yellow-500 to-orange-500",
        },
      ]
    : [
        {
          label: "Liquidity Risk",
          value: breakdown.liquidityRisk,
          display: `${breakdown.liquidityRisk}%`,
          color: "from-cyan-500 to-blue-500",
        },
        {
          label: "Holder Concentration",
          value: breakdown.holderConcentrationRisk,
          display: `${breakdown.holderConcentrationRisk}%`,
          color: "from-purple-500 to-pink-500",
        },
        {
          label: "Transaction Behavior",
          value: breakdown.transactionBehaviorRisk,
          display: `${breakdown.transactionBehaviorRisk}%`,
          color: "from-orange-500 to-red-500",
        },
        {
          label: "Contract Age",
          value: breakdown.contractAgeRisk,
          display: `${contractAgeDays} days`,
          color: "from-yellow-500 to-orange-500",
        },
      ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-6">
        Risk Breakdown
      </h3>

      <div className="space-y-6">
        {factors.map((factor) => (
          <div key={factor.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">
                {factor.label}
              </span>
              <span className="text-sm font-bold text-slate-100">
                {factor.display}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${factor.color} transition-all duration-500`}
                style={{ width: `${Math.min(factor.value, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Factor Legend */}
      <div className="mt-6 pt-6 border-t border-slate-800">
        <p className="text-xs text-slate-400 mb-3">
          Understanding the breakdown:
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
          {isSolana ? (
            <>
              <div>
                <span className="text-cyan-400 font-semibold">Balance:</span>{" "}
                SOL holdings
              </div>
              <div>
                <span className="text-purple-400 font-semibold">Holdings:</span>{" "}
                Token count
              </div>
              <div>
                <span className="text-orange-400 font-semibold">Recent:</span>{" "}
                20tx activity
              </div>
              <div>
                <span className="text-yellow-400 font-semibold">
                  Historical:
                </span>{" "}
                Total tx
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-cyan-400 font-semibold">Liquidity:</span>{" "}
                Can tokens be sold?
              </div>
              <div>
                <span className="text-purple-400 font-semibold">
                  Concentration:
                </span>{" "}
                Whale holding %
              </div>
              <div>
                <span className="text-orange-400 font-semibold">
                  Transactions:
                </span>{" "}
                Activity spikes
              </div>
              <div>
                <span className="text-yellow-400 font-semibold">
                  Contract Age:
                </span>{" "}
                Days since launch
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
