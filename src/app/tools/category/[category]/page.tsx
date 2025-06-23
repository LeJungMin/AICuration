import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import ToolsList from '@/components/features/ToolsList';
import type { AITool, Category } from '@/types/tool';

interface Props {
  params: { category: string };
}

// 카테고리 정보 가져오기
async function getCategoryInfo(categorySlug: string): Promise<Category | null> {
  try {
    const categoriesPath = join(process.cwd(), 'src/data/categories.json');
    const categoriesData = JSON.parse(readFileSync(categoriesPath, 'utf-8'));
    
    return categoriesData.categories.find((cat: Category) => cat.slug === categorySlug) || null;
  } catch (error) {
    console.error('카테고리 정보 로드 실패:', error);
    return null;
  }
}

// 카테고리별 도구 가져오기
async function getToolsByCategory(categorySlug: string): Promise<AITool[]> {
  try {
    const filePath = join(process.cwd(), 'src/data/tools', `${categorySlug}.json`);
    const fileContent = readFileSync(filePath, 'utf-8');
    const toolsData = JSON.parse(fileContent);
    
    return toolsData.tools || [];
  } catch (error) {
    console.error(`카테고리 ${categorySlug} 도구 로드 실패:`, error);
    return [];
  }
}

// 모든 카테고리 정보 가져오기
async function getAllCategories(): Promise<Category[]> {
  try {
    const categoriesPath = join(process.cwd(), 'src/data/categories.json');
    const categoriesData = JSON.parse(readFileSync(categoriesPath, 'utf-8'));
    
    return categoriesData.categories || [];
  } catch (error) {
    console.error('전체 카테고리 로드 실패:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryInfo(params.category);
  
  if (!category) {
    return {
      title: '카테고리를 찾을 수 없음 | AI Tools Curator',
      description: '요청하신 카테고리를 찾을 수 없습니다.',
    };
  }
  
  return {
    title: `${category.name} AI 도구 모음 | AI Tools Curator`,
    description: `${category.description} ${category.toolCount}개의 검증된 AI 도구를 탐색하고 비교해보세요.`,
    keywords: [category.name, ...category.subcategories.map(sub => sub.name), 'AI 도구', '인공지능'],
    openGraph: {
      title: `${category.name} AI 도구 모음`,
      description: category.description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const [category, tools, allCategories] = await Promise.all([
    getCategoryInfo(params.category),
    getToolsByCategory(params.category),
    getAllCategories()
  ]);
  
  if (!category) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 카테고리 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl"
              style={{ backgroundColor: category.color }}
            >
              {/* 아이콘은 실제 Lucide 아이콘으로 대체 필요 */}
              <span>{category.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {category.description}
              </p>
            </div>
          </div>
          
          {/* 서브 카테고리 */}
          {category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {category.subcategories.map((subcategory) => (
                <div 
                  key={subcategory.id}
                  className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                    {subcategory.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {subcategory.description}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              {tools.length.toLocaleString()}개의 {category.name} 도구를 찾았습니다
            </p>
            
            {/* 다른 카테고리 탐색 */}
            <div className="flex gap-2">
              {allCategories
                .filter(cat => cat.id !== category.id)
                .slice(0, 3)
                .map((otherCategory) => (
                  <a
                    key={otherCategory.id}
                    href={`/tools/category/${otherCategory.slug}`}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {otherCategory.name}
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* 도구 목록 */}
        <ToolsList 
          initialTools={tools}
          categories={allCategories}
          totalCount={tools.length}
          filters={{
            applied: { category: params.category },
            available: {
              categories: allCategories,
              platforms: [...new Set(tools.flatMap(tool => tool.platforms))],
              pricing: [...new Set(tools.map(tool => tool.pricing.model))],
              tags: [...new Set(tools.flatMap(tool => tool.tags))]
            }
          }}
        />
      </div>
    </main>
  );
}

// 정적 경로 생성
export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    
    return categories.map((category) => ({
      category: category.slug,
    }));
  } catch (error) {
    console.error('정적 경로 생성 실패:', error);
    return [];
  }
}
