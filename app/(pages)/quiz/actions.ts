import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getQuiz() {
  const quiz = await prisma.quiz.findMany();
  return quiz;
}

export async function getWords() {
  return await prisma.word.findMany({
    orderBy: { id: 'asc' },
  });
}
