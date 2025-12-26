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
      // CRITICAL: Copy @imgly/background-removal dist files to public directory
      // This prevents Webpack from trying to bundle them
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

      // CRITICAL: Treat WASM files as assets (don't parse them)
      // This prevents Terser from trying to minify them
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/resource',
      })

      // CRITICAL: Ignore ONNX Runtime .mjs files that contain import.meta
      // Tell Webpack to treat them as external resources
      config.module.rules.push({
        test: /onnxruntime-web.*\.mjs$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/chunks/[name][ext]',
        },
      })

      // Exclude the entire @imgly/background-removal package from Terser minification
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options.exclude = /node_modules[\\/](@imgly[\\/]background-removal|onnxruntime-web)/
          }
        })
      }
    }

    // Prevent Node.js modules from being bundled client-side
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    }

    return config
  },

  // CRITICAL: Prevent server-side bundling of packages that use WASM/ONNX
  // This avoids import.meta errors during server-side rendering
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
