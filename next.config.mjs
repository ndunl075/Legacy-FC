/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Enable WASM and async modules
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    // Treat WASM files as assets, not code
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    })

    // Handle .mjs files correctly to fix import.meta errors
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
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
