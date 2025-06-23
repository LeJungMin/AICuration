'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Star, ExternalLink, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { AITool } from '@/types/tool';

// 카테고리별 아이콘 매핑
const getToolIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'coding': '💻',
    'design': '🎨',
    'writing': '✍️',
    'analysis': '📊',
    'productivity': '⚡',
    'learning': '🎓'
  };
  return iconMap[category] || '🔧';
};

// 정적 인기 도구 데이터 (fallback용)
const staticPopularTools: AITool[] = [
  {
    id: 'github-copilot',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'Your AI pair programmer',
    description: 'GitHub Copilot은 OpenAI와 GitHub이 협력하여 개발한 AI 코드 어시스턴트입니다.',
    website: 'https://github.com/features/copilot',
    logo: { url: '/images/logos/github-copilot.svg', alt: 'GitHub Copilot Logo', width: 48, height: 48 },
    category: 'coding',
    subcategories: ['code-generation'],
    tags: ['autocomplete', 'pair-programming'],
    targetAudience: ['developer'],
    features: [],
    integrations: [],
    platforms: ['extension'],
    pricing: { model: 'paid', plans: [{ id: 'individual', name: 'Individual', price: 10, currency: 'USD', billingCycle: 'monthly', features: [] }] },
    rating: { overall: 4.3, criteria: { functionality: 4.5, easeOfUse: 4.4, valueForMoney: 4.0, performance: 4.2, support: 4.1 }, reviewCount: 2847 },
    status: 'active',
    lastUpdated: new Date('2025-06-21'),
    addedDate: new Date('2023-01-15'),
    seo: { title: '', description: '', keywords: [], ogImage: '' }
  },
  {
    id: 'chatgpt',
    slug: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'AI assistant for any task',
    description: 'ChatGPT는 OpenAI에서 개발한 대화형 AI 어시스턴트입니다.',
    website: 'https://chat.openai.com',
    logo: { url: '/images/logos/chatgpt.svg', alt: 'ChatGPT Logo', width: 48, height: 48 },
    category: 'writing',
    subcategories: ['content-writing'],
    tags: ['conversation', 'gpt-4'],
    targetAudience: ['writer'],
    features: [],
    integrations: [],
    platforms: ['web'],
    pricing: { model: 'freemium', plans: [{ id: 'free', name: 'Free', price: 0, currency: 'USD', billingCycle: 'monthly', features: [] }] },
    rating: { overall: 4.4, criteria: { functionality: 4.6, easeOfUse: 4.5, valueForMoney: 4.2, performance: 4.4, support: 4.1 }, reviewCount: 15487 },
    status: 'active',
    lastUpdated: new Date('2025-06-21'),
    addedDate: new Date('2022-11-30'),
    seo: { title: '', description: '', keywords: [], ogImage: '' }
  },
  {
    id: 'midjourney',
    slug: 'midjourney',
    name: 'Midjourney',
    tagline: 'AI art generator for everyone',
    description: 'Midjourney는 텍스트 프롬프트를 통해 고품질의 아트워크와 이미지를 생성하는 AI 도구입니다.',
    website: 'https://midjourney.com',
    logo: { url: '/images/logos/midjourney.svg', alt: 'Midjourney Logo', width: 48, height: 48 },
    category: 'design',
    subcategories: ['image-generation'],
    tags: ['ai-art', 'image-generation'],
    targetAudience: ['designer'],
    features: [],
    integrations: [],
    platforms: ['web'],
    pricing: { model: 'paid', plans: [{ id: 'basic', name: 'Basic', price: 10, currency: 'USD', billingCycle: 'monthly', features: [] }] },
    rating: { overall: 4.4, criteria: { functionality: 4.6, easeOfUse: 4.2, valueForMoney: 4.1, performance: 4.5, support: 4.3 }, reviewCount: 3542 },
    status: 'active',
    lastUpdated: new Date('2025-06-21'),
    addedDate: new Date('2022-07-12'),
    seo: { title: '', description: '', keywords: [], ogImage: '' }
  },
  {
    id: 'cursor',
    slug: 'cursor',
    name: 'Cursor',
    tagline: 'The AI-first code editor',
    description: 'Cursor는 AI 기능이 내장된 차세대 코드 에디터입니다.',
    website: 'https://cursor.sh',
    logo: { url: '/images/logos/cursor.svg', alt: 'Cursor Logo', width: 48, height: 48 },
    category: 'coding',
    subcategories: ['code-generation'],
    tags: ['editor', 'ai-native'],
    targetAudience: ['developer'],
    features: [],
    integrations: [],
    platforms: ['desktop'],
    pricing: { model: 'freemium', plans: [{ id: 'hobby', name: 'Hobby', price: 0, currency: 'USD', billingCycle: 'monthly', features: [] }] },
    rating: { overall: 4.6, criteria: { functionality: 4.8, easeOfUse: 4.5, valueForMoney: 4.4, performance: 4.6, support: 4.3 }, reviewCount: 1284 },
    status: 'active',
    lastUpdated: new Date('2025-06-21'),
    addedDate: new Date('2023-08-20'),
    seo: { title: '', description: '', keywords: [], ogImage: '' }
  },
  {
    id: 'claude',
    slug: 'claude',
    name: 'Claude',
    tagline: 'Constitutional AI assistant',
    description: 'Claude는 Anthropic에서 개발한 AI 어시스턴트입니다.',
    website: 'https://claude.ai',
    logo: { url: '/images/logos/claude.svg', alt: 'Claude Logo', width: 48, height: 48 },
    category: 'writing',
    subcategories: ['content-writing'],
    tags: ['safety', 'analysis'],
    targetAudience: ['writer'],
    features: [],
    integrations: [],
    platforms: ['web'],
    pricing: { model: 'freemium', plans: [{ id: 'free', name: 'Free', price: 0, currency: 'USD', billingCycle: 'monthly', features: [] }] },
    rating: { overall: 4.3, criteria: { functionality: 4.4, easeOfUse: 4.2, valueForMoney: 4.1, performance: 4.5, support: 4.2 }, reviewCount: 3291 },
    status: 'active',
    lastUpdated: new Date('2025-06-21'),
    addedDate: new Date('2023-03-14'),
    seo: { title: '', description: '', keywords: [], ogImage: '' }
  },
  {
    id: 'v0-dev',
    slug: 'v0-dev',
    name: 'v0.dev',
    tagline: 'Generate UI with simple text prompts',
    description: 'v0.dev는 Vercel에서 개발한 AI 기반 UI 생성 도구입니다.',
    website: 'https://v0.dev',
    logo: { url: '/images/logos/v0.svg', alt: 'v0.dev Logo', width: 48, height: 48 },
    category: 'coding',
    subcategories: ['code-generation'],
    tags: ['react', 'ui-generation'],
    targetAudience: ['developer'],
    features: [],
    integrations: [],
    platforms: ['web'],
    pricing: { model: 'freemium', plans: [{ id: 'free', name: 'Free', price: 0, currency: 'USD', billingCycle: 'monthly', features: [] }] },
    rating: { overall: 4.5, criteria: { functionality: 4.4, easeOfUse: 4.7, valueForMoney: 4.3, performance: 4.6, support: 4.2 }, reviewCount: 567 },
    status: 'beta',
    lastUpdated: new Date('2025-06-21'),
    addedDate: new Date('2023-11-01'),
    seo: { title: '', description: '', keywords: [], ogImage: '' }
  }
];

