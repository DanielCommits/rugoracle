import { NextRequest, NextResponse } from 'next/server';
import { validateEthereumAddress } from '@/lib/validation';
import { generateMockAnalysis } from '@/lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    // Validate input
    if (!address || typeof address !== 'string') {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Validate Ethereum address format
    if (!validateEthereumAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address format. Please use 0x... format.' },
        { status: 400 }
      );
    }

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate analysis (mock data for now)
    const analysis = generateMockAnalysis(address);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze address' },
      { status: 500 }
    );
  }
}
