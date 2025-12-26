import path from 'path'
import { fileURLToPath } from 'url'
import CopyPlugin from 'copy-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    // Enable WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    }

    // Client-side only configuration
    if (!isServer) {
      // CRITICAL: Copy @imgly/background-removal dist files to public directory
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

      // CRITICAL: Completely exclude ONNX Runtime and background removal from bundling
      // This prevents Webpack from even trying to process these files
      config.externals = config.externals || []
      config.externals.push({
        '@imgly/background-removal': '@imgly/background-removal',
        'onnxruntime-web': 'onnxruntime-web',
      })

      // CRITICAL: Ignore all files from these packages during module parsing
      config.module = config.module || {}
      config.module.noParse = config.module.noParse || []
      config.module.noParse.push(
        /node_modules\/@imgly\/background-removal/,
        /node_modules\/onnxruntime-web/
      )

      // CRITICAL: Treat WASM and .mjs files as assets
      config.module.rules.push(
        {
          test: /\.wasm$/,
          type: 'asset/resource',
        },
        {
          test: /\.mjs$/,
          include: /node_modules\/(onnxruntime-web|@imgly\/background-removal)/,
          type: 'asset/resource',
        }
      )

      // CRITICAL: Use IgnorePlugin to prevent Webpack from bundling these packages
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^@imgly\/background-removal$/,
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^onnxruntime-web$/,
        })
      )

      // CRITICAL: Disable minimization for ONNX Runtime files
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer = config.optimization.minimizer.map((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options = minimizer.options || {}
            minimizer.options.exclude = [
              /node_modules[\\/]@imgly[\\/]background-removal/,
              /node_modules[\\/]onnxruntime-web/,
              /\.wasm$/,
              /\.mjs$/,
            ]
          }
          return minimizer
        })
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

  // CRITICAL: Prevent server-side bundling
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
