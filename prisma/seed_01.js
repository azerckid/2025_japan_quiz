import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.word.createMany({
        data: [
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "위",
                japanese: [
                    "うえ",
                    "上"
                ],
                hiragana: [
                    "うえ"
                ],
                katakana: [],
                kanzi: [
                    "上"
                ],
                english: [
                    "up",
                    "above"
                ],
                meaning: "공간적으로 위쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "아래",
                japanese: [
                    "した",
                    "下"
                ],
                hiragana: [
                    "した"
                ],
                katakana: [],
                kanzi: [
                    "下"
                ],
                english: [
                    "down",
                    "below"
                ],
                meaning: "공간적으로 아래쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "왼쪽",
                japanese: [
                    "ひだり",
                    "左"
                ],
                hiragana: [
                    "ひだり"
                ],
                katakana: [],
                kanzi: [
                    "左"
                ],
                english: [
                    "left"
                ],
                meaning: "방향 왼쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "오른쪽",
                japanese: [
                    "みぎ",
                    "右"
                ],
                hiragana: [
                    "みぎ"
                ],
                katakana: [],
                kanzi: [
                    "右"
                ],
                english: [
                    "right"
                ],
                meaning: "방향 오른쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "앞",
                japanese: [
                    "まえ",
                    "前"
                ],
                hiragana: [
                    "まえ"
                ],
                katakana: [],
                kanzi: [
                    "前"
                ],
                english: [
                    "front",
                    "before"
                ],
                meaning: "앞쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "뒤",
                japanese: [
                    "うしろ",
                    "後ろ"
                ],
                hiragana: [
                    "うしろ"
                ],
                katakana: [],
                kanzi: [
                    "後ろ"
                ],
                english: [
                    "behind",
                    "back"
                ],
                meaning: "뒤쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "사이",
                japanese: [
                    "あいだ",
                    "間"
                ],
                hiragana: [
                    "あいだ"
                ],
                katakana: [],
                kanzi: [
                    "間"
                ],
                english: [
                    "between",
                    "gap"
                ],
                meaning: "두 대상 사이"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "동사",
                korean: "걷다",
                japanese: [
                    "あるく",
                    "歩く"
                ],
                hiragana: [
                    "あるく"
                ],
                katakana: [],
                kanzi: [
                    "歩く"
                ],
                english: [
                    "walk"
                ],
                meaning: "걸어서 이동하다"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "동사",
                korean: "앉다",
                japanese: [
                    "すわる",
                    "座る"
                ],
                hiragana: [
                    "すわる"
                ],
                katakana: [],
                kanzi: [
                    "座る"
                ],
                english: [
                    "sit"
                ],
                meaning: "앉는 동작"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "형용사",
                korean: "가깝다",
                japanese: [
                    "ちかい",
                    "近い"
                ],
                hiragana: [
                    "ちかい"
                ],
                katakana: [],
                kanzi: [
                    "近い"
                ],
                english: [
                    "near",
                    "close"
                ],
                meaning: "거리나 관계가 가까운 상태"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "근처",
                japanese: [
                    "ちかく",
                    "近く"
                ],
                hiragana: [
                    "ちかく"
                ],
                katakana: [],
                kanzi: [
                    "近く"
                ],
                english: [
                    "nearby",
                    "vicinity"
                ],
                meaning: "가까운 곳"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "안",
                japanese: [
                    "なか",
                    "中"
                ],
                hiragana: [
                    "なか"
                ],
                katakana: [],
                kanzi: [
                    "中"
                ],
                english: [
                    "inside"
                ],
                meaning: "내부, 안쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "밖",
                japanese: [
                    "そと",
                    "外"
                ],
                hiragana: [
                    "そと"
                ],
                katakana: [],
                kanzi: [
                    "外"
                ],
                english: [
                    "outside"
                ],
                meaning: "바깥쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "동쪽",
                japanese: [
                    "ひがし",
                    "東"
                ],
                hiragana: [
                    "ひがし"
                ],
                katakana: [],
                kanzi: [
                    "東"
                ],
                english: [
                    "east"
                ],
                meaning: "방향 동쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "서쪽",
                japanese: [
                    "にし",
                    "西"
                ],
                hiragana: [
                    "にし"
                ],
                katakana: [],
                kanzi: [
                    "西"
                ],
                english: [
                    "west"
                ],
                meaning: "방향 서쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "남쪽",
                japanese: [
                    "みなみ",
                    "南"
                ],
                hiragana: [
                    "みなみ"
                ],
                katakana: [],
                kanzi: [
                    "南"
                ],
                english: [
                    "south"
                ],
                meaning: "방향 남쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "북쪽",
                japanese: [
                    "きた",
                    "北"
                ],
                hiragana: [
                    "きた"
                ],
                katakana: [],
                kanzi: [
                    "北"
                ],
                english: [
                    "north"
                ],
                meaning: "방향 북쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "모퉁이",
                japanese: [
                    "かど",
                    "角"
                ],
                hiragana: [
                    "かど"
                ],
                katakana: [],
                kanzi: [
                    "角"
                ],
                english: [
                    "corner"
                ],
                meaning: "길 모서리"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "옆, 이웃",
                japanese: [
                    "となり",
                    "隣"
                ],
                hiragana: [
                    "となり"
                ],
                katakana: [],
                kanzi: [
                    "隣"
                ],
                english: [
                    "next to",
                    "neighbor"
                ],
                meaning: "바로 옆에 있는"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "옆, 가로",
                japanese: [
                    "よこ",
                    "横"
                ],
                hiragana: [
                    "よこ"
                ],
                katakana: [],
                kanzi: [
                    "横"
                ],
                english: [
                    "side",
                    "horizontal"
                ],
                meaning: "옆 방향"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "명사",
                korean: "방면, 방향, 쪽",
                japanese: [
                    "ほう",
                    "方"
                ],
                hiragana: [
                    "ほう"
                ],
                katakana: [],
                kanzi: [
                    "方"
                ],
                english: [
                    "direction",
                    "side"
                ],
                meaning: "방향이나 쪽"
            },
            {
                title: "DAY 1 위치",
                chapter: "위치",
                level: "N5",
                wordClass: "형용사",
                korean: "멀다",
                japanese: [
                    "とおい",
                    "遠い"
                ],
                hiragana: [
                    "とおい"
                ],
                katakana: [],
                kanzi: [
                    "遠い"
                ],
                english: [
                    "far"
                ],
                meaning: "거리가 먼 상태"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "1월",
                japanese: [
                    "いちがつ",
                    "一月"
                ],
                hiragana: [
                    "いちがつ"
                ],
                katakana: [],
                kanzi: [
                    "一月"
                ],
                english: [
                    "January"
                ],
                meaning: "1월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "2월",
                japanese: [
                    "にがつ",
                    "二月"
                ],
                hiragana: [
                    "にがつ"
                ],
                katakana: [],
                kanzi: [
                    "二月"
                ],
                english: [
                    "February"
                ],
                meaning: "2월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "3월",
                japanese: [
                    "さんがつ",
                    "三月"
                ],
                hiragana: [
                    "さんがつ"
                ],
                katakana: [],
                kanzi: [
                    "三月"
                ],
                english: [
                    "March"
                ],
                meaning: "3월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "4월",
                japanese: [
                    "しがつ",
                    "四月"
                ],
                hiragana: [
                    "しがつ"
                ],
                katakana: [],
                kanzi: [
                    "四月"
                ],
                english: [
                    "April"
                ],
                meaning: "4월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "5월",
                japanese: [
                    "ごがつ",
                    "五月"
                ],
                hiragana: [
                    "ごがつ"
                ],
                katakana: [],
                kanzi: [
                    "五月"
                ],
                english: [
                    "May"
                ],
                meaning: "5월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "6월",
                japanese: [
                    "ろくがつ",
                    "六月"
                ],
                hiragana: [
                    "ろくがつ"
                ],
                katakana: [],
                kanzi: [
                    "六月"
                ],
                english: [
                    "June"
                ],
                meaning: "6월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "7월",
                japanese: [
                    "しちがつ",
                    "七月"
                ],
                hiragana: [
                    "しちがつ"
                ],
                katakana: [],
                kanzi: [
                    "七月"
                ],
                english: [
                    "July"
                ],
                meaning: "7월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "월요일",
                japanese: [
                    "げつようび",
                    "月よう日"
                ],
                hiragana: [
                    "げつようび"
                ],
                katakana: [],
                kanzi: [
                    "月曜日"
                ],
                english: [
                    "Monday"
                ],
                meaning: "한 주의 첫날"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "일요일",
                japanese: [
                    "にちようび",
                    "日よう日"
                ],
                hiragana: [
                    "にちようび"
                ],
                katakana: [],
                kanzi: [
                    "日曜日"
                ],
                english: [
                    "Sunday"
                ],
                meaning: "한 주의 마지막 날"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "8월",
                japanese: ["はちがつ", "八月"],
                hiragana: ["はちがつ"],
                katakana: [],
                kanzi: ["八月"],
                english: ["August"],
                meaning: "8월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "9월",
                japanese: ["くがつ", "九月"],
                hiragana: ["くがつ"],
                katakana: [],
                kanzi: ["九月"],
                english: ["September"],
                meaning: "9월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "10월",
                japanese: ["じゅうがつ", "十月"],
                hiragana: ["じゅうがつ"],
                katakana: [],
                kanzi: ["十月"],
                english: ["October"],
                meaning: "10월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "11월",
                japanese: ["じゅういちがつ", "十一月"],
                hiragana: ["じゅういちがつ"],
                katakana: [],
                kanzi: ["十一月"],
                english: ["November"],
                meaning: "11월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "12월",
                japanese: ["じゅうにがつ", "十二月"],
                hiragana: ["じゅうにがつ"],
                katakana: [],
                kanzi: ["十二月"],
                english: ["December"],
                meaning: "12월"
            },
            {
                title: "DAY 1 날짜",
                chapter: "월",
                level: "N5",
                wordClass: "명사",
                korean: "몇월",
                japanese: ["なんがつ", "何月"],
                hiragana: ["なんがつ"],
                katakana: [],
                kanzi: ["何月"],
                english: ["what month"],
                meaning: "어느 달인지 묻는 표현"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "화요일",
                japanese: ["かようび", "火よう日"],
                hiragana: ["かようび"],
                katakana: [],
                kanzi: ["火曜日"],
                english: ["Tuesday"],
                meaning: "화요일"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "수요일",
                japanese: ["すいようび", "水よう日"],
                hiragana: ["すいようび"],
                katakana: [],
                kanzi: ["水曜日"],
                english: ["Wednesday"],
                meaning: "수요일"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "목요일",
                japanese: ["もくようび", "木よう日"],
                hiragana: ["もくようび"],
                katakana: [],
                kanzi: ["木曜日"],
                english: ["Thursday"],
                meaning: "목요일"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "금요일",
                japanese: ["きんようび", "金よう日"],
                hiragana: ["きんようび"],
                katakana: [],
                kanzi: ["金曜日"],
                english: ["Friday"],
                meaning: "금요일"
            },
            {
                title: "DAY 1 날짜",
                chapter: "요일",
                level: "N5",
                wordClass: "명사",
                korean: "토요일",
                japanese: ["どようび", "土よう日"],
                hiragana: ["どようび"],
                katakana: [],
                kanzi: ["土曜日"],
                english: ["Saturday"],
                meaning: "토요일"
            }
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