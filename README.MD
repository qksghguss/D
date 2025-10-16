# 사내 소모품 관리 웹사이트

Next.js + Supabase + TypeScript 기반의 사내 소모품 관리 웹사이트입니다. Tailwind CSS와 shadcn/ui 컴포넌트를 활용해 반응형으로 동작하는 심플한 대시보드를 제공합니다.

## 주요 기능
- **로그인**: Supabase Auth를 사용한 이메일/비밀번호 로그인.
- **세션 보호**: 인증되지 않은 사용자는 `/login`으로 리다이렉트됩니다.
- **대시보드**: 헤더, 반응형 내비게이션, 주요 지표와 업무 카드, 일정 위젯 등 웹사이트 구조로 재구성된 메인 화면.
- **사용자 메뉴**: 계정/사용자 설정 및 로그아웃 항목을 포함한 드롭다운 메뉴.

## 폴더 구조
```
app/          # Next.js App Router 엔트리 및 라우트
components/   # 재사용 가능한 UI 및 레이아웃 컴포넌트
lib/          # Supabase 클라이언트, 유틸리티
public/       # 정적 자산
styles/       # 전역 스타일 (Tailwind)
```

## 개발 환경
- Node.js 18 이상 권장
- Next.js 14, React 18, TypeScript 5 (strict mode)
- Tailwind CSS, Radix UI 기반 shadcn/ui 컴포넌트
- Supabase Auth + Supabase JavaScript 클라이언트
- ESLint, Prettier

## 사용 방법
```bash
# 의존성 설치 (환경 정책에 따라 npm registry 접근이 제한될 수 있습니다)
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 정적 분석 및 품질 검사
npm run lint
npm run typecheck

# 프로덕션 빌드
npm run build
```

## 환경 변수
다음 변수를 `.env.local` 등에 설정하세요.
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 배포
Vercel에 배포하면 Next.js, Supabase Edge Functions와 자연스럽게 연동됩니다.

## 라이선스
프로젝트 예제 용도로 작성되었습니다.
