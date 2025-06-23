import { Hero } from '@/components/features/Hero';
import { CategoryGrid } from '@/components/features/CategoryGrid';
import { FeaturedTools } from '@/components/features/FeaturedTools';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* 히어로 섹션 */}
      <Hero />
      
      {/* 카테고리 그리드 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              카테고리별 AI 도구 탐색
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              개발, 디자인, 글쓰기 등 다양한 분야의 AI 도구를 쉽게 찾아보세요
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>
      
      {/* 추천 도구 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              인기 AI 도구
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              개발자들이 가장 많이 사용하는 검증된 AI 도구들
            </p>
          </div>
          <FeaturedTools />
        </div>
      </section>
    </main>
  );
}
