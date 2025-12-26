import path from 'path'
import { fileURLToPath } from 'url'
import CopyPlugin from 'copy-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Enable WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    // Client-side only configuration
    if (!isServer) {
      // Copy @imgly/background-removal dist files to public directory
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'node_modules/@imgly/background-removal/dist'),
              to: path.join(__dirname, 'public/static/chunks/imgly'),
            },
          ],
        })
      )

      // CRITICAL: Prevent parsing of WASM files
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/wasm/[name][ext]',
        },
      })

      // CRITICAL: Configure optimization to skip ONNX Runtime files entirely
      config.optimization = config.optimization || {}
      config.optimization.moduleIds = 'named'

      // Disable minimize for problematic files
      if (config.optimization.minimizer) {
        const TerserPlugin = config.optimization.minimizer.find(
          (plugin) => plugin.constructor.name === 'TerserPlugin'
        )

        if (TerserPlugin) {
          TerserPlugin.options = TerserPlugin.options || {}
          TerserPlugin.options.terserOptions = TerserPlugin.options.terserOptions || {}
          TerserPlugin.options.terserOptions.compress = TerserPlugin.options.terserOptions.compress || {}
          TerserPlugin.options.exclude = /ort.*\.(mjs|wasm)$/
        }
      }
    }

    // Prevent Node.js modules from being bundled
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }

    return config
  },

  // Prevent server-side bundling
  experimental: {
    serverComponentsExternalPackages: [
      '@imgly/background-removal',
      'onnxruntime-web',
    ],
  },

  // CORS headers for WASM
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
