/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Treat WASM files as assets, not code
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    })

    return config
  },

  experimental: {
    serverComponentsExternalPackages: [
      '@imgly/background-removal',
      'onnxruntime-web',
    ],
  },
}

export default nextConfig
