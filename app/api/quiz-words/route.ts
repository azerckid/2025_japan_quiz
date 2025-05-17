import { NextResponse } from 'next/server';
import { getWords } from '@/app/(pages)/quiz/actions';

export async function GET() {
  const words = await getWords();
  console.log(words);
  return NextResponse.json(words);
} 