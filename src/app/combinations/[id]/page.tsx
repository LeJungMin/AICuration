import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadCombinations } from '@/lib/utils/data';
import { Clock, DollarSign, ArrowRight, CheckCircle, XCircle, Lightbulb, Target } from 'lucide-react';
import Link from 'next/link';

interface CombinationDetailPageProps {
  params: {
    id: string;
  };
}

// 정적 매개변수 생성 (SSG를 위해)
export async function generateStaticParams() {
  const combinations = await loadCombinations();
  
  return combinations.map((combination) => ({
    id: combination.id,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: CombinationDetailPageProps): Promise<Metadata> {
  const combinations = await loadCombinations();
  const combination = combinations.find(c => c.id === params.id);
  
  if (!combination) {
    return {
      title: '조합을 찾을 수 없습니다 | AI Tools Curator',
    };
  }

  return {
    title: `${combination.title} | AI Tools Curator`,
    description: combination.description,
    keywords: combination.tools.primary.join(', '),
  };
}

// 난이도 색상 매핑
const difficultyColors = {
  beginner: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  advanced: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
};

// 카테고리 이모지 매핑
const categoryEmojis = {
  'startup-mvp': '🚀',
  'enterprise': '🏢',
  'personal': '👨‍💻',
  'learning': '📚',
  'freelance': '💼'
};

export default async function CombinationDetailPage({ params }: CombinationDetailPageProps) {
  const combinations = await loadCombinations();
  const combination = combinations.find(c => c.id === params.id);
  
  if (!combination) {
    notFound();
  }

  const difficultyColor = difficultyColors[combination.difficulty];
  const estimatedWeeks = Math.ceil(
    combination.workflow.reduce((total, step) => {
      const timeMatch = step.estimatedTime?.match(/(\d+)(-\d+)?/);
      if (timeMatch && timeMatch[1]) {
        const min = parseInt(timeMatch[1]);
        return total + min;
      }
      return total;
    }, 0) / 7
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link href="/combinations" className="hover:text-blue-600 transition-colors">
              추천 조합
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span>{combination.title}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {categoryEmojis[combination.category as keyof typeof categoryEmojis] || '🔧'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {combination.title}
                </h1>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColor.bg} ${difficultyColor.text} ${difficultyColor.border}`}>
                    {combination.difficulty === 'beginner' ? '초급' :
                     combination.difficulty === 'intermediate' ? '중급' : '고급'}
                  </span>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>약 {estimatedWeeks}주</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span>${combination.budget.minimum}-${combination.budget.premium}/월</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 설명 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">개요</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {combination.description}
              </p>
            </div>

            {/* 워크플로우 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">작업 워크플로우</h2>
              <div className="space-y-4">
                {combination.workflow.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>예상 소요: {step.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 장단점 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  장점
                </h3>
                <ul className="space-y-2">
                  {combination.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  단점
                </h3>
                <ul className="space-y-2">
                  {combination.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 사용 사례 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                이런 분들에게 추천
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {combination.useCase}
                </p>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 도구 목록 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">필요한 도구들</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">핵심 도구</h4>
                  <div className="space-y-2">
                    {combination.tools.primary.map((toolId) => (
                      <div key={toolId} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          {toolId}
                        </span>
                        <Link 
                          href={`/tools/${toolId}`}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          보기
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                
                {combination.tools.optional.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">선택 도구</h4>
                    <div className="space-y-2">
                      {combination.tools.optional.map((toolId) => (
                        <div key={toolId} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {toolId}
                          </span>
                          <Link 
                            href={`/tools/${toolId}`}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            보기
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 예산 정보 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">예상 비용</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">최소 비용</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${combination.budget.minimum}/월
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">권장 비용</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${combination.budget.recommended}/월
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">프리미엄</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${combination.budget.premium}/월
                  </span>
                </div>
              </div>
            </div>

            {/* 팁 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                활용 팁
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• 무료 플랜부터 시작해서 필요에 따라 업그레이드하세요</li>
                <li>• 각 도구의 학습 곡선을 고려해 단계적으로 도입하세요</li>
                <li>• 팀원들과 함께 사용할 도구는 미리 교육 계획을 세우세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 관련 조합 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">관련 추천 조합</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combinations
              .filter(c => c.id !== combination.id)
              .slice(0, 3)
              .map((relatedCombination) => (
                <Link key={relatedCombination.id} href={`/combinations/${relatedCombination.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">
                        {categoryEmojis[relatedCombination.category as keyof typeof categoryEmojis] || '🔧'}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {relatedCombination.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {relatedCombination.description}
                    </p>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}
