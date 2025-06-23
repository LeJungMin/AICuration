import { Metadata } from 'next';
import ToolsList from '@/components/features/ToolsList';

export const metadata: Metadata = {
  title: 'AI 도구 탐색 | AI Tools Curator',
  description: '카테고리별로 분류된 AI 도구들을 탐색하고 비교해보세요. 코딩, 디자인, 글쓰기, 분석 등 다양한 분야의 AI 도구를 한 곳에서 확인하세요.',
  keywords: ['AI 도구', '인공지능', '프로그래밍', '디자인', '생산성', '자동화'],
};

// 서버 컴포넌트에서 데이터 페칭
async function getToolsData() {
  try {
    // 개발 환경에서는 localhost 사용
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-tools-curator.vercel.app';
    
    const response = await fetch(`${baseUrl}/api/tools`, {
      next: { revalidate: 300 } // 5분마다 재검증
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tools: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch tools');
    }

    return data.data;
  } catch (error) {
    console.error('도구 데이터 로드 실패:', error);
    
    // 폴백: 로컬 파일에서 직접 읽기
    try {
      const { readFileSync } = await import('fs');
      const { join } = await import('path');
      
      // 카테고리 데이터
      const categoriesPath = join(process.cwd(), 'src/data/categories.json');
      const categoriesData = JSON.parse(readFileSync(categoriesPath, 'utf-8'));
      
      // 모든 도구 데이터
      const toolCategories = ['coding', 'design', 'writing', 'analysis', 'learning', 'productivity'];
      let allTools: any[] = [];
      
      for (const cat of toolCategories) {
        try {
          const filePath = join(process.cwd(), 'src/data/tools', `${cat}.json`);
          const fileContent = readFileSync(filePath, 'utf-8');
          const toolsData = JSON.parse(fileContent);
          
          if (toolsData.tools && Array.isArray(toolsData.tools)) {
            allTools = [...allTools, ...toolsData.tools];
          }
        } catch (catError) {
          console.error(`카테고리 ${cat} 로드 실패:`, catError);
        }
      }
      
      return {
        tools: allTools,
        categories: categoriesData.categories,
        totalCount: allTools.length,
        categoryCounts: {}
      };
    } catch (fallbackError) {
      console.error('폴백 데이터 로드도 실패:', fallbackError);
      return {
        tools: [],
        categories: [],
        totalCount: 0,
        categoryCounts: {}
      };
    }
  }
}

export default async function ToolsPage() {
  const toolsData = await getToolsData();

  if (!toolsData.tools || toolsData.tools.length === 0) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI 도구 탐색
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              도구 데이터를 불러오는 중 문제가 발생했습니다.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            AI 도구 탐색
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {toolsData.totalCount.toLocaleString()}개의 AI 도구를 탐색하고 비교해보세요. 
            카테고리별로 분류되어 있어 원하는 도구를 쉽게 찾을 수 있습니다.
          </p>
        </div>

        {/* 도구 목록 */}
        <ToolsList 
          initialTools={toolsData.tools}
          categories={toolsData.categories}
          totalCount={toolsData.totalCount}
          filters={{
            applied: {},
            available: {
              categories: toolsData.categories,
              platforms: [...new Set(toolsData.tools.flatMap((tool: any) => tool.platforms || []))].filter(Boolean) as string[],
              pricing: [...new Set(toolsData.tools.map((tool: any) => tool.pricing?.model).filter(Boolean))] as string[],
              tags: [...new Set(toolsData.tools.flatMap((tool: any) => tool.tags || []))].filter(Boolean) as string[]
            }
          }}
        />
      </div>
    </main>
  );
}
