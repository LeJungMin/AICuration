import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    console.log('[API] /api/combinations - 추천 조합 목록 요청');
    
    // 파일 경로 확인
    const filePath = join(process.cwd(), 'src/data/combinations.json');
    
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      const combinationsData = JSON.parse(fileContent);
      
      // JSON 파일에서 combinations 배열 추출
      const combinations = combinationsData.combinations || [];
      
      console.log(`[API] /api/combinations - ${combinations.length}개 조합 반환`);
      
      return NextResponse.json({
        success: true,
        data: {
          combinations: combinations,
          metadata: {
            version: combinationsData.version,
            lastUpdated: combinationsData.lastUpdated,
            totalCount: combinations.length
          }
        },
        timestamp: new Date().toISOString()
      });
    } catch (fileError) {
      console.error('[API] /api/combinations - 파일 읽기 오류:', fileError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'File Not Found',
          message: 'Combinations data not found'
        },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('[API] /api/combinations - 오류 발생:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to fetch combinations'
      },
      { status: 500 }
    );
  }
}
