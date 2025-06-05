# .cursorrules 또는 .cursor/rules/my_project_rules.md
# (파일 확장자는 .md 또는 .mdc일 수 있습니다. Cursor 문서 참조 권장)

# AI 행동에 대한 전역 규칙 (Global Rules for AI Behavior)
rules:
  # 1. sequential-thinking (순차적 사고) 유도
  - "When addressing any task, particularly debugging, feature implementation, or refactoring for this Next.js, Tailwind, Prisma, and PostgreSQL project, always adopt a systematic, step-by-step thinking process."
  - "Before providing a solution or code, first outline your thought process or the sequence of steps you will take to arrive at the solution. Explain your reasoning for each step."
  - "For debugging, break down the problem: identify symptoms, hypothesize causes, suggest diagnostic steps (e.g., logging, error tracing), and then propose solutions. Be explicit about the flow of data through components (Next.js), database queries (Prisma), and API endpoints."

  # 2. context7 (강력한 컨텍스트 활용) 유도
  - "Leverage the full context of the project, including the Next.js project structure, Tailwind CSS configuration, Prisma schema, PostgreSQL database interactions, and any relevant files in the current workspace or chat history."
  - "When generating or modifying code, ensure it aligns perfectly with the existing coding standards, architectural patterns, and configurations (e.g., `tailwind.config.js`, `schema.prisma`, `package.json`, Next.js API routes) of this project."
  - "If a solution requires specific context that is not readily available, explicitly ask for the relevant file content or clarification (e.g., 'Please provide the contents of `src/server/db.ts`' or 'What are the exact fields in the `User` model?')."
  - "Prioritize using project-specific types, interfaces, and utility functions defined within the project."

  # 프로젝트 기술 스택에 대한 특정 지침 (Project-Specific Guidelines)
  - "For styling, always prefer Tailwind CSS utility classes. If custom CSS is absolutely necessary, recommend it within a CSS module or global stylesheet as per Next.js best practices."
  - "Database interactions should primarily use Prisma Client. Ensure all data fetching and mutations are handled safely and efficiently through Prisma."
  - "When working with database models, always refer to the `schema.prisma` file for the latest schema definitions."
  - "For API routes, follow Next.js API route conventions (`pages/api` or `app/api`) and ensure secure handling of sensitive data and proper error responses."
  - "When designing UI, suggest modern and responsive designs using Tailwind CSS."

# Zapier MCP (Zapier Model Context Protocol) 활용 지침
# Zapier 통합 자체는 Cursor IDE 설정 (MCP Server URL 입력)에서 이루어집니다.
# 아래는 AI가 Zapier 도구를 "언제 고려해야 하는지"에 대한 지침입니다.
# Cursor가 `tools` 섹션을 지원하는 구체적인 방식은 최신 문서를 참조하세요.
# 만약 `tools` 섹션이 지원되지 않는다면, 일반 `rules` 섹션에 텍스트로 설명을 추가하여 AI에게 지시할 수 있습니다.

# 예시 1: `tools` 섹션 지원 시 (Cursor의 Tooling/Function Calling 기능에 따라 다름)
# tools:
#   - name: "zapier_automation_tool"
#     description: "Triggers external automations via Zapier, e.g., sending notifications, updating spreadsheets, fetching real-time external data (weather, stock prices), or interacting with other web services."
#     invocation_rule: "Only consider using this tool when the user explicitly requests an action involving external web services (e.g., '이메일 보내줘', '슬랙으로 알림 보내줘', '최신 주식 정보 가져와') or when a task clearly extends beyond code into external automation."
#     # 실제 Zapier 연동 설정은 Cursor IDE의 'AI Actions' 또는 'MCP Settings'에서 이루어집니다.

# 예시 2: `tools` 섹션 지원하지 않을 경우, 일반 `rules`에 추가
rules:
  - "If a request involves interacting with external web services, sending notifications, fetching real-time non-code related data, or automating tasks outside the immediate codebase, consider reminding the user that Zapier MCP is available for such automations, and ask if they wish to proceed with an external action."
  - "Always confirm with the user before suggesting or initiating any external actions through Zapier or similar tools."

