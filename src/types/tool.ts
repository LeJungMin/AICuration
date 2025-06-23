// AI 도구 관련 타입 정의

export type CategoryType = 
  | 'coding'
  | 'design' 
  | 'writing'
  | 'analysis'
  | 'productivity'
  | 'learning';

export type PricingModel = 
  | 'free'
  | 'freemium' 
  | 'paid'
  | 'enterprise';

export type Platform = 
  | 'web'
  | 'desktop'
  | 'mobile'
  | 'api'
  | 'extension'
  | 'cli';

export type TargetAudience =
  | 'developer'
  | 'designer'
  | 'writer'
  | 'student'
  | 'business'
  | 'researcher';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  isPopular?: boolean;
}

export interface FreeTierInfo {
  hasFreeTier: boolean;
  limitations?: string[];
  trialPeriod?: number; // days
}

export interface Feature {
  id: string;
  name: string;
  description?: string;
  category: string;
}

export interface Integration {
  id: string;
  name: string;
  type: 'official' | 'community' | 'api';
  url?: string;
}

export interface AITool {
  // 기본 정보
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
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
    overall: number; // 1-5
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

// 카테고리 정의
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
  toolCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// 도구 조합 (추천)
export type ProjectCategory = 
  | 'startup-mvp'
  | 'enterprise'
  | 'personal'
  | 'learning'
  | 'freelance';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  toolId: string;
  order: number;
  estimatedTime?: string;
}

export interface ToolCombination {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  tools: {
    primary: string[]; // 필수 도구 ID
    optional: string[]; // 선택 도구 ID
    alternatives: {
      [toolId: string]: string[]; // 대안 도구
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

// 검색 및 필터링
export interface FilterState {
  categories: CategoryType[];
  pricing: PricingModel[];
  features: string[];
  platforms: Platform[];
  rating: {
    min: number;
    max: number;
  };
  tags: string[];
}

export interface SearchResult {
  tool: AITool;
  score: number;
  highlights?: {
    field: string;
    matches: string[];
  }[];
}

// 사용자 관련 (로컬 스토리지)
export interface UserCollection {
  id: string;
  name: string;
  description?: string;
  toolIds: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultCategory?: CategoryType;
  favoriteCategories: CategoryType[];
  hiddenTools: string[];
  language: 'ko' | 'en';
}

// API 응답
export interface ApiResponse<T> {
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
    details?: unknown;
  };
}

export interface ToolsResponse {
  tools: AITool[];
  categories: Category[];
  totalCount: number;
  filters: {
    applied: FilterState;
    available: {
      categories: Category[];
      platforms: Platform[];
      features: string[];
      tags: string[];
    };
  };
}
