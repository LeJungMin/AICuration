'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ToolCard from './ToolCard';
import type { AITool, Category } from '@/types/tool';

interface ToolsListProps {
  initialTools: AITool[];
  categories: Category[];
  totalCount: number;
  filters?: {
    applied: any;
    available: {
      categories: Category[];
      platforms: string[];
      pricing: string[];
      tags: string[];
    };
  };
}

const ToolsList: React.FC<ToolsListProps> = ({ 
  initialTools, 
  categories, 
  totalCount,
  filters 
}) => {
  const [tools, setTools] = useState<AITool[]>(initialTools);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPricing, setSelectedPricing] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // 필터 적용
  const applyFilters = async () => {
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedPricing) params.append('pricing', selectedPricing);
      if (selectedPlatform) params.append('platform', selectedPlatform);

      const response = await fetch(`/api/tools?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setTools(data.data.tools);
        console.log(`필터 적용 완료: ${data.data.tools.length}개 도구`);
      }
    } catch (error) {
      console.error('필터 적용 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 디바운스된 검색
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, selectedPricing, selectedPlatform]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedPricing('');
    setSelectedPlatform('');
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 헤더 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색바 */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="도구 이름, 설명, 태그로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 필터 토글 및 뷰 모드 */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-lg border transition-colors flex items-center gap-2 ${
              showFilters 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">필터</span>
          </button>
          
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2.5 ${
                viewMode === 'grid' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2.5 border-l border-gray-300 dark:border-gray-600 ${
                viewMode === 'list' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 필터 패널 */}
      {showFilters && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 카테고리 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                카테고리
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="">모든 카테고리</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 가격 모델 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                가격
              </label>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="">모든 가격</option>
                <option value="free">무료</option>
                <option value="freemium">부분 무료</option>
                <option value="paid">유료</option>
                <option value="enterprise">기업용</option>
              </select>
            </div>

            {/* 플랫폼 필터 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                플랫폼
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="">모든 플랫폼</option>
                {filters?.available.platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            {/* 초기화 버튼 */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 결과 헤더 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {loading ? (
            <span>검색 중...</span>
          ) : (
            <span>총 {tools.length.toLocaleString()}개의 도구</span>
          )}
        </div>
      </div>

      {/* 도구 목록 */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64"></div>
            </div>
          ))}
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            다른 검색어나 필터를 시도해보세요.
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {tools.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              showCategory={!selectedCategory}
              className={viewMode === 'list' ? 'max-w-none' : ''}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsList;
