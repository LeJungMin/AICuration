# AI 도구 큐레이션 플랫폼 - 시스템 아키텍처 설계서

## 📋 문서 정보
- **작성일**: 2025-06-21
- **버전**: v1.0
- **목적**: 시스템의 기술적 구조 및 설계 원칙 정의

## 🏛 전체 아키텍처 개요

### 시스템 구성도
```
┌─────────────────────────────────────────────────┐
│                 Client (Browser)                │
├─────────────────────────────────────────────────┤
│              Next.js 14 App Router              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │   Pages     │ │ Components  │ │    Hooks    │ │
│  │             │ │             │ │             │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────┤
│               Data & State Layer                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │React Query  │ │   Zustand   │ │Local Storage│ │
│  │ (Server)    │ │ (Client)    │ │ (Persist)   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────┤
│                 External APIs                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │Static Data  │ │  Search API │ │Analytics API│ │
│  │   (JSON)    │ │  (Algolia)  │ │  (Vercel)   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────┘
```

### 아키텍처 원칙
1. **Clean Architecture**: 의존성 역전 원칙 적용
2. **Component-Driven**: 재사용 가능한 컴포넌트 중심 설계
3. **Performance First**: 성능을 우선시한 최적화
4. **Type Safety**: TypeScript 엄격 모드로 타입 안전성 확보
5. **Scalable**: 확장 가능한 구조 설계

---

## 📁 프로젝트 구조 설계

### 디렉토리 구조
```
ai-tools-curator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/
│   │   │   ├── page.tsx       # 홈페이지
│   │   │   ├── tools/         # 도구 관련 페이지
│   │   │   ├── compare/       # 비교 페이지
│   │   │   ├── collections/   # 컬렉션 페이지
│   │   │   └── about/         # 정보 페이지
│   │   ├── globals.css        # 전역 스타일
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── loading.tsx        # 로딩 UI
│   │
│   ├── components/             # 재사용 컴포넌트
│   │   ├── ui/                # 기본 UI 컴포넌트
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── index.ts       # 배럴 익스포트
│   │   │
│   │   ├── features/          # 기능별 컴포넌트
│   │   │   ├── ToolCard/
│   │   │   ├── SearchBar/
│   │   │   ├── FilterPanel/
│   │   │   ├── ComparisonTable/
│   │   │   └── ToolDetails/
│   │   │
│   │   └── layout/            # 레이아웃 컴포넌트
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Sidebar/
│   │       └── Navigation/
│   │
│   ├── lib/                   # 유틸리티 & 설정
│   │   ├── utils/
│   │   │   ├── format.ts      # 데이터 포맷팅
│   │   │   ├── search.ts      # 검색 로직
│   │   │   ├── storage.ts     # 로컬 스토리지
│   │   │   └── validation.ts  # 입력 검증
│   │   │
│   │   ├── config/
│   │   │   ├── constants.ts   # 상수 정의
│   │   │   ├── env.ts         # 환경 변수
│   │   │   └── seo.ts         # SEO 설정
│   │   │
│   │   └── providers/         # 컨텍스트 프로바이더
│   │       ├── QueryProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       └── index.tsx
│   │
│   ├── hooks/                 # 커스텀 훅
│   │   ├── useTools.ts        # 도구 데이터 관리
│   │   ├── useSearch.ts       # 검색 상태 관리
│   │   ├── useFilter.ts       # 필터 상태 관리
│   │   ├── useComparison.ts   # 비교 상태 관리
│   │   ├── useFavorites.ts    # 즐겨찾기 관리
│   │   └── useLocalStorage.ts # 로컬 스토리지 훅
│   │
│   ├── types/                 # TypeScript 타입 정의
│   │   ├── tool.ts           # AI 도구 관련 타입
│   │   ├── user.ts           # 사용자 관련 타입
│   │   ├── api.ts            # API 응답 타입
│   │   └── ui.ts             # UI 컴포넌트 타입
│   │
│   ├── data/                 # 정적 데이터
│   │   ├── tools/
│   │   │   ├── coding.json   # 코딩 도구 데이터
│   │   │   ├── design.json   # 디자인 도구 데이터
│   │   │   └── writing.json  # 글쓰기 도구 데이터
│   │   │
│   │   ├── categories.json   # 카테고리 정의
│   │   ├── combinations.json # 추천 조합 데이터
│   │   └── schema.json       # 데이터 스키마
│   │
│   └── styles/               # 스타일 관련
│       ├── globals.css       # 전역 CSS
│       ├── components.css    # 컴포넌트 스타일
│       └── themes/           # 테마 정의
│           ├── light.css
│           └── dark.css
│
├── public/                   # 정적 파일
│   ├── images/
│   │   ├── logos/           # 도구 로고
│   │   ├── screenshots/     # 스크린샷
│   │   └── icons/           # 아이콘
│   │
│   ├── manifest.json        # PWA 매니페스트
│   ├── robots.txt           # 검색엔진 설정
│   └── sitemap.xml          # 사이트맵
│
├── tests/                    # 테스트 파일
│   ├── __mocks__/           # Mock 데이터
│   ├── components/          # 컴포넌트 테스트
│   ├── hooks/               # 훅 테스트
│   ├── utils/               # 유틸리티 테스트
│   └── e2e/                 # E2E 테스트
│       ├── search.spec.ts
│       ├── comparison.spec.ts
│       └── navigation.spec.ts
│
├── docs/                     # 문서
│   ├── api/                 # API 문서
│   ├── components/          # 컴포넌트 문서
│   └── deployment/          # 배포 가이드
│
└── config/                   # 설정 파일
    ├── jest.config.js       # 테스트 설정
    ├── next.config.js       # Next.js 설정
    ├── tailwind.config.js   # Tailwind 설정
    ├── tsconfig.json        # TypeScript 설정
    └── .env.example         # 환경 변수 예시
```

