import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getWords() {
  const words = await prisma.word.findMany({
    orderBy: { id: 'asc' },
  });
  return words;
}
