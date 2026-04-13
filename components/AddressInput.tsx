'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { validateEthereumAddress } from '@/lib/validation';

interface AddressInputProps {
  onAnalyze: (address: string) => Promise<void>;
  isLoading: boolean;
}

export function AddressInput({ onAnalyze, isLoading }: AddressInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }

    if (!validateEthereumAddress(address)) {
      setError('Invalid Ethereum address format (use 0x... format)');
      return;
    }

    await onAnalyze(address);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Input
          placeholder="Enter wallet or contract address (0x...)"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError('');
          }}
          disabled={isLoading}
          className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-500 h-12 text-base"
        />
        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-2 text-red-400 text-sm mt-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold h-12"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Address'}
      </Button>
    </form>
  );
}
