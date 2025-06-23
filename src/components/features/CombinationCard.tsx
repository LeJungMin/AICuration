'use client';

import Link from 'next/link';
import { ToolCombination } from '@/types/tool';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';

interface CombinationCardProps {
  combination: ToolCombination;
  className?: string;
}

// 난이도 색상 매핑
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

// 카테고리 이모지 매핑
const categoryEmojis = {
  'startup-mvp': '🚀',
  'enterprise': '🏢',
  'personal': '👨‍💻',
  'learning': '📚',
  'freelance': '💼'
};

export default function CombinationCard({ combination, className = '' }: CombinationCardProps) {
  const estimatedTime = combination.workflow.reduce((total, step) => {
    // 시간 문자열에서 숫자 추출 (예: "1-2주" -> 1.5주)
    const timeMatch = step.estimatedTime?.match(/(\d+)(-(\d+))?/);
    if (timeMatch && timeMatch[1]) {
      const min = parseInt(timeMatch[1]);
      const max = timeMatch[3] ? parseInt(timeMatch[3]) : min;
      return total + (min + max) / 2;
    }
    return total;
  }, 0);

  return (
    <Link href={`/combinations/${combination.id}`}>
      <div className={`
        group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 
        hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg 
        transition-all duration-300 cursor-pointer p-6 h-full
        ${className}
      `}>
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {categoryEmojis[combination.category as keyof typeof categoryEmojis] || '🔧'}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {combination.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  difficultyColors[combination.difficulty]
                }`}>
                  {combination.difficulty === 'beginner' ? '초급' : 
                   combination.difficulty === 'intermediate' ? '중급' : '고급'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {combination.description}
        </p>

        {/* 주요 도구들 */}
        <div className="mb-4">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            주요 도구
          </div>
          <div className="flex flex-wrap gap-1">
            {combination.tools.primary.slice(0, 4).map((toolId) => (
              <span
                key={toolId}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
              >
                {toolId}
              </span>
            ))}
            {combination.tools.primary.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                +{combination.tools.primary.length - 4}개
              </span>
            )}
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{Math.round(estimatedTime)}주</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>${combination.budget.minimum}+/월</span>
          </div>
        </div>

        {/* 장점 미리보기 */}
        <div className="space-y-1 mb-4">
          {combination.pros.slice(0, 2).map((pro, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="truncate">{pro}</span>
            </div>
          ))}
          {combination.pros.length > 2 && (
            <div className="text-xs text-gray-500 dark:text-gray-500">
              +{combination.pros.length - 2}개 장점 더보기
            </div>
          )}
        </div>

        {/* 사용 사례 */}
        <div className="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="font-medium mb-1">사용 사례</div>
          <div className="line-clamp-2">{combination.useCase}</div>
        </div>

        {/* 호버 효과 */}
        <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            자세히 보기 →
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <TrendingUp className="w-3 h-3" />
            <span>{combination.workflow.length}단계</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
