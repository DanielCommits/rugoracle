import { Navbar } from "@/components/Navbar";
import { AlertCircle, Shield, TrendingDown, Zap } from "lucide-react";

export const metadata = {
  title: "Documentation - RugOracle",
  description:
    "Learn how to use RugOracle to analyze crypto wallets and tokens for risk.",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-slate-400">
            Learn how to use RugOracle to protect yourself from scams and rug
            pulls.
          </p>
        </div>

        <div className="space-y-12">
          {/* Getting Started */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-slate-100">
                Getting Started
              </h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                RugOracle analyzes Ethereum and Solana wallet addresses to
                identify potential risks and red flags associated with scams and
                rug pulls.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Enter a valid Ethereum (0x...) or Solana address</li>
                <li>Click "Analyze Address" to scan the wallet</li>
                <li>Review the comprehensive risk analysis</li>
                <li>Check individual token details for more insights</li>
              </ol>
            </div>
          </section>

          {/* Risk Score */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-slate-100">
                Understanding Risk Score
              </h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                The risk score ranges from 0-100, indicating the overall risk
                level of a wallet or token:
              </p>
              <div className="space-y-3 ml-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold w-20">
                    0-25
                  </span>
                  <span>Safe - Low risk, generally trustworthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold w-20">
                    26-50
                  </span>
                  <span>Caution - Some warning signs, investigate further</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold w-20">
                    51-75
                  </span>
                  <span>Warning - Significant risks detected</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold w-20">
                    76-100
                  </span>
                  <span>Danger - High risk, avoid if possible</span>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics Explained */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-slate-100">
                Metrics Explained
              </h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-100 mb-2">
                  Liquidity Risk
                </h3>
                <p>
                  Measures how easily tokens can be bought or sold. Low
                  liquidity increases price volatility and manipulation risk.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 mb-2">
                  Holder Concentration
                </h3>
                <p>
                  Shows what percentage of tokens are held by the top wallets.
                  High concentration (whale dominance) increases rug pull risk.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 mb-2">
                  Wallet Activity
                </h3>
                <p>
                  Analyzes transaction history and activity patterns. New or
                  inactive wallets may indicate higher risk.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 mb-2">
                  Transaction Behavior
                </h3>
                <p>
                  Analyzes wallet transaction patterns for suspicious activity
                  spikes or unusual trading behavior across both Ethereum and
                  Solana.
                </p>
              </div>
            </div>
          </section>

          {/* Red Flags */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-slate-100">
                Common Red Flags
              </h2>
            </div>
            <div className="space-y-2 text-slate-300">
              <ul className="space-y-2 ml-2">
                <li>
                  • Extremely low liquidity paired with high token concentration
                </li>
                <li>• Contract created very recently (less than 1 week)</li>
                <li>• Sudden massive transaction spikes</li>
                <li>• One or two addresses holding 50%+ of supply</li>
                <li>• No verified smart contract code</li>
                <li>• Rapidly changing token metadata</li>
              </ul>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">
              Best Practices
            </h2>
            <div className="space-y-3 text-slate-300">
              <p>• Always use RugOracle before investing in new tokens</p>
              <p>
                • Don&apos;t rely solely on risk scores - investigate further
              </p>
              <p>• Check liquidity and holder concentration first</p>
              <p>• Look at the AI explanation for detailed insights</p>
              <p>• Compare multiple addresses if unsure</p>
              <p>• When in doubt, don&apos;t invest</p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-red-900/20 border border-red-700/30 rounded-lg p-8">
            <h2 className="text-xl font-bold text-red-400 mb-3">Disclaimer</h2>
            <p className="text-slate-300 text-sm">
              RugOracle is a security analysis tool designed to identify
              potential risks. It is not financial advice. Always do your own
              research (DYOR) before investing in any cryptocurrency. The
              analysis is based on available data and may not catch all scams.
              Use at your own risk.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
