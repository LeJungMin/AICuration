# 9년차 개발자의 React 포트폴리오 프로젝트 - 기획부터 설계까지

> **시리즈 소개**: 9년차 프론트엔드 개발자가 React/Next.js 실력을 증명하기 위해 'AI 도구 큐레이션 플랫폼'을 만드는 과정을 기록합니다. 이 첫 번째 포스트에서는 프로젝트 기획부터 시스템 설계까지의 과정을 다룹니다.

---

## 🎯 왜 이 프로젝트를 시작했을까?

### 현실적인 고민들

9년차 개발자로서 새로운 회사 지원을 준비하면서 한 가지 깨달은 점이 있었습니다. **"내가 정말 React를 잘한다고 증명할 수 있는 포트폴리오가 있을까?"**

물론 회사에서 다양한 프로젝트를 경험했지만, 대부분은:
- 기존 코드베이스 위에서 기능 추가
- 레거시 코드 유지보수  
- 팀 프로젝트로 개인 역량 증명이 애매

그래서 결정했습니다. **"처음부터 끝까지 내가 설계하고 구현하는 프로젝트를 만들자."**

### 목표 회사의 요구사항 분석

지원하려는 회사의 JD를 분석해보니 이런 키워드들이 눈에 띄었습니다:

```
✅ TypeScript, React, Next.js
✅ 서버 사이드 렌더링(SSR) 경험
✅ 테스트 및 배포 자동화 경험  
✅ 웹 접근성, 웹 표준 고려
✅ 개발자 경험(DX)에 대한 높은 가치
✅ 복잡한 문제를 단순하게 해결
```

단순한 CRUD 앱이 아닌, **이 모든 요구사항을 만족하는 프로젝트**가 필요했습니다.

---

## 💡 프로젝트 아이디어: AI 도구 큐레이션 플랫폼

### "내가 진짜 필요한 서비스"

요즘 AI 도구가 너무 많아서 **"어떤 걸 써야 할지 모르겠다"**는 고민이 있었습니다. 특히:

- GitHub Copilot vs Cursor vs Tabnine, 뭐가 다른지?
- 프로젝트 시작할 때 어떤 AI 도구 조합이 좋을까?
- 실제 사용해본 개발자들의 솔직한 후기는?

이런 문제를 해결하는 **"개발자를 위한 AI 도구 큐레이션 플랫폼"**을 만들기로 했습니다.

### 왜 이 아이디어가 좋은 포트폴리오일까?

1. **실제 사용자가 있을 만한 서비스** - 가짜 프로젝트가 아님
2. **복잡한 비즈니스 로직** - 검색, 필터링, 비교, 추천 등
3. **성능 최적화 이슈** - 대량 데이터, 검색 성능 등
4. **사용자 경험 중요** - 정보 구조화, 직관적 UI 필요
5. **SEO 최적화 필수** - 검색 유입이 중요한 서비스

---

## 📋 체계적인 기획 과정

### 1단계: 사용자 페르소나 정의

먼저 **"누가 이 서비스를 쓸까?"**를 구체적으로 정의했습니다.

#### Primary Persona: 김개발 (29세, 3-7년차)
```
🎯 목표: 개발 생산성 향상, 최신 기술 습득
😰 고민: "AI 도구가 너무 많아서 뭘 써야 할지 모르겠어"
📱 행동: 기술 블로그 구독, GitHub 활발 사용
💰 예산: 월 10-30만원 정도의 도구 구독료는 OK
```

#### Secondary Persona: 박시니어 (35세, 8년+ 경력)
```
🎯 목표: 팀 전체 생산성 향상, 도구 도입 의사결정
😰 고민: "우리 팀에 도입할 만한 검증된 도구는?"
📊 중시: ROI, 안정성, 팀 협업 효과
💼 권한: 도구 구매 결정권 있음
```

이렇게 페르소나를 구체화하니 **어떤 기능이 정말 필요한지** 명확해졌습니다.

### 2단계: 사용자 스토리 작성

페르소나 기반으로 핵심 사용자 스토리를 작성했습니다:

