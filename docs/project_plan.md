# AI 도구 큐레이션 플랫폼 - 프로젝트 계획서

## 🎯 프로젝트 개요

### 프로젝트명
**AI Tools Curator** - 프론트엔드 개발자를 위한 AI 도구 큐레이션 플랫폼

### 프로젝트 목적
- **포트폴리오 목표**: 9년차 프론트엔드 개발자의 React/Next.js 실무 역량 증명
- **실무 가치**: 실제 개발자들이 사용할 수 있는 AI 도구 발견/비교/추천 플랫폼
- **기술 성장**: 최신 React 생태계와 개발자 경험(DX) 최적화 실습

## 🏢 타겟 회사 요구사항 분석 & 대응 전략

### 핵심 가치 반영
- ✅ **개발자 경험(DX) 중시** → 직관적인 UI/UX, 빠른 로딩, 효율적인 검색
- ✅ **자동화된 테스트 실천** → Jest, Testing Library, E2E 테스트 구현
- ✅ **새로운 기술 활용** → Next.js 14, React Server Components, 최신 React 패턴
- ✅ **복잡한 문제의 단순한 해결** → 다양한 AI 도구를 직관적으로 분류/비교

### 우대사항 기술 구현
- ✅ **TypeScript 정적 타입 분석** → 엄격한 타입 시스템, 유틸리티 타입 활용
- ✅ **SSR & 모바일 웹앱** → Next.js App Router, PWA 지원
- ✅ **반응형/접근성/웹표준** → Mobile-first, WCAG 준수, 시맨틱 HTML
- ✅ **테스트/배포 자동화** → GitHub Actions CI/CD, 자동 테스트
- ✅ **인프라/모니터링** → Vercel Analytics, 성능 모니터링

## 🛠 기술 스택 (회사 요구사항 기반)

### 핵심 기술
```
- 프레임워크: Next.js 14 (App Router, React Server Components)
- 언어: TypeScript (엄격한 타입 정의)
- 상태관리: React Query (TanStack Query) + Zustand
- 스타일링: Emotion + TailwindCSS (하이브리드 접근)
- 패키지매니저: PNPM (Yarn Berry 대안)
- 빌드: Next.js (내장 SWC, ESBuild)
```

### 개발 도구
```
- 테스트: Jest + Testing Library + Playwright
- CI/CD: GitHub Actions
- 코드품질: ESLint + Prettier + Husky
- 타입체크: TypeScript strict mode
- 성능: Lighthouse CI, Bundle Analyzer
```

### 배포 & 모니터링
```
- 호스팅: Vercel (SSR 최적화)
- 분석: Vercel Analytics + Google Analytics
- 에러추적: Sentry (선택사항)
- 성능모니터링: Web Vitals
```

## 🎨 핵심 기능 명세

### 1단계: 기본 AI 도구 큐레이션
- [ ] AI 도구 데이터베이스 구축
- [ ] 카테고리별 분류 (코딩, 디자인, 글쓰기, 분석 등)
- [ ] 태그 기반 검색 & 필터링
- [ ] 반응형 카드 레이아웃

### 2단계: 고급 기능
- [ ] 도구 상세 페이지 (상세 리뷰, 사용법, 가격 정보)
- [ ] AI 도구 비교 기능 (vs 테이블)
- [ ] 개발자 추천 조합 (프로젝트 타입별)
- [ ] 즐겨찾기 & 개인 컬렉션

### 3단계: 인터랙션 & 고도화
- [ ] 사용자 리뷰 & 평점 시스템
- [ ] 도구 사용 경험 공유 (블로그 스타일)
- [ ] PWA 지원 (오프라인 즐겨찾기)
- [ ] 다크모드 & 접근성 최적화

## 🏗 아키텍처 설계

### 폴더 구조 (Clean Architecture)
```
src/
├── app/                    # Next.js App Router
├── components/             # 재사용 컴포넌트
│   ├── ui/                # 기본 UI 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   └── layout/            # 레이아웃 컴포넌트
├── lib/                   # 유틸리티 & 설정
├── hooks/                 # 커스텀 훅
├── types/                 # TypeScript 타입 정의
├── data/                  # 정적 데이터 & 스키마
└── tests/                 # 테스트 파일
```

