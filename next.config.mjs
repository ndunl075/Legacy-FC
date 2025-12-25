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

      // CRITICAL: Prevent Webpack from parsing ONNX Runtime files
      // This stops the import.meta syntax errors
      config.module.rules.push(
        {
          test: /ort.*\.wasm$/,
          type: 'asset/resource',
        },
        {
          test: /onnxruntime-web/,
          type: 'javascript/auto',
        }
      )

      // Exclude @imgly/background-removal from Terser minification
      if (config.optimization.minimizer) {
        config.optimization.minimizer.forEach((plugin) => {
          if (plugin.constructor.name === 'TerserPlugin') {
            plugin.options.exclude = /node_modules[\\/](@imgly[\\/]background-removal|onnxruntime-web)/
          }
        })
      }
    }

    // Prevent Node.js modules from being bundled
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }

    return config
  },

  // Prevent server-side bundling of packages that use WASM/ONNX
  experimental: {
    serverComponentsExternalPackages: [
      '@imgly/background-removal',
      'onnxruntime-web',
    ],
  },

  // CORS headers required for SharedArrayBuffer and WASM
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
