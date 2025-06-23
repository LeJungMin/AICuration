'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { useState } from 'react';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  // 일시적으로 React Query 비활성화
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           // 기본 stale time: 5분
  //           staleTime: 5 * 60 * 1000,
  //           // 백그라운드에서 자동 리페치 비활성화 (정적 데이터이므로)
  //           refetchOnWindowFocus: false,
  //           refetchOnMount: false,
  //           refetchOnReconnect: false,
  //           // 에러 재시도
  //           retry: (failureCount, error) => {
  //             // 404 에러는 재시도하지 않음
  //             if (error instanceof Error && error.message.includes('404')) {
  //               return false;
  //             }
  //             return failureCount < 3;
  //           },
  //         },
  //       },
  //     })
  // );

  return (
    // <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        {/* {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
      </ThemeProvider>
    // </QueryClientProvider>
  );
}
