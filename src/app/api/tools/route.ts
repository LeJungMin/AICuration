import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { AITool, Category } from '@/types/tool';

interface ToolsApiResponse {
  success: boolean;
  data: {
    tools: AITool[];
    categories: Category[];
    totalCount: number;
    categoryCounts: Record<string, number>;
  };
  filters?: {
    applied: any;
    available: {
      categories: Category[];
      platforms: string[];
      pricing: string[];
      tags: string[];
    };
  };
  timestamp: string;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const pricing = url.searchParams.get('pricing');
    const platform = url.searchParams.get('platform');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    console.log(`[API] /api/tools - 도구 목록 요청`, {
      category, pricing, platform, search, limit, offset
    });

    // 카테고리 데이터 로드
    const categoriesPath = join(process.cwd(), 'src/data/categories.json');
    const categoriesData = JSON.parse(readFileSync(categoriesPath, 'utf-8'));
    const categories: Category[] = categoriesData.categories;

    // 모든 도구 데이터 로드
    const toolCategories = ['coding', 'design', 'writing', 'analysis', 'learning', 'productivity'];
    let allTools: AITool[] = [];
    const categoryCounts: Record<string, number> = {};

    for (const cat of toolCategories) {
      try {
        const filePath = join(process.cwd(), 'src/data/tools', `${cat}.json`);
        const fileContent = readFileSync(filePath, 'utf-8');
        const toolsData = JSON.parse(fileContent);
        
        if (toolsData.tools && Array.isArray(toolsData.tools)) {
          allTools = [...allTools, ...toolsData.tools];
          categoryCounts[cat] = toolsData.tools.length;
        }
      } catch (error) {
        console.error(`[API] 카테고리 ${cat} 로드 실패:`, error);
        categoryCounts[cat] = 0;
      }
    }

    // 필터링 적용
    let filteredTools = allTools;

    if (category) {
      filteredTools = filteredTools.filter(tool => tool.category === category);
    }

    if (pricing) {
      filteredTools = filteredTools.filter(tool => tool.pricing.model === pricing);
    }

    if (platform) {
      filteredTools = filteredTools.filter(tool => 
        tool.platforms.includes(platform as any)
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredTools = filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // 페이지네이션 적용
    const paginatedTools = filteredTools.slice(offset, offset + limit);

    // 필터 옵션 생성
    const availablePlatforms = [...new Set(allTools.flatMap(tool => tool.platforms))];
    const availablePricing = [...new Set(allTools.map(tool => tool.pricing.model))];
    const availableTags = [...new Set(allTools.flatMap(tool => tool.tags))];

    const response: ToolsApiResponse = {
      success: true,
      data: {
        tools: paginatedTools,
        categories,
        totalCount: filteredTools.length,
        categoryCounts
      },
      filters: {
        applied: { category, pricing, platform, search },
        available: {
          categories,
          platforms: availablePlatforms,
          pricing: availablePricing,
          tags: availableTags
        }
      },
      timestamp: new Date().toISOString()
    };

    console.log(`[API] /api/tools - ${paginatedTools.length}개 도구 반환 (총 ${filteredTools.length}개 중)`);

    return NextResponse.json(response);

  } catch (error) {
    console.error(`[API] /api/tools - 오류 발생:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to fetch tools'
      },
      { status: 500 }
    );
  }
}
