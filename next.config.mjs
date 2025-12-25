import CopyPlugin from 'copy-webpack-plugin'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle WASM files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    // Only run on client-side
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: join(__dirname, 'node_modules/@imgly/background-removal/dist'),
              to: join(__dirname, 'public/static/chunks/imgly'),
            },
          ],
        })
      )

      // Add rule to treat onnxruntime files as assets
      config.module.rules.push({
        test: /ort.*\.mjs$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/chunks/[name][ext]',
        },
      })

      // Prevent minimization of @imgly/background-removal
      if (config.optimization.minimizer) {
        config.optimization.minimizer.forEach((plugin) => {
          if (plugin.constructor.name === 'TerserPlugin') {
            plugin.options.exclude = /node_modules[\\/]@imgly[\\/]background-removal/
          }
        })
      }
    }

    // Handle module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }

    return config
  },

  // Prevent server-side bundling of background-removal
  experimental: {
    serverComponentsExternalPackages: ['@imgly/background-removal'],
  },

  // Set headers for WASM/ONNX file loading
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ]
  },
}

export default nextConfig
