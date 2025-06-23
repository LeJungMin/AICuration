'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, ExternalLink, Users, DollarSign, Zap, Check, 
  ArrowLeft, Share2, Heart, Bookmark, Globe, 
  Monitor, Smartphone, Code, Terminal, Box 
} from 'lucide-react';
import ToolCard from './ToolCard';
import type { AITool } from '@/types/tool';

interface ToolDetailViewProps {
  tool: AITool;
  relatedTools: AITool[];
}

const ToolDetailView: React.FC<ToolDetailViewProps> = ({ tool, relatedTools }) => {
  const getPricingBadge = (model: string) => {
    const badges = {
      free: { text: '무료', color: 'bg-green-100 text-green-800 border-green-200' },
      freemium: { text: '부분무료', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      paid: { text: '유료', color: 'bg-orange-100 text-orange-800 border-orange-200' },
      enterprise: { text: '기업용', color: 'bg-purple-100 text-purple-800 border-purple-200' }
    };
    return badges[model as keyof typeof badges] || badges.paid;
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      web: Globe,
      desktop: Monitor,
      mobile: Smartphone,
      api: Code,
      extension: Box,
      cli: Terminal
    };
    return icons[platform as keyof typeof icons] || Box;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      coding: 'text-blue-600',
      design: 'text-purple-600',
      writing: 'text-green-600',
      analysis: 'text-yellow-600',
      productivity: 'text-red-600',
      learning: 'text-indigo-600'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600';
  };

  const pricingBadge = getPricingBadge(tool.pricing.model);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/tools"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
                홈
              </Link>
              <span className="mx-2">›</span>
              <Link href="/tools" className="hover:text-gray-700 dark:hover:text-gray-300">
                도구 탐색
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900 dark:text-white">{tool.name}</span>
            </nav>
          </div>

          {/* 도구 기본 정보 */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    {tool.logo?.url ? (
                      <img 
                        src={tool.logo.url} 
                        alt={tool.logo.alt}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <Zap className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {tool.name}
                    </h1>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${pricingBadge.color}`}>
                      {pricingBadge.text}
                    </span>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {tool.tagline}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {tool.rating.overall.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({tool.rating.reviewCount.toLocaleString()}개 리뷰)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{tool.targetAudience.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      웹사이트 방문
                    </a>
                    
                    <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    
                    <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    
                    <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 사이드바 정보 */}
            <div className="lg:w-80">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  기본 정보
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">카테고리</span>
                    <p className={`font-medium ${getCategoryColor(tool.category)}`}>
                      {tool.category}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">플랫폼</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tool.platforms.map((platform) => {
                        const Icon = getPlatformIcon(platform);
                        return (
                          <div key={platform} className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-600 rounded text-xs">
                            <Icon className="w-3 h-3" />
                            <span>{platform}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">가격 모델</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tool.pricing.model}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">마지막 업데이트</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(tool.lastUpdated).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            {/* 설명 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                도구 소개
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {tool.description}
              </p>
            </section>

            {/* 주요 기능 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                주요 기능
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.features.map((feature) => (
                  <div key={feature.id} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {feature.name}
                      </h3>
                      {feature.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 가격 계획 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                가격 계획
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tool.pricing.plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`p-6 bg-white dark:bg-gray-800 rounded-lg border-2 ${
                      plan.isPopular 
                        ? 'border-blue-500 ring-2 ring-blue-100' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full mb-3 inline-block">
                        추천
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{plan.billingCycle === 'monthly' ? '월' : '년'}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-2 px-4 rounded-lg transition-colors ${
                        plan.isPopular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      시작하기
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* 통합 */}
            {tool.integrations.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  지원 통합
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {tool.integrations.map((integration) => (
                    <div key={integration.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {integration.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        integration.type === 'official' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {integration.type}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 태그 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                태그
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* 사이드바 */}
          <div className="lg:w-80">
            {/* 관련 도구 */}
            {relatedTools.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  관련 도구
                </h3>
                <div className="space-y-4">
                  {relatedTools.map((relatedTool) => (
                    <ToolCard 
                      key={relatedTool.id}
                      tool={relatedTool}
                      className="transform scale-95"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ToolDetailView;
