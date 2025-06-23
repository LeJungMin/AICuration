import { Metadata } from 'next';
import CombinationCard from '@/components/features/CombinationCard';
import { loadCombinations } from '@/lib/utils/data';
import { Search, Filter, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI 도구 추천 조합 | AI Tools Curator',
  description: '프로젝트 타입별로 최적화된 AI 도구 조합을 확인해보세요. 스타트업, 기업, 개인 프로젝트에 맞는 AI 도구 워크플로우를 제안합니다.',
};

export default async function CombinationsPage() {
  const combinations = await loadCombinations();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI 도구 추천 조합
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            프로젝트 타입과 팀 규모에 맞는 최적의 AI 도구 조합을 찾아보세요. 
            실제 사용 사례와 워크플로우를 기반으로 한 검증된 추천입니다.
          </p>
        </div>

        {/* 통계 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{combinations.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">검증된 조합</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">사용 시나리오</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">90%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">시간 절약</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">$0+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">최소 비용</div>
          </div>
        </div>

        {/* 카테고리 필터 (향후 구현) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Filter className="w-5 h-5" />
              <span className="font-medium">프로젝트 타입별 조합</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                🚀 스타트업 MVP
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                🏢 엔터프라이즈
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                👨‍💻 개인 프로젝트
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                📚 학습
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                💼 프리랜스
              </span>
            </div>
          </div>
        </div>

        {/* 조합 목록 */}
        {combinations.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              추천 조합이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              곧 다양한 AI 도구 조합을 추가할 예정입니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {combinations.map((combination) => (
              <CombinationCard 
                key={combination.id} 
                combination={combination}
                className="h-full"
              />
            ))}
          </div>
        )}

        {/* 추가 정보 섹션 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 맞춤형 조합 추천 받기
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              특별한 요구사항이나 프로젝트에 맞는 AI 도구 조합을 추천받고 싶으신가요?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                맞춤 상담 신청
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors">
                커뮤니티 참여
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
