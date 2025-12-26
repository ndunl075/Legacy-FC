import path from 'path'
import { fileURLToPath } from 'url'
import CopyPlugin from 'copy-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add rule to treat WASM files as assets, not code
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    })

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
