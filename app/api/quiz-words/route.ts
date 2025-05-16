import { NextResponse } from 'next/server';
import { getWords } from '@/app/(pages)/quiz/actions';

export async function GET() {
  const words = await getWords();
  return NextResponse.json(words);
} 