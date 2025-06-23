import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import ToolDetailView from '@/components/features/ToolDetailView';
import type { AITool } from '@/types/tool';

interface Props {
  params: { slug: string };
}

// 모든 도구를 불러와서 slug로 찾기
async function getToolBySlug(slug: string): Promise<AITool | null> {
  try {
    const toolCategories = ['coding', 'design', 'writing', 'analysis', 'learning', 'productivity'];
    
    for (const category of toolCategories) {
      try {
        const filePath = join(process.cwd(), 'src/data/tools', `${category}.json`);
        const fileContent = readFileSync(filePath, 'utf-8');
        const toolsData = JSON.parse(fileContent);
        
        if (toolsData.tools && Array.isArray(toolsData.tools)) {
          const tool = toolsData.tools.find((t: AITool) => t.slug === slug);
          if (tool) {
            return tool;
          }
        }
      } catch (error) {
        console.error(`카테고리 ${category} 로드 실패:`, error);
      }
    }
    
    return null;
  } catch (error) {
    console.error('도구 검색 실패:', error);
    return null;
  }
}

// 관련 도구 찾기 (같은 카테고리에서 최대 3개)
async function getRelatedTools(tool: AITool): Promise<AITool[]> {
  try {
    const filePath = join(process.cwd(), 'src/data/tools', `${tool.category}.json`);
    const fileContent = readFileSync(filePath, 'utf-8');
    const toolsData = JSON.parse(fileContent);
    
    if (toolsData.tools && Array.isArray(toolsData.tools)) {
      return toolsData.tools
        .filter((t: AITool) => t.id !== tool.id)
        .slice(0, 3);
    }
    
    return [];
  } catch (error) {
    console.error('관련 도구 로드 실패:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug);
  
  if (!tool) {
    return {
      title: '도구를 찾을 수 없음 | AI Tools Curator',
      description: '요청하신 AI 도구를 찾을 수 없습니다.',
    };
  }
  
  return {
    title: `${tool.name} 리뷰 - ${tool.tagline} | AI Tools Curator`,
    description: tool.description.slice(0, 160),
    keywords: [tool.name, ...tool.tags, tool.category, 'AI 도구', '리뷰'],
    openGraph: {
      title: `${tool.name} - ${tool.tagline}`,
      description: tool.description.slice(0, 160),
      images: tool.seo.ogImage ? [tool.seo.ogImage] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - ${tool.tagline}`,
      description: tool.description.slice(0, 160),
      images: tool.seo.ogImage ? [tool.seo.ogImage] : [],
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  
  if (!tool) {
    notFound();
  }
  
  const relatedTools = await getRelatedTools(tool);
  
  return (
    <ToolDetailView 
      tool={tool} 
      relatedTools={relatedTools} 
    />
  );
}

// 정적 경로 생성 (선택사항 - 빌드 시 모든 도구 페이지를 미리 생성)
export async function generateStaticParams() {
  try {
    const toolCategories = ['coding', 'design', 'writing', 'analysis', 'learning', 'productivity'];
    const slugs: string[] = [];
    
    for (const category of toolCategories) {
      try {
        const filePath = join(process.cwd(), 'src/data/tools', `${category}.json`);
        const fileContent = readFileSync(filePath, 'utf-8');
        const toolsData = JSON.parse(fileContent);
        
        if (toolsData.tools && Array.isArray(toolsData.tools)) {
          toolsData.tools.forEach((tool: AITool) => {
            slugs.push(tool.slug);
          });
        }
      } catch (error) {
        console.error(`카테고리 ${category} 로드 실패:`, error);
      }
    }
    
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('정적 경로 생성 실패:', error);
    return [];
  }
}
