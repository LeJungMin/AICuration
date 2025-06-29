# AI Tools Curator 🤖

> 프론트엔드 개발자를 위한 AI 도구 큐레이션 플랫폼

[![Vercel](https://vercelbadges.vercel.app/ai-tools-curator.svg)](https://ai-tools-curator.vercel.app/)

## 🎯 프로젝트 소개

**AI Tools Curator**는 개발자들이 효율적으로 AI 도구를 발견하고 비교할 수 있는 큐레이션 플랫폼입니다. 
9년차 프론트엔드 개발자의 실무 경험을 바탕으로 개발자들에게 실제로 도움이 되는 AI 도구들을 엄선하여 제공합니다.

### ✨ 주요 기능

- 🔍 **스마트 검색 & 필터링**: 카테고리, 가격, 플랫폼별 정확한 필터링
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 UX
- 🎨 **다크모드 지원**: 개발자 친화적인 테마 시스템
- ⚡ **빠른 성능**: Next.js 14 App Router로 최적화된 로딩
- 🧩 **도구 조합 추천**: 프로젝트 타입별 최적의 AI 도구 조합 제안

### 🛠 기술 스택

```typescript
// 핵심 기술
Framework: Next.js 14 (App Router, SSG)
Language: TypeScript (Strict Mode)
Styling: TailwindCSS + Emotion
State: Zustand + TanStack Query
UI: shadcn/ui + Lucide React

// 개발 도구
Testing: Jest + Playwright
Linting: ESLint + Prettier
Package Manager: PNPM
Deployment: Vercel
```

## 📊 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── tools/          # 도구 관련 페이지
│   └── combinations/   # 조합 추천 페이지
├── components/         # 재사용 컴포넌트
│   ├── ui/            # 기본 UI 컴포넌트
│   ├── features/      # 기능별 컴포넌트
│   └── layout/        # 레이아웃 컴포넌트
├── lib/               # 유틸리티 함수
├── data/              # 정적 데이터
└── types/             # TypeScript 타입
```

## 🎨 주요 화면

### 메인 페이지
- Hero 섹션과 카테고리 그리드
- 인기 도구 추천 섹션
- 실시간 통계 정보

### 도구 탐색
- 27개 엄선된 AI 도구
- 실시간 검색 및 필터링
- 그리드/리스트 뷰 전환

### 조합 추천
- 프로젝트 타입별 AI 도구 조합
- 워크플로우 및 예산 가이드
- 사용 사례별 상세 분석

## 🔍 데이터 모델

```typescript
interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'coding' | 'design' | 'writing' | 'analysis' | 'productivity' | 'media';
  tags: string[];
  pricing: {
    model: 'free' | 'freemium' | 'paid' | 'enterprise';
    price: string;
  };
  features: string[];
  rating: number;
  integrations: string[];
  website: string;
}
```

## 🧪 테스트

```bash
# 단위 테스트
pnpm test

# 테스트 커버리지
pnpm test:coverage

# E2E 테스트
pnpm test:e2e
```

## 📈 성능 최적화

- **Core Web Vitals 최적화**: LCP, FID, CLS 지표 최적화
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **번들 최적화**: Code Splitting 및 Tree Shaking
- **캐싱 전략**: Static Generation 및 HTTP 캐싱