```
📖 US-001: 도구 카탈로그 탐색
As a 개발자, I want to AI 도구들을 카테고리별로 탐색할 수 있다
So that 내 업무에 필요한 도구 유형을 쉽게 찾을 수 있다

📖 US-002: 도구 비교하기  
As a 개발자, I want to 여러 AI 도구를 동시에 비교할 수 있다
So that 내 요구사항에 가장 적합한 도구를 선택할 수 있다

📖 US-003: 프로젝트별 추천 조합
As a 개발자, I want to 특정 프로젝트 유형에 적합한 도구 조합을 확인할 수 있다
So that 검증된 워크플로우를 빠르게 적용할 수 있다
```

각 스토리마다 **구체적인 인수 기준(Acceptance Criteria)**과 **테스트 시나리오**까지 작성했습니다.

### 3단계: 기능 우선순위 결정

MoSCoW 방법론으로 기능을 분류했습니다:

#### Must Have (MVP 핵심 기능)
- ✅ AI 도구 카탈로그 
- ✅ 카테고리별 분류
- ✅ 검색 및 필터링
- ✅ 도구 상세 정보

#### Should Have (차별화 기능)
- ✅ 도구 비교 테이블
- ✅ 개발자 추천 조합
- ✅ 사용자 리뷰 시스템

#### Could Have (고도화 기능)
- ⏳ 개인화 추천
- ⏳ 커뮤니티 기능

#### Won't Have (이번 릴리스에서 제외)
- ❌ 사용자 계정 시스템 (로컬 저장으로 대체)
- ❌ 실시간 알림 기능
- ❌ 소셜 기능

이렇게 우선순위를 명확히 하니 **4주 안에 완성 가능한 범위**가 보였습니다.

---

## 🏗 시스템 아키텍처 설계

### 기술 스택 선택 과정

목표 회사의 기술 스택을 분석해서 맞춰 선택했습니다:

```typescript
// 회사 요구사항 → 내 선택
TypeScript ✅ → TypeScript (엄격 모드)
React ✅ → React 18 + Next.js 14
SSR 경험 ✅ → Next.js App Router
상태관리 ✅ → React Query + Zustand  
스타일링 ✅ → Emotion + TailwindCSS (하이브리드)
테스트 자동화 ✅ → Jest + Testing Library + Playwright
패키지 매니저 ✅ → PNPM (Yarn Berry 대안)
CI/CD ✅ → GitHub Actions
```

### 폴더 구조 설계

**Clean Architecture** 원칙을 적용해서 확장 가능한 구조로 설계했습니다:

```
src/
├── app/                    # Next.js App Router
├── components/             # 재사용 컴포넌트
│   ├── ui/                # 기본 UI (Button, Card, Input)
│   ├── features/          # 기능별 (ToolCard, SearchBar)
│   └── layout/            # 레이아웃 (Header, Footer)
├── lib/                   # 유틸리티 & 설정
├── hooks/                 # 커스텀 훅
├── types/                 # TypeScript 타입 정의
├── data/                  # 정적 데이터 (JSON)
└── tests/                 # 테스트 파일
```

**왜 이런 구조를 선택했을까?**

1. **관심사 분리**: UI 로직과 비즈니스 로직 분리
2. **재사용성**: 컴포넌트별 독립적 개발 가능
3. **테스트 용이성**: 각 레이어별 독립적 테스트
4. **확장성**: 새로운 기능 추가 시 기존 코드 영향 최소화

### 데이터 모델 설계

TypeScript의 힘을 보여주기 위해 **엄격한 타입 시스템**을 구축했습니다:

```typescript
interface AITool {
  // 기본 정보
  id: string;
  slug: string;                    // URL 친화적 식별자
  name: string;
  tagline: string;                 // 한 줄 소개
  description: string;             // 마크다운 지원
  
  // 분류 체계
  category: CategoryType;
  subcategories: string[];
  tags: string[];
  
  // 가격 정보 (복잡한 비즈니스 로직)
  pricing: {
    model: PricingModel;
    plans: PricingPlan[];
    freeTier?: FreeTierInfo;
  };
  
  // 평가 시스템
  rating: {
    overall: number;
    criteria: {
      functionality: number;
      easeOfUse: number;
      valueForMoney: number;
      performance: number;
      support: number;
    };
    reviewCount: number;
  };
  
  // SEO 최적화
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
```

이렇게 상세한 타입 정의로 **컴파일 타임에 버그를 방지**하고, **IDE 자동완성**의 혜택을 최대화했습니다.

---

## 🎨 사용자 경험(UX) 설계

### 정보 아키텍처

AI 도구라는 복잡한 정보를 **직관적으로 구조화**하는 것이 핵심이었습니다:

