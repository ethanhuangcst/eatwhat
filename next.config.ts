import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 启用 React Compiler
  reactCompiler: true,

  // 图片域名配置（根据需要添加）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Turbopack 配置（空配置，使用默认设置）
  turbopack: {},

  // 自定义 Webpack 配置
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 客户端配置
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  // 环境变量
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '吃点啥',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
