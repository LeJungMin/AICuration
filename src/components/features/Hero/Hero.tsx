'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 메인 헤딩 */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            개발자를 위한{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              AI 도구 큐레이션
            </span>
          </h1>
          
          {/* 서브 텍스트 */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            프론트엔드 개발자가 직접 검증한 AI 도구들을 발견하고,
            <br className="hidden md:block" />
            비교하고, 최적의 조합을 찾아보세요
          </p>
          
          {/* 검색바 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="AI 도구를 검색해보세요... (예: GitHub Copilot, ChatGPT)"
                className="input pl-10 pr-4 py-4 w-full text-lg"
              />
            </div>
          </div>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tools">
              <Button size="lg" className="w-full sm:w-auto">
                도구 탐색하기
              </Button>
            </Link>
            <Link href="/combinations">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                추천 조합 보기
              </Button>
            </Link>
          </div>
          
          {/* 통계 정보 */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                검증된 AI 도구
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                8
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                주요 카테고리
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                10+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                추천 조합
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary-200 to-primary-200 opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
}
