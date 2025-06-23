/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'lodash'],
    scrollRestoration: true,
  },
  
  // 성능 최적화
  compress: true,
  
  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1주일
  },
  
  // 번들 분석 (ANALYZE=true 환경변수로 활성화)
  webpack: (config, { dev, isServer }) => {
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')({
        enabled: true,
      });
    }
    
    // 프로덕션 최적화
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
          },
        },
      };
    }
    
    return config;
  },
  
  // PWA 지원을 위한 설정 (향후 추가)
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