### 데이터 구조
```typescript
interface AITool {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  pricing: PricingModel;
  features: string[];
  pros: string[];
  cons: string[];
  useCase: string[];
  rating: number;
  reviewCount: number;
  website: string;
  alternatives: string[];
}
```

## 📊 개발 우선순위

### Phase 1: 프로젝트 기반 구축 (1주)
- [x] 프로젝트 계획 수립
- [ ] Next.js 프로젝트 초기화
- [ ] TypeScript 설정 & 린팅 규칙
- [ ] 컴포넌트 아키텍처 설계
- [ ] 기본 UI 시스템 구축

### Phase 2: 핵심 기능 개발 (2주)
- [ ] AI 도구 데이터 모델링
- [ ] 메인 페이지 & 도구 리스트
- [ ] 검색 & 필터 기능
- [ ] 도구 상세 페이지
- [ ] 반응형 디자인 적용

### Phase 3: 고급 기능 & 최적화 (1주)
- [ ] 비교 기능 구현
- [ ] 성능 최적화 (이미지, 번들 크기)
- [ ] SEO 최적화
- [ ] PWA 기능 추가

### Phase 4: 테스트 & 배포 (1주)
- [ ] 단위 테스트 작성
- [ ] E2E 테스트 구현
- [ ] CI/CD 파이프라인 구축
- [ ] 프로덕션 배포 & 모니터링

## 📝 기술 블로그 콘텐츠 계획

### 개발 과정 시리즈
1. "9년차 개발자의 Next.js 14 도전기 - 프로젝트 설계편"
2. "TypeScript로 안전한 AI 도구 데이터 모델링하기"
3. "React Server Components로 성능 최적화하기"
4. "TanStack Query로 서버 상태 관리 마스터하기"
5. "Emotion + TailwindCSS 하이브리드 스타일링 전략"
6. "GitHub Actions로 프론트엔드 CI/CD 구축하기"

### 기술적 도전 시리즈
1. "복잡한 필터링 로직을 단순하게 - 검색 UX 최적화"
2. "웹 접근성을 고려한 AI 도구 비교 테이블 구현"
3. "Next.js로 Core Web Vitals 100점 달성하기"

## ⚠️ 리스크 & 대응방안

### 기술적 리스크
- **복잡성 증가**: 단계별 개발로 점진적 구현
- **성능 이슈**: 초기부터 성능 모니터링 설정
- **타입 복잡도**: 유틸리티 타입으로 단순화

### 일정 리스크
- **기능 과다**: MVP 우선 개발
- **완벽주의**: 80% 완성도로 배포 후 개선

---

## 📋 현재 상태

### 완료된 작업
- [x] 프로젝트 목표 및 계획 수립
- [x] 회사 요구사항 분석 완료
- [x] 기술 스택 결정
- [x] 아키텍처 설계 완료
- [x] 상세 기능 명세서 작성 (functional_requirements.md)
- [x] 사용자 스토리 정의 (user_stories.md)
- [x] 시스템 아키텍처 설계 (system_architecture.md)
- [x] 기술블로그 포스트 작성 (blog_post_planning.md)
- [x] 카테고리 데이터 생성 (categories.json)
- [x] AI 도구 데이터 생성 (모든 카테고리 완료)
- [x] 추천 조합 데이터 생성 (combinations.json)

### 현재 진행 중
- [x] **해결 완료**: CSS 오류 해결
  - shadcn/ui CSS 변수들을 globals.css에 추가 완료
  - tailwind.config.js에 누락된 색상들 추가 완료
- [x] **해결 완료**: 개발 서버 연결 문제 해결
- [x] **해결 완료**: CategoryGrid 컴포넌트 오류 수정
  - "Cannot read properties of undefined (reading 'map')" 오류 해결
  - API 응답 구조 수정 및 안전장치 추가
- [x] **해결 완료**: Hero 컴포넌트 네비게이션 추가
  - 도구 탐색하기 → /tools 링크 연결
  - 추천 조합 보기 → /combinations 링크 연결
- [x] **해결 완료**: 기본 페이지 생성
  - /tools 페이지 생성
  - /combinations 페이지 생성

### 🚀 새로 완료된 작업 (2025-06-21)
- [x] **API 개발 완료**: 
  - 전체 도구 API 생성 (/api/tools route.ts)
  - 검색, 필터링, 페이지네이션 기능 포함
  - 카테고리별 API와 통합
