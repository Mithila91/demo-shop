/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  reactStrictMode: true,
  transpilePackages: [],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  outputFileTracingRoot: '/Users/macbook/Mithila/klarna-sparkle-shop',
  // Exclude studio from hot reloading to prevent constant rebuilds
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          ...(Array.isArray(config.watchOptions?.ignored) ? config.watchOptions.ignored : []),
          /app\/studio/,
          /sanity\.config\.ts/,
          /sanity\/schemas/
        ]
      }
    }
    return config
  },
}

export default nextConfig
