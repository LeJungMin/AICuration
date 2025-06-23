'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ExternalLink, Users, DollarSign } from 'lucide-react';
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

interface ToolCardProps {
  tool: AITool;
  showCategory?: boolean;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  showCategory = false, 
  className = '' 
}) => {
  const getPricingBadge = (model: string) => {
    const badges = {
      free: { text: '무료', color: 'bg-green-100 text-green-800 border-green-200' },
      freemium: { text: '부분무료', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      paid: { text: '유료', color: 'bg-orange-100 text-orange-800 border-orange-200' },
      enterprise: { text: '기업용', color: 'bg-purple-100 text-purple-800 border-purple-200' }
    };
    return badges[model as keyof typeof badges] || badges.paid;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      coding: 'bg-blue-50 text-blue-700 border-blue-200',
      design: 'bg-purple-50 text-purple-700 border-purple-200',
      writing: 'bg-green-50 text-green-700 border-green-200',
      analysis: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      productivity: 'bg-red-50 text-red-700 border-red-200',
      learning: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const pricingBadge = getPricingBadge(tool.pricing.model);
  const categoryColor = getCategoryColor(tool.category);

  return (
    <div className={`group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      {/* 상단 배지들 - 겹침 없는 레이아웃으로 변경 */}
      <div className="relative p-3 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 flex-shrink-0">
            <div className="flex items-center justify-center w-fit">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${pricingBadge.color} text-center min-w-[60px]`}>
                {pricingBadge.text}
              </span>
            </div>
            {showCategory && (
              <div className="flex items-center justify-center w-fit">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${categoryColor} text-center min-w-[60px]`}>
                  {tool.category.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* 즐겨찾기 버튼 - 겹침 방지 */}
          <button 
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 flex-shrink-0 ml-2"
            onClick={(e) => {
              e.preventDefault();
              console.log(`즐겨찾기 토글: ${tool.name}`);
            }}
          >
            <Star className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* 로고 및 기본 정보 */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
              {/* 이미지 대신 도구별 이모지 또는 아이콘 사용 */}
              <div className="text-2xl">
                {tool.name === 'GitHub Copilot' ? '🤖' :
                 tool.name === 'ChatGPT' ? '🤖' :
                 tool.name === 'Midjourney' ? '🎨' :
                 tool.name === 'DALL-E 3' ? '🎨' :
                 tool.name === 'Claude' ? '🤖' :
                 tool.name === 'Cursor' ? '💻' :
                 tool.name === 'Tabnine' ? '💻' :
                 tool.name === 'Codeium' ? '💻' :
                 tool.name === 'v0.dev' ? '💻' :
                 tool.name === 'Figma AI' ? '🎨' :
                 tool.name === 'Stable Diffusion' ? '🎨' :
                 tool.name === 'Adobe Firefly' ? '🎨' :
                 tool.name === 'Grammarly' ? '✍️' :
                 tool.name === 'Notion AI' ? '✍️' :
                 tool.name === 'Jasper' ? '✍️' :
                 tool.name === 'Perplexity' ? '🔍' :
                 tool.name === 'Airtable AI' ? '📊' :
                 tool.name === 'Excel Copilot' || tool.name.includes('Excel') ? '📊' :
                 tool.name === 'Khanmigo' || tool.name.includes('Khan') ? '🎓' :
                 tool.name === 'Duolingo Max' ? '🎓' :
                 tool.name === 'Phind' ? '🔍' :
                 tool.name === 'Coursera Coach' ? '🎓' :
                 tool.name === 'Socratic' ? '🎓' :
                 tool.name === 'Zapier' ? '⚡' :
                 tool.name === 'Motion' ? '⚡' :
                 tool.name === 'Reclaim.ai' ? '⚡' :
                 tool.name.includes('monday') ? '⚡' : getToolIcon(tool.category)}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {tool.tagline}
            </p>
            {/* 평점 */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tool.rating.overall.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({tool.rating.reviewCount.toLocaleString()}개 리뷰)
              </span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{tool.targetAudience[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{tool.pricing.model}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link 
              href={`/tools/${tool.slug}`}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
