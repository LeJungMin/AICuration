import { AITool, Category, ToolCombination } from '@/types/tool';

// 카테고리 데이터 로드
export async function loadCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories');
    if (response.ok) {
      const data = await response.json();
      return data.data?.categories || [];
    }
    
    // API가 없으면 직접 import (개발 환경)
    const categoriesData = await import('@/data/categories.json');
    return categoriesData.categories;
  } catch (error) {
    console.error('Failed to load categories:', error);
    // fallback - 직접 import
    try {
      const categoriesData = await import('@/data/categories.json');
      return categoriesData.categories;
    } catch (fallbackError) {
      console.error('Failed to load categories fallback:', fallbackError);
      return [];
    }
  }
}

// 특정 카테고리의 도구 데이터 로드
export async function loadToolsByCategory(category: string): Promise<AITool[]> {
  try {
    const response = await fetch(`/api/tools/${category}`);
    if (response.ok) {
      const data = await response.json();
      return transformToolsData(data.data?.tools || []);
    }
    
    // API가 없으면 직접 import (개발 환경)
    const toolsData = await import(`@/data/tools/${category}.json`);
    return transformToolsData(toolsData.tools || []);
  } catch (error) {
    console.error(`Failed to load tools for category ${category}:`, error);
    // fallback - 직접 import 다시 시도
    try {
      const toolsData = await import(`@/data/tools/${category}.json`);
      return transformToolsData(toolsData.tools || []);
    } catch (fallbackError) {
      console.error(`Failed to load tools fallback for category ${category}:`, fallbackError);
      return [];
    }
  }
}

// JSON 데이터를 AITool 타입으로 변환
// eslint-disable-next-line
function transformToolsData(rawTools: any[]): AITool[] {
  if (!rawTools || !Array.isArray(rawTools)) {
    console.warn('rawTools is not an array:', rawTools);
    return [];
  }
  
  return rawTools.map(tool => ({
    ...tool,
    lastUpdated: new Date(tool.lastUpdated),
    addedDate: new Date(tool.addedDate),
  }));
}

// 모든 도구 데이터 로드
export async function loadAllTools(): Promise<AITool[]> {
  try {
    const categories = await loadCategories();
    if (!categories || !Array.isArray(categories)) {
      console.error('Categories is not an array:', categories);
      return [];
    }
    
    const toolPromises = categories.map(cat => loadToolsByCategory(cat.id));
    const toolArrays = await Promise.all(toolPromises);
    
    return toolArrays.flat();
  } catch (error) {
    console.error('Failed to load all tools:', error);
    return [];
  }
}

// 추천 조합 데이터 로드
export async function loadCombinations(): Promise<ToolCombination[]> {
  try {
    const response = await fetch('/api/combinations');
    if (response.ok) {
      const data = await response.json();
      return transformCombinationsData(data.combinations);
    }
    
    // API가 없으면 직접 import (개발 환경)
    const combinationsData = await import('@/data/combinations.json');
    return transformCombinationsData(combinationsData.combinations);
  } catch (error) {
    console.error('Failed to load combinations:', error);
    try {
      const combinationsData = await import('@/data/combinations.json');
      return transformCombinationsData(combinationsData.combinations);
    } catch (fallbackError) {
      console.error('Failed to load combinations fallback:', fallbackError);
      return [];
    }
  }
}

// JSON 데이터를 ToolCombination 타입으로 되환
// eslint-disable-next-line
function transformCombinationsData(rawCombinations: any[]): ToolCombination[] {
  if (!rawCombinations || !Array.isArray(rawCombinations)) {
    console.warn('rawCombinations is not an array:', rawCombinations);
    return [];
  }
  
  return rawCombinations.map(combo => ({
    ...combo,
    metadata: {
      ...combo.metadata,
      createdAt: new Date(combo.metadata.createdAt),
      updatedAt: new Date(combo.metadata.updatedAt),
    }
  }));
}

// 특정 도구 검색
export async function findToolById(id: string): Promise<AITool | null> {
  try {
    const allTools = await loadAllTools();
    return allTools.find(tool => tool.id === id) || null;
  } catch (error) {
    console.error(`Failed to find tool with id ${id}:`, error);
    return null;
  }
}

// 검색 및 필터링
export async function searchTools(
  query: string,
  filters?: {
    categories?: string[];
    pricing?: string[];
    tags?: string[];
  }
): Promise<AITool[]> {
  try {
    const allTools = await loadAllTools();
    
    let filteredTools = allTools;
    
    // 카테고리 필터
    if (filters?.categories && filters.categories.length > 0) {
      filteredTools = filteredTools.filter(tool => 
        filters.categories!.includes(tool.category)
      );
    }
    
    // 가격 모델 필터
    if (filters?.pricing && filters.pricing.length > 0) {
      filteredTools = filteredTools.filter(tool => 
        filters.pricing!.includes(tool.pricing.model)
      );
    }
    
    // 태그 필터
    if (filters?.tags && filters.tags.length > 0) {
      filteredTools = filteredTools.filter(tool => 
        filters.tags!.some(tag => tool.tags.includes(tag))
      );
    }
    
    // 텍스트 검색
    if (query.trim()) {
      const searchQuery = query.toLowerCase();
      filteredTools = filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery) ||
        tool.tagline.toLowerCase().includes(searchQuery) ||
        tool.description.toLowerCase().includes(searchQuery) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    }
    
    return filteredTools;
  } catch (error) {
    console.error('Failed to search tools:', error);
    return [];
  }
}

// 인기 도구 가져오기 (평점 기준)
export async function getPopularTools(limit: number = 6): Promise<AITool[]> {
  try {
    const allTools = await loadAllTools();
    
    return allTools
      .sort((a, b) => b.rating.overall - a.rating.overall)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to get popular tools:', error);
    return [];
  }
}

// 카테고리별 대표 도구 가져오기
export async function getFeaturedToolsByCategory(): Promise<{ [category: string]: AITool[] }> {
  try {
    const categories = await loadCategories();
    const result: { [category: string]: AITool[] } = {};
    
    for (const category of categories) {
      const tools = await loadToolsByCategory(category.id);
      result[category.id] = tools
        .sort((a, b) => b.rating.overall - a.rating.overall)
        .slice(0, 3);
    }
    
    return result;
  } catch (error) {
    console.error('Failed to get featured tools by category:', error);
    return {};
  }
}