'use client';

import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ShieldAlert className="w-7 h-7 text-cyan-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              RugOracle
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                isActive('/') ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              className={`text-sm transition-colors ${
                isActive('/docs') ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Docs
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors ${
                isActive('/about') ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