---

## 🎯 컴포넌트 아키텍처

### 컴포넌트 계층 구조
```
App Layout
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── SearchBar
│   └── ThemeToggle
│
├── Main Content
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── CategoryGrid
│   │   └── FeaturedTools
│   │
│   ├── ToolListPage
│   │   ├── FilterPanel
│   │   ├── SortOptions
│   │   └── ToolGrid
│   │       └── ToolCard (반복)
│   │
│   ├── ToolDetailPage
│   │   ├── ToolHeader
│   │   ├── ToolInfo
│   │   ├── FeatureList
│   │   ├── PricingInfo
│   │   └── RelatedTools
│   │
│   └── ComparisonPage
│       ├── ComparisonHeader
│       ├── ToolSelector
│       ├── ComparisonTable
│       └── ComparisonChart
│
└── Footer
    ├── SiteMap
    ├── SocialLinks
    └── Copyright
```

### 공통 UI 컴포넌트 스펙

#### Button 컴포넌트
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
}
```

#### Card 컴포넌트  
```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined';
  padding: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  children: ReactNode;
}
```

#### Input 컴포넌트
```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
}
```

---

## 📊 데이터 모델 설계

### 핵심 데이터 타입

#### AITool 타입
```typescript
interface AITool {
  // 기본 정보
  id: string;
  slug: string;                    // URL 친화적 식별자
  name: string;
  tagline: string;                 // 한 줄 소개
  description: string;             // 상세 설명 (마크다운)
  website: string;
  logo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  
  // 분류 및 태그
  category: CategoryType;
  subcategories: string[];
  tags: string[];
  targetAudience: TargetAudience[];
  
  // 기능 정보
  features: Feature[];
  integrations: Integration[];
  platforms: Platform[];
  
  // 가격 정보
  pricing: {
    model: PricingModel;
    plans: PricingPlan[];
    freeTier?: FreeTierInfo;
  };
  
  // 평가 및 리뷰
  rating: {
    overall: number;              // 1-5
    criteria: {
      functionality: number;
      easeOfUse: number;
      valueForMoney: number;
      performance: number;
      support: number;
    };
    reviewCount: number;
  };
  