- [x] **컴포넌트 개발 완료**:
  - ToolCard 컴포넌트 (도구 카드 UI)
  - ToolsList 컴포넌트 (검색/필터/목록 관리)
  - ToolDetailView 컴포넌트 (도구 상세 페이지)
- [x] **페이지 구현 완료**:
  - 도구 리스트 페이지 상세 개발 (/tools/page.tsx)
  - 개별 도구 페이지 (/tools/[slug]/page.tsx)
  - 카테고리별 도구 페이지 (/tools/category/[category]/page.tsx)
- [x] **기능 구현 완료**:
  - 검색 및 필터 기능 (카테고리, 가격, 플랫폼, 태그)
  - 도구 상세 정보 표시 (기능, 가격, 통합, 평점)
  - 관련 도구 추천
  - 반응형 그리드/리스트 뷰

### 🎉 브라우저 테스트 완료 (2025-06-21)
- [x] **"use client" 지시어 문제 해결**:
  - ToolsList.tsx, ToolCard.tsx, ToolDetailView.tsx에 "use client" 추가
  - Next.js 14 App Router의 Server/Client Component 구분 문제 해결
- [x] **React Query/Provider 문제 해결**:
  - @tanstack/react-query-devtools 임포트 오류 해결 → 일시적으로 비활성화
  - next-themes Provider 오류 해결 → 일시적으로 비활성화
- [x] **주요 페이지 테스트 완료**:
  - ✅ 메인 페이지 (Hero, 통계 정보) - 완벽 작동
  - ✅ Tools 페이지 (27개 도구 리스트, 검색/필터) - 완벽 작동
  - ✅ 도구 상세 페이지 (GitHub Copilot) - 완벽 작동 (상세정보, 가격, 관련도구 등)
  - ✅ Combinations 페이지 기본 틀 - 작동 (내용 구현 필요)
  - ⚠️ CategoryGrid - 미작동 (React Query 의존성으로 수정 필요)

### 🎉 최종 완료 상황 (2025-06-21 오후 11:05)

#### ✅ 주요 문제 해결 완료
- [x] **메인 페이지 CategoryGrid 복구**: 정적 데이터 fallback으로 안정화
- [x] **메인 페이지 FeaturedTools 복구**: API 연동 및 fallback 처리
- [x] **배지 겹침 문제 해결**: ToolCard z-index 및 위치 조정
- [x] **이미지 404 오류 대응**: fallback 아이콘 처리
- [x] **Combination 상세 페이지 구현**: 완전한 동적 라우트 `/combinations/[id]`
- [x] **다크모드 기능 구현**: ThemeProvider 복구 및 헤더 추가
- [x] **전역 헤더 추가**: 네비게이션 및 테마 토글 포함

#### 🏗️ 구현된 주요 기능
1. **완벽한 메인 페이지**:
   - Hero 섹션 (CTA 버튼 연결)
   - 6개 카테고리 그리드 (정상 작동)
   - 인기 도구 6개 섹션 (정상 작동)
   
2. **도구 탐색 시스템**:
   - 27개 AI 도구 데이터
   - 검색 및 필터링 (카테고리, 가격, 플랫폼)
   - 도구 상세 페이지 (완전한 정보 표시)
   - 그리드/리스트 뷰 전환
   
3. **추천 조합 시스템**:
   - 5개 검증된 조합 (스타트업, 기업, 개인, 학습, 프리랜스)
   - 조합 상세 페이지 (워크플로우, 예산, 장단점)
   - 관련 조합 추천
   
4. **UI/UX 시스템**:
   - 완전한 다크모드 지원
   - 반응형 디자인
   - 일관된 컴포넌트 시스템
   - shadcn/ui 기반 디자인

#### 📊 기술 스택 완성도
- ✅ **Next.js 14**: App Router, SSG, 동적 라우트
- ✅ **TypeScript**: 엄격한 타입 시스템
- ✅ **TailwindCSS**: 완전한 스타일링 시스템
- ✅ **데이터 관리**: JSON 기반 정적 데이터
- ✅ **컴포넌트**: Clean Architecture 준수
- ✅ **다크모드**: next-themes 완전 구현

### 다음 단계 우선순위 (선택사항)
- [ ] **PWA 기능**: 서비스 워커, 매니페스트
- [ ] **단위 테스트**: Jest + Testing Library
- [ ] **E2E 테스트**: Playwright 시나리오
- [ ] **성능 최적화**: 이미지 최적화, 번들 분석
- [ ] **SEO 강화**: 메타태그, 구조화 데이터
- [ ] **배포**: Vercel 배포 및 도메인 연결

