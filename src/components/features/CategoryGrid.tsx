'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Code2, Palette, PenTool, BarChart3, Zap, GraduationCap } from 'lucide-react';
import type { Category } from '@/types/tool';

// 정적 카테고리 데이터 (fallback용)
const staticCategories: Category[] = [
  {
    id: 'coding',
    name: '코딩 도구',
    slug: 'coding',
    description: '코드 작성, 디버깅, 리팩토링을 도와주는 AI 도구들',
    icon: 'Code2',
    color: '#3B82F6',
    subcategories: [],
    toolCount: 5
  },
  {
    id: 'design',
    name: '디자인 도구',
    slug: 'design',
    description: 'UI/UX 디자인, 이미지 생성, 프로토타이핑 AI 도구들',
    icon: 'Palette',
    color: '#8B5CF6',
    subcategories: [],
    toolCount: 5
  },
  {
    id: 'writing',
    name: '글쓰기 도구',
    slug: 'writing',
    description: '텍스트 생성, 편집, 번역을 도와주는 AI 도구들',
    icon: 'PenTool',
    color: '#10B981',
    subcategories: [],
    toolCount: 5
  },
  {
    id: 'analysis',
    name: '분석 도구',
    slug: 'analysis',
    description: '데이터 분석, 차트 생성, 인사이트 도출 AI 도구들',
    icon: 'BarChart3',
    color: '#F59E0B',
    subcategories: [],
    toolCount: 3
  },
  {
    id: 'productivity',
    name: '생산성 도구',
    slug: 'productivity',
    description: '업무 자동화, 일정 관리, 프로젝트 관리 AI 도구들',
    icon: 'Zap',
    color: '#EF4444',
    subcategories: [],
    toolCount: 4
  },
  {
    id: 'learning',
    name: '학습 도구',
    slug: 'learning',
    description: '교육, 연구, 지식 습득을 도와주는 AI 도구들',
    icon: 'GraduationCap',
    color: '#6366F1',
    subcategories: [],
    toolCount: 5
  }
];

// Lucide React 아이콘 매핑
const iconComponentMap: { [key: string]: any } = {
  'coding': Code2,
  'design': Palette, 
  'writing': PenTool,
  'analysis': BarChart3,
  'productivity': Zap,
  'learning': GraduationCap
};

// Fallback 이모지 매핑
const iconEmojiMap: { [key: string]: string } = {
  'coding': '💻',
  'design': '🎨', 
  'writing': '✍️',
  'analysis': '📊',
  'productivity': '⚡',
  'learning': '🎓'
};

// 색상 매핑
const colorMap: { [key: string]: string } = {
  'coding': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'design': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'writing': 'bg-green-100 text-green-800 hover:bg-green-200',
  'analysis': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  'productivity': 'bg-red-100 text-red-800 hover:bg-red-200',
  'learning': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
};

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadCategories = async () => {
      try {
        // API 호출 시도
        const response = await fetch('/api/categories');
        if (isMounted) {
          if (response.ok) {
            const data = await response.json();
            setCategories(data.data?.categories || staticCategories);
          } else {
            // API 실패시 정적 데이터 사용
            setCategories(staticCategories);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        if (isMounted) {
          // 오류시 정적 데이터 사용
          setCategories(staticCategories);
          setLoading(false);
        }
      }
    };

    loadCategories();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">카테고리를 불러오는데 실패했습니다.</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/tools/category/${category.id}`}
          className="group"
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-200 group-hover:scale-105 group-hover:border-blue-300 dark:group-hover:border-blue-600 group-hover:shadow-lg min-h-[160px] flex flex-col justify-between">
            <div className="flex-1">
              <div className="flex justify-center items-center w-12 h-12 mx-auto mb-3">
                {(() => {
                  const IconComponent = iconComponentMap[category.id];
                  return IconComponent ? (
                    <IconComponent className="w-8 h-8 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  ) : (
                    <div className="text-4xl">
                      {iconEmojiMap[category.id] || '🔧'}
                    </div>
                  );
                })()} 
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm md:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {category.name}
              </h3>
            </div>
            <div className="mt-auto">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                colorMap[category.id] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } whitespace-nowrap`}>
                {category.toolCount}개 도구
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
