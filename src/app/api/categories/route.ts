import { NextResponse } from 'next/server';
import categoriesData from '@/data/categories.json';

export async function GET() {
  try {
    console.log('[API] /api/categories - 카테고리 목록 요청');
    
    return NextResponse.json({
      success: true,
      data: categoriesData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[API] /api/categories - 오류 발생:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'Failed to fetch categories'
      },
      { status: 500 }
    );
  }
}
