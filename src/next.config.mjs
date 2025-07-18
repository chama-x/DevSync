/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable CSS-in-JS support for Tailwind v4
    turbo: {
      rules: {
        '*.css': {
          loaders: ['@tailwindcss/vite'],
        },
      },
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure CSS imports work correctly
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
};

export default nextConfig;