// 카테고리 매핑
const categoryMap: { [key: string]: string } = {
  'coding': '코딩',
  'design': '디자인',
  'writing': '글쓰기',
  'analysis': '분석',
  'productivity': '생산성',
  'learning': '학습'
};

export function FeaturedTools() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    
    const loadPopularTools = async () => {
      try {
        // API 호출 시도
        const response = await fetch('/api/tools');
        if (isMounted) {
          if (response.ok) {
            const data = await response.json();
            const allTools = data.data?.tools || [];
            // 평점 순으로 정렬하여 상위 6개 선택
            const sortedTools = allTools
              .sort((a: AITool, b: AITool) => b.rating.overall - a.rating.overall)
              .slice(0, 6);
            setTools(sortedTools.length > 0 ? sortedTools : staticPopularTools);
          } else {
            // API 실패시 정적 데이터 사용
            setTools(staticPopularTools);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load popular tools:', error);
        if (isMounted) {
          // 오류시 정적 데이터 사용
          setTools(staticPopularTools);
          setLoading(false);
        }
      }
    };

    loadPopularTools();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFavorite = (toolId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(toolId)) {
      newFavorites.delete(toolId);
    } else {
      newFavorites.add(toolId);
    }
    setFavorites(newFavorites);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">인기 도구를 불러오는데 실패했습니다.</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {tools.map((tool) => {
        const isFavorite = favorites.has(tool.id);
        const pricingText = tool.pricing.model === 'free' 
          ? '무료' 
          : tool.pricing.plans && tool.pricing.plans.length > 0 
            ? `${tool.pricing.plans[0].price}/${tool.pricing.plans[0].billingCycle === 'monthly' ? '월' : '년'}`
            : '가격 문의';

        return (
          <Card key={tool.id} hoverable className="group cursor-pointer h-full">
            <Link href={`/tools/${tool.slug}`} className="block h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    {tool.logo?.url ? (
                      <Image
                        src={tool.logo.url}
                        alt={tool.logo.alt || `${tool.name} Logo`}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          // 이미지 로드 실패 시 fallback으로 이모지 사용
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                          if (target.nextElementSibling) {
                            (target.nextElementSibling as HTMLElement).style.display = 'block';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className="text-4xl"
                      style={{ display: tool.logo?.url ? 'none' : 'block' }}
                    >
                      {getToolIcon(tool.category)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="flex items-center text-sm text-yellow-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      {tool.rating.overall.toFixed(1)}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                  {tool.name}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {tool.tagline}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {categoryMap[tool.category] || tool.category}
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {pricingText}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(tool.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(tool.website, '_blank');
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
