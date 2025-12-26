/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle .wasm files as assets so Webpack doesn't try to parse them
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
