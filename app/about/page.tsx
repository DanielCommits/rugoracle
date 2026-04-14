import { Navbar } from "@/components/Navbar";
import { Heart, Users, Zap } from "lucide-react";

export const metadata = {
  title: "About - RugOracle",
  description:
    "Learn about RugOracle and our mission to protect Web3 investors.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            About RugOracle
          </h1>
          <p className="text-xl text-slate-400">
            Protecting Web3 investors from scams, one analysis at a time.
          </p>
        </div>

        {/* Mission */}
        <section className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Our Mission
          </h2>
          <p className="text-slate-300 leading-relaxed">
            RugOracle was created to solve a critical problem in the Web3 space:
            the prevalence of scams, rug pulls, and fraudulent projects. Too
            many investors lose money to poorly vetted tokens and suspicious
            wallets. We believe that access to intelligent, data-driven security
            analysis should be free and available to everyone.
          </p>
        </section>

        {/* What We Do */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Zap className="w-8 h-8 text-cyan-400" />
              <h3 className="font-semibold text-slate-100">Instant Analysis</h3>
              <p className="text-slate-400 text-sm">
                Analyze Ethereum wallets and tokens in seconds with our advanced
                algorithms.
              </p>
            </div>
            <div className="space-y-3">
              <Heart className="w-8 h-8 text-pink-400" />
              <h3 className="font-semibold text-slate-100">Risk Detection</h3>
              <p className="text-slate-400 text-sm">
                Identify red flags like low liquidity, whale dominance, and
                suspicious behavior.
              </p>
            </div>
            <div className="space-y-3">
              <Users className="w-8 h-8 text-purple-400" />
              <h3 className="font-semibold text-slate-100">
                Community Protection
              </h3>
              <p className="text-slate-400 text-sm">
                Help the Web3 community make informed investment decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">
            Core Features
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-100">
                  Comprehensive Risk Scoring
                </h3>
                <p className="text-slate-400 text-sm">
                  0-100 risk scale analyzing liquidity, holder concentration,
                  contract age, and transaction behavior.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-100">
                  Wallet Overview
                </h3>
                <p className="text-slate-400 text-sm">
                  See transaction count, token holdings, and last activity for
                  any address.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-100">Token Analysis</h3>
                <p className="text-slate-400 text-sm">
                  Detailed breakdown of token metrics, holder distribution, and
                  risk indicators.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
              <div>
                <h3 className="font-semibold text-slate-100">
                  AI-Powered Insights
                </h3>
                <p className="text-slate-400 text-sm">
                  Get natural language explanations of why a wallet or token is
                  flagged as risky.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Why We Built This
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The Web3 ecosystem has incredible potential, but it&apos;s also
            become a hunting ground for scammers. Rug pulls cost investors
            billions of dollars annually. Most victims never had a chance to see
            the warning signs because the tools to analyze risk were either too
            expensive, too complicated, or simply didn&apos;t exist.
          </p>
          <p className="text-slate-300 leading-relaxed">
            RugOracle was built to democratize security analysis. We believe
            that every investor, regardless of technical knowledge or financial
            resources, deserves access to professional-grade security
            intelligence.
          </p>
        </section>

        {/* Privacy & Security */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Privacy & Security
          </h2>
          <p className="text-slate-300 mb-4">
            RugOracle respects your privacy. We only analyze publicly available
            blockchain data. We don&apos;t track users, don&apos;t store
            personal information, and don&apos;t require authentication to use
            our service.
          </p>
          <p className="text-slate-300">
            All analysis is performed on secure servers using industry-standard
            encryption and security practices.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-300 mb-4">
            Have questions, feedback, or want to report a security issue?
            We&apos;d love to hear from you.
          </p>
          <div className="space-y-3">
            <p className="text-slate-400">
              Email:{" "}
              <span className="text-cyan-400 font-mono">
                omoaredaniel@gmail.com
              </span>
            </p>
            <p className="text-slate-400">
              X (Twitter):{" "}
              <a
                href="https://x.com/d4knrick"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 font-mono hover:text-cyan-300 transition-colors"
              >
                x.com/d4knrick
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
