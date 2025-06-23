import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  _request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    console.log(`[API] /api/tools/${category} - 도구 목록 요청`);
    
    // 유효한 카테고리 목록
    const validCategories = [
      'coding', 'design', 'writing', 
      'analysis', 'learning', 'productivity'
    ];
    
    if (!validCategories.includes(category)) {
      console.error(`[API] /api/tools/${category} - 유효하지 않은 카테고리`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid Category',
          message: `Category '${category}' not found`
        },
        { status: 404 }
      );
    }
    
    // 파일 경로 확인
    const filePath = join(process.cwd(), 'src/data/tools', `${category}.json`);
    
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      const toolsData = JSON.parse(fileContent);
      
      // JSON 파일에서 tools 배열 추출
      const tools = toolsData.tools || [];
      
      console.log(`[API] /api/tools/${category} - ${tools.length}개 도구 반환`);
      
      return NextResponse.json({
        success: true,
        data: {
          tools: tools,
          category: category,
          metadata: {
            version: toolsData.version,
            lastUpdated: toolsData.lastUpdated
          }
        },
        category: category,
        count: tools.length,
        timestamp: new Date().toISOString()
      });
    } catch (fileError) {
      console.error(`[API] /api/tools/${category} - 파일 읽기 오류:`, fileError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'File Not Found',
          message: `Tools data for category '${category}' not found`
        },
        { status: 404 }
      );
    }
    
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