```
홈페이지
├── 히어로 섹션 (검색바 + 주요 카테고리)
├── 카테고리 그리드 (시각적 탐색)
└── 인기 도구 (소셜 프루프)

도구 리스트 페이지  
├── 필터 패널 (사이드바)
├── 정렬 옵션 (관련도, 평점, 가격순)
└── 도구 그리드 (카드 형태)

도구 상세 페이지
├── 헤더 (로고, 이름, CTA)
├── 핵심 정보 (기능, 가격, 평점)
├── 상세 리뷰 (장단점, 사용 사례)
└── 관련 도구 (추천)
```

### 검색 UX 설계

**"복잡한 검색을 단순하게"**가 목표였습니다:

1. **점진적 공개**: 기본 검색 → 고급 필터 순서로 노출
2. **실시간 피드백**: 입력 중 자동완성, 결과 개수 표시
3. **명확한 상태**: 로딩, 에러, 결과 없음 등 모든 상태 처리
4. **복구 가능**: 잘못된 검색어에 대한 제안, 필터 초기화

```typescript
// 검색 상태 설계
interface SearchState {
  query: string;
  filters: FilterState;
  results: AITool[];
  loading: boolean;
  error: string | null;
  suggestions: string[];
  meta: {
    total: number;
    page: number;
    hasNext: boolean;
  };
}
```

---

## 🚀 성능 최적화 전략

### 번들 크기 최적화

목표: **First Contentful Paint < 1.5초**

```javascript
// next.config.js
const nextConfig = {
  // 코드 분할
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
      },
    };
    return config;
  },
  
  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1주일
  },
  
  // 실험적 최적화
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};
```

### 검색 성능 최적화

대량의 AI 도구 데이터에서 **빠른 검색**을 위한 전략:

```typescript
// FlexSearch 기반 클라이언트 검색 엔진
class ToolSearchEngine {
  private index: FlexSearch.Index;
  
  constructor(tools: AITool[]) {
    this.index = new FlexSearch.Index({
      tokenize: 'forward',
      resolution: 9,  // 정확도 vs 속도 균형
      depth: 3,      // 메모리 vs 성능 균형
    });
    
    this.buildIndex(tools);
  }
  
  search(query: string): SearchResult[] {
    // 500ms 이내 응답 보장
    const startTime = performance.now();
    const results = this.index.search(query);
    const endTime = performance.now();
    
    if (endTime - startTime > 500) {
      console.warn('Search took too long:', endTime - startTime);
    }
    
    return this.rankResults(results, query);
  }
}
```

---

## 🧪 테스트 전략

### 3단계 테스트 피라미드

회사에서 요구하는 **"자동화된 테스트의 중요성"**을 보여주기 위한 전략:

```
        /\
       /  \
      /E2E \ ← 핵심 사용자 플로우 (Playwright)
     /______\
    /        \
   /Integration\ ← 컴포넌트 통합 (Testing Library)  
  /__________\
 /            \
/    Unit      \ ← 유틸리티, 훅 (Jest)
/______________\
```

#### 단위 테스트 예시
```typescript
// hooks/useSearch.test.ts
describe('useSearch', () => {
  it('should filter tools by category', () => {
    const { result } = renderHook(() => useSearch(mockTools));
    
    act(() => {
      result.current.setFilters({ categories: ['coding'] });
    });
    
    expect(result.current.results).toHaveLength(3);
    expect(result.current.results.every(tool => 
      tool.category === 'coding'
    )).toBe(true);
  });
});
```

#### E2E 테스트 시나리오
```typescript
// e2e/search.spec.ts
test('사용자가 AI 도구를 검색하고 비교할 수 있다', async ({ page }) => {
  await page.goto('/');
  
  // 검색어 입력
  await page.fill('[data-testid=search-input]', 'github copilot');
  await page.waitForSelector('[data-testid=search-results]');
  
  // 첫 번째 결과 클릭
  await page.click('[data-testid=tool-card]:first-child');
  
  // 비교에 추가
  await page.click('[data-testid=add-to-comparison]');
  
  // 비교 페이지에서 확인
  await page.click('[data-testid=view-comparison]');
  await expect(page.locator('[data-testid=comparison-table]')).toBeVisible();
});
```

---

## 📈 측정 가능한 성공 기준

