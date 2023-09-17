/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  webpack: (config, { defaultLoaders }) => {
    // clear cache
    defaultLoaders.babel.options.cache = false

    return config
  }
}
