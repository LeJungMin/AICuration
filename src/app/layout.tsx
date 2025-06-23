import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'AI Tools Curator | 개발자를 위한 AI 도구 큐레이션',
    template: '%s | AI Tools Curator',
  },
  description: 
    '프론트엔드 개발자가 엄선한 AI 도구 큐레이션 플랫폼. 코딩, 디자인, 글쓰기에 도움되는 AI 도구를 발견하고 비교해보세요.',
  keywords: [
    'AI 도구', 
    '개발자 도구', 
    'ChatGPT', 
    'GitHub Copilot', 
    '프론트엔드', 
    '생산성',
    'AI tools',
    'developer tools',
    'productivity'
  ],
  authors: [{ name: 'AI Tools Curator Team' }],
  creator: 'AI Tools Curator',
  publisher: 'AI Tools Curator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://ai-tools-curator.vercel.app',
    siteName: 'AI Tools Curator',
    title: 'AI Tools Curator | 개발자를 위한 AI 도구 큐레이션',
    description: 
      '프론트엔드 개발자가 엄선한 AI 도구 큐레이션 플랫폼. 코딩, 디자인, 글쓰기에 도움되는 AI 도구를 발견하고 비교해보세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Tools Curator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Curator | 개발자를 위한 AI 도구 큐레이션',
    description: 
      '프론트엔드 개발자가 엄선한 AI 도구 큐레이션 플랫폼. 코딩, 디자인, 글쓰기에 도움되는 AI 도구를 발견하고 비교해보세요.',
    images: ['/images/og-image.png'],
  },
  verification: {
    google: 'google-verification-code', // 실제 배포 시 설정
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
