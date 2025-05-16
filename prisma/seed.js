import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.word.createMany({
        data: [
            {
                korean: '사람',
                japanese: ['ひと', '人'],
                english: ['person', 'human'],
                meaning: '사람, 인류',
                level: 1,
            },
            {
                korean: '물',
                japanese: ['みず', '水'],
                english: ['water'],
                meaning: '물',
                level: 1,
            },
            {
                korean: '불',
                japanese: ['ひ', '火'],
                english: ['fire'],
                meaning: '불',
                level: 1,
            },
            {
                korean: '하늘',
                japanese: ['そら', '空'],
                english: ['sky'],
                meaning: '하늘',
                level: 1,
            },
            {
                korean: '산',
                japanese: ['やま', '山'],
                english: ['mountain'],
                meaning: '산',
                level: 1,
            },
            {
                korean: '나무',
                japanese: ['き', '木'],
                english: ['tree'],
                meaning: '나무',
                level: 1,
            },
            {
                korean: '집',
                japanese: ['いえ', '家'],
                english: ['house', 'home'],
                meaning: '집',
                level: 1,
            },
            {
                korean: '책',
                japanese: ['ほん', '本'],
                english: ['book'],
                meaning: '책',
                level: 1,
            },
            {
                korean: '학교',
                japanese: ['がっこう', '学校'],
                english: ['school'],
                meaning: '학교',
                level: 1,
            },
            {
                korean: '음식',
                japanese: ['たべもの', '食べ物'],
                english: ['food'],
                meaning: '음식',
                level: 1,
            },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 