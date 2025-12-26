/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add critical module rules to prevent Webpack from breaking on node_modules
    config.module.rules.push(
      {
        test: /\.wasm$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      }
    )

    // Exclude onnxruntime-web and @imgly files from Terser minification
    if (!isServer && config.optimization && config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options = minimizer.options || {}
          minimizer.options.exclude = /onnxruntime-web|@imgly\/background-removal/
        }
      })
    }

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
