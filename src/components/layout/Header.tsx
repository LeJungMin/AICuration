'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              AI Tools Curator
            </span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/tools" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              도구 탐색
            </Link>
            <Link 
              href="/combinations" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              추천 조합
            </Link>
          </nav>

          {/* 테마 토글 */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