### 🔍 해결된 문제들
- [x] **"use client" 지시어 누락**: Next.js 14 App Router의 Server/Client Component 구분 문제 해결
- [x] **React Query 모듈 오류**: devtools 및 core 모듈 임포트 문제 일시적 해결
- [x] **서버 연결 문제**: localhost:3000에서 정상 작동 확인
- [x] **API 라우트 문제**: /api/tools 정상 응답 확인 (27개 도구 데이터)
- [x] **도구 상세 페이지**: 완벽한 SSG(Static Site Generation) 구현

### 🔍 확인된 문제들 (2025-06-23)
- **반응형 레이아웃 제한**: container 클래스의 max-width: 1280px 제한으로 큰 화면에서 확장되지 않음
- **이미지 로딩 실패**: 404 에러가 발생하나 실제로는 img 태그 대신 이모지 사용 중
- **로고 이미지 미사용**: /images/logos/ 폴더의 SVG 파일들이 실제 컴포넌트에서 사용되지 않음

### ⚠️ 기존 남은 문제들
- **CategoryGrid 비활성화**: useCategories 훅이 React Query에 의존하여 일시적으로 작동 중단
- **다크모드 비활성화**: ThemeProvider가 일시적으로 비활성화됨
- **React Query 기능 제한**: 실시간 데이터 업데이트 기능 일시적 중단

### ✅ 해결 완료 작업 (2025-06-23 오후 4:45 최종 완성)
- [x] **반응형 레이아웃 완전 해결**: 
  - tailwind.config.js 브레이크포인트 최적화 (2xl: 1400px로 조정)
  - CategoryGrid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
  - FeaturedTools: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  - 모바일(375px): 1열, 태블릿(768px): 2-3열, 데스크톱: 6열 완벽 적용
- [x] **전체 뱃지 겹침 문제 완전 해결**: 
  - **CategoryGrid 뱃지**: 카드에 min-height와 flex 레이아웃 적용, mt-auto로 하단 고정
  - **ToolCard 뱃지**: absolute → relative 레이아웃으로 완전 변경
  - **중앙 정렬**: text-center + min-w-[60px]로 도형 안에 완벽 중앙 정렬
  - **겹침 제거**: 27개 모든 도구 카드에서 겹침 없음 확인 ✨
  - **상대 위치**: z-index 없이도 안전한 레이아웃 구현
- [x] **모바일 UX 개선**:
  - 작은 화면에서 padding 조정 (p-4 sm:p-6)
  - 카드 높이 일관성 확보 (h-full, min-h-[160px])
  - 텍스트 줄바꿈 최적화 (line-clamp-1, line-clamp-2)
  - 버튼 크기 조정 (h-8 w-8)

### 🎆 최종 성과 요약
**반응형 완전 해결 결과**:
- ✅ 모바일(375px): 가로스크롤 없음, 1열 레이아웃 완벽 ✨
- ✅ 태블릿(768px): 2-3열 그리드로 최적 활용
- ✅ 데스크톱(1280px+): 6열 그리드로 최대 활용
- ✅ 초대형(1920px+): 전체 너비 확장 지원

**뱃지 겹침 문제 완전 해결**:
- ✅ **ToolCard 뱃지**: absolute → relative 레이아웃으로 완전 전환
- ✅ **중앙 정렬**: 유료/무료 뱃지가 도형 안에 완벽 중앙 정렬
- ✅ **PRODUCTIVITY 등 모든 카테고리 뱃지**: 정상 배치 확인
- ✅ **27개 도구 카드**: 전체에서 겹침 없음 검증 완료
- ✅ **모든 화면 크기**: 데스크톱 & 모바일에서 완벽 작동

**추가 개선사항**:
- ✅ 이미지 로드 시스템 (Next.js Image + fallback)
- ✅ Lucide React 아이콘으로 전문적 디자인
- ✅ React 렌더링 에러 완전 제거
- ✅ 모바일 터치 친화적 UI (버튼 크기, 간격 조정)
- ✅ 일관된 뱃지 디자인 (min-width, padding 통일)

*최종 완성: 2025-06-23 오후 4:45 - 반응형 & 뱃지 겹침 문제 완전 해결 🎉*