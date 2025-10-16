/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  reactStrictMode: true,
  transpilePackages: [],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Exclude studio from hot reloading to prevent constant rebuilds
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules',
          '**/app/studio/**',
          '**/sanity.config.ts',
          '**/sanity/schemas/**'
        ]
      }
      // Disable persistent caching in development to avoid cache file commits
      config.cache = false
    }
    return config
  },
}

export default nextConfig