  // 메타데이터
  status: 'active' | 'beta' | 'deprecated';
  lastUpdated: Date;
  addedDate: Date;
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
```

#### Category 타입
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
  toolCount: number;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}
```

#### ToolCombination 타입
```typescript
interface ToolCombination {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  tools: {
    primary: string[];            // 필수 도구 ID
    optional: string[];           // 선택 도구 ID  
    alternatives: {               // 대안 도구
      [toolId: string]: string[];
    };
  };
  
  workflow: WorkflowStep[];
  
  budget: {
    minimum: number;
    recommended: number;
    premium: number;
  };
  
  pros: string[];
  cons: string[];
  useCase: string;
  
  metadata: {
    author: string;
    createdAt: Date;
    updatedAt: Date;
    viewCount: number;
    likeCount: number;
  };
}
```

### 상태 관리 설계

#### Global State (Zustand)
```typescript
interface AppState {
  // UI 상태
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  
  // 검색 상태
  searchQuery: string;
  searchFilters: FilterState;
  searchResults: AITool[];
  
  // 비교 상태
  comparisonTools: string[];      // 최대 4개
  
  // 사용자 상태 (로컬)
  favorites: string[];
  collections: UserCollection[];
  preferences: UserPreferences;
  
  // 액션
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: FilterState) => void;
  addToComparison: (toolId: string) => void;
  removeFromComparison: (toolId: string) => void;
  addToFavorites: (toolId: string) => void;
  removeFromFavorites: (toolId: string) => void;
}
```

#### Server State (React Query)
```typescript
// Query Keys
export const queryKeys = {
  tools: {
    all: ['tools'] as const,
    lists: () => [...queryKeys.tools.all, 'list'] as const,
    list: (filters: FilterState) => [...queryKeys.tools.lists(), filters] as const,
    details: () => [...queryKeys.tools.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tools.details(), id] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
  },
  combinations: {
    all: ['combinations'] as const,
    list: () => [...queryKeys.combinations.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.combinations.all, 'detail', id] as const,
  },
  search: {
    all: ['search'] as const,
    query: (query: string) => [...queryKeys.search.all, query] as const,
  },
} as const;

// Query Hooks
export const useTools = (filters?: FilterState) => {
  return useQuery({
    queryKey: queryKeys.tools.list(filters || {}),
    queryFn: () => fetchTools(filters),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useTool = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tools.detail(id),
    queryFn: () => fetchTool(id),
    staleTime: 10 * 60 * 1000, // 10분
  });
};
```

---

## 🔌 API 설계

### 데이터 소스 전략

#### 정적 데이터 (JSON)
```typescript
// /data/tools/coding.json 구조
{
  "lastUpdated": "2025-06-21T00:00:00Z",
  "version": "1.0",
  "tools": [
    {
      "id": "github-copilot",
      "slug": "github-copilot",
      "name": "GitHub Copilot",
      // ... 나머지 필드
    }
  ]
}
```

#### API 엔드포인트 설계
```typescript
// Next.js API Routes
GET /api/tools                   // 도구 목록 (필터링 지원)
GET /api/tools/[id]             // 특정 도구 상세
GET /api/tools/search           // 도구 검색
GET /api/categories             // 카테고리 목록
GET /api/combinations           // 추천 조합 목록
GET /api/combinations/[id]      // 특정 조합 상세

// 검색 API (Algolia 연동 시)
POST /api/search                // 통합 검색
GET /api/search/suggestions     // 검색 제안

// 분석 API  
POST /api/analytics/event       // 이벤트 추적
GET /api/analytics/popular      // 인기 도구
```

#### API 응답 형태
```typescript
// 표준 API 응답
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasNext?: boolean;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// 도구 목록 응답 예시
interface ToolsResponse {
  tools: AITool[];
  categories: Category[];
  totalCount: number;
  filters: {
    applied: FilterState;
    available: AvailableFilters;
  };
}
```

---

## 🎨 스타일링 아키텍처

### CSS-in-JS + 유틸리티 하이브리드 전략

#### Emotion + Tailwind 조합
```typescript
// 기본 스타일링: Tailwind 유틸리티
const ToolCard = ({ tool }: { tool: AITool }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
    <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
    <p className="text-gray-600 mt-2">{tool.tagline}</p>
  </div>
);

// 복잡한 스타일링: Emotion
const AnimatedCard = styled.div<{ isHovered: boolean }>`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: ${props => props.isHovered ? 'translateY(-4px)' : 'translateY(0)'};
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
`;
```

#### 디자인 토큰 시스템
```typescript
// theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      500: '#6b7280', 
      900: '#111827',
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
  },
} as const;
```

---

## 🔍 검색 및 필터링 아키텍처

### 클라이언트 검색 구현
```typescript
// 검색 엔진 클래스
class ToolSearchEngine {
  private tools: AITool[];
  private index: FlexSearch.Index;
  
  constructor(tools: AITool[]) {
    this.tools = tools;
    this.index = new FlexSearch.Index({
      tokenize: 'forward',
      resolution: 9,
      depth: 3,
    });
    
    this.buildIndex();
  }
  
  private buildIndex() {
    this.tools.forEach((tool, i) => {
      const searchableText = [
        tool.name,
        tool.tagline,
        tool.description,
        ...tool.tags,
        tool.category,
      ].join(' ').toLowerCase();
      
      this.index.add(i, searchableText);
    });
  }
  
  search(query: string, filters?: FilterState): SearchResult[] {
    if (!query.trim()) return this.getFilteredTools(filters);
    
    const results = this.index.search(query);
    const filteredResults = results
      .map(i => this.tools[i as number])
      .filter(tool => this.matchesFilters(tool, filters));
      
    return this.rankResults(filteredResults, query);
  }
  
  private rankResults(tools: AITool[], query: string): SearchResult[] {
    return tools.map(tool => ({
      tool,
      score: this.calculateRelevanceScore(tool, query),
    })).sort((a, b) => b.score - a.score);
  }
}
```

### 필터링 로직
```typescript
interface FilterState {
  categories: string[];
  pricing: PricingModel[];
  features: string[];
  platforms: Platform[];
  rating: { min: number; max: number };
  tags: string[];
}

class ToolFilter {
  static apply(tools: AITool[], filters: FilterState): AITool[] {
    return tools.filter(tool => {
      // 카테고리 필터
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(tool.category)) return false;
      }
      
      // 가격 모델 필터
      if (filters.pricing.length > 0) {
        if (!filters.pricing.includes(tool.pricing.model)) return false;
      }
      
      // 평점 필터
      if (tool.rating.overall < filters.rating.min || 
          tool.rating.overall > filters.rating.max) {
        return false;
      }
      
      // 태그 필터 (OR 조건)
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          tool.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }
      
      return true;
    });
  }
}
```

---

## 📱 성능 최적화 전략

### 번들 최적화
```javascript
// next.config.js
const nextConfig = {
  // 번들 분석
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
          },
        },
      };
    }
    return config;
  },
  
  // 이미지 최적화
  images: {
    domains: ['cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 압축
  compress: true,
  
  // 실험적 기능
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};
```

### 컴포넌트 최적화
```typescript
// 메모이제이션 전략
const ToolCard = memo(({ tool }: { tool: AITool }) => {
  return (
    <Card>
      <CardHeader>
        <Image 
          src={tool.logo.url} 
          alt={tool.logo.alt}
          width={tool.logo.width}
          height={tool.logo.height}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,..."
        />
        <h3>{tool.name}</h3>
      </CardHeader>
      <CardContent>
        <p>{tool.tagline}</p>
      </CardContent>
    </Card>
  );
});

// 가상화를 통한 대량 데이터 렌더링
const VirtualizedToolGrid = ({ tools }: { tools: AITool[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);
  
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(tools.length / 3), // 3열 그리드
    getScrollElement: () => containerRef.current,
    estimateSize: () => 300, // 예상 행 높이
  });
  
  return (
    <div ref={containerRef} style={{ height: containerHeight, overflow: 'auto' }}>
      <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {/* 3개 도구 렌더링 */}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

*다음: 기술블로그 포스트 작성*