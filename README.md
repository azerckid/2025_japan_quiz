# Tango Time - 한일영 단어 퀴즈 앱

이 프로젝트는 Next.js, Prisma, PostgreSQL을 기반으로 한/일/영 단어 퀴즈 게임입니다.

## 주요 기능
- 한국어 단어를 보고 일본어(히라가나/한자)로 입력하여 맞추는 퀴즈
- 단어 데이터는 DB에서 관리 (한/일/영/난이도)
- 정답 시 다음 단어로 자동 진행

## 개발 환경
- Next.js
- Prisma ORM
- PostgreSQL
- Tailwind CSS

## 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **.env 파일 설정**
   - 프로젝트 루트에 `.env` 파일을 생성하고 아래와 같이 데이터베이스 URL을 입력하세요:
     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
     ```
   - `.env` 파일은 **절대 깃허브에 커밋하지 마세요!** (`.gitignore`에 이미 포함되어 있음)

3. **DB 마이그레이션 및 시드 데이터 입력**
   ```bash
   npx prisma migrate dev --name init
   # 시드 데이터 입력 (seed.js가 있는 경우)
   node prisma/seed.js
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

5. **접속**
   - [http://localhost:3000](http://localhost:3000) 에서 앱을 확인할 수 있습니다.

## 폴더 구조
- `app/` : Next.js 라우트 및 페이지
- `prisma/` : Prisma 스키마, 마이그레이션, 시드 스크립트
- `app/api/` : API 라우트 (DB 데이터 제공)

## 기타
- `.env` 파일이 없으면 DB 연결이 되지 않습니다.
- DB, 시드, 환경변수 등 민감 정보는 커밋하지 않도록 주의하세요.

---
문의/기여 환영합니다!