### 기술적 지표
```
✅ Lighthouse 성능 점수: 90+ 
✅ 테스트 커버리지: 80%+
✅ TypeScript 엄격 모드: 에러 0개
✅ 번들 크기: 초기 로딩 < 100KB
✅ 검색 응답 시간: < 500ms
✅ 접근성 점수: 95+
```

### 사용자 경험 지표  
```
✅ 첫 방문자가 원하는 도구 찾기: 3분 이내
✅ 도구 비교 완료: 5분 이내  
✅ 모바일 사용성: 데스크탑과 동일한 기능
✅ 키보드 네비게이션: 모든 기능 접근 가능
```

---

## 🔄 개발 프로세스

### 애자일 방식 적용

4주를 4개 스프린트로 나누어 진행:

#### Sprint 1: 프로젝트 기반 (1주)
- [x] 요구사항 분석 및 기획
- [x] 시스템 아키텍처 설계  
- [x] Next.js 프로젝트 초기화
- [x] 기본 컴포넌트 시스템 구축

#### Sprint 2: 핵심 기능 (1주)
- [ ] AI 도구 데이터 모델링
- [ ] 메인 페이지 및 도구 리스트
- [ ] 검색 및 필터 기능
- [ ] 도구 상세 페이지

#### Sprint 3: 차별화 기능 (1주)  
- [ ] 도구 비교 기능
- [ ] 추천 조합 시스템
- [ ] 즐겨찾기 및 컬렉션
- [ ] 반응형 디자인

#### Sprint 4: 최적화 및 배포 (1주)
- [ ] 성능 최적화
- [ ] 테스트 작성
- [ ] CI/CD 파이프라인
- [ ] 프로덕션 배포

### Definition of Done

각 기능이 **정말 완료**되었는지 판단하는 기준:

```
✅ 모든 인수 기준 통과
✅ 단위 테스트 작성 및 통과
✅ 코드 리뷰 완료  
✅ 접근성 검증 완료
✅ 크로스 브라우저 테스트 완료
✅ 성능 요구사항 충족
✅ 문서화 완료
```

---

## 🎯 예상 도전 과제와 해결 전략

### 도전 과제 1: 대량 데이터 성능
**문제**: 수백 개의 AI 도구를 빠르게 검색/필터링
**해결**: 
- 클라이언트 사이드 검색 엔진 (FlexSearch)
- 가상화를 통한 효율적 렌더링
- 이미지 지연 로딩 및 최적화

### 도전 과제 2: 복잡한 비교 로직
**문제**: 다양한 기준으로 도구들을 공정하게 비교
**해결**:
- 명확한 비교 항목 정의
- 가중치 기반 점수 시스템
- 시각적 비교 차트 (레이더, 막대 그래프)

### 도전 과제 3: SEO 최적화
**문제**: 각 도구 페이지가 검색엔진에 잘 노출되어야 함
**해결**:
- Next.js App Router의 SSR 활용
- 동적 메타데이터 생성
- 구조화 데이터 (JSON-LD) 적용
- 사이트맵 자동 생성

---

## 🚀 다음 단계: 구현 시작!

이제 탄탄한 기획과 설계가 완료되었습니다. 다음 포스트에서는:

1. **Next.js 14 프로젝트 초기화**
2. **TypeScript 엄격 모드 설정**  
3. **기본 컴포넌트 시스템 구축**
4. **첫 번째 기능 구현: AI 도구 카탈로그**

과정을 상세히 기록하겠습니다.

### 이 포스트에서 배운 점

- **체계적 기획의 중요성**: 코딩 전에 충분한 분석과 설계
- **사용자 중심 사고**: 페르소나 기반 기능 우선순위 결정
- **기술적 의사결정**: 목표에 맞는 기술 스택 선택
- **측정 가능한 목표**: 구체적인 성공 기준 설정

**9년차 개발자라면 이 정도는 할 줄 알아야 한다**는 것을 보여주는 프로젝트가 되길 바랍니다.

---

### 📚 참고 자료

- [Next.js 14 공식 문서](https://nextjs.org/docs)
- [React Query 공식 가이드](https://tanstack.com/query/latest)
- [Clean Architecture 원칙](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [WCAG 2.1 접근성 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)

---

*다음 포스트: "Next.js 14 + TypeScript 프로젝트 초기화 완벽 가이드"*

**이 시리즈가 도움이 되셨다면 좋아요와 공유 부탁드립니다! 🙏**