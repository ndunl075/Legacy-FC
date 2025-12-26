/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Keep these packages out of the server bundle
  serverComponentsExternalPackages: ['@imgly/background-removal', 'onnxruntime-web'],

  webpack: (config) => {
    // 2. Treat WASM files as static assets (do not parse them)
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // 3. CRITICAL FIX: Force onnxruntime .mjs files to be treated as modules
    // This fixes the "import.meta" error by allowing modern syntax.
    config.module.rules.push({
      test: /onnxruntime-web.*\.mjs$/,
      type: "javascript/auto",
    });

    return config;
  },
};

export default nextConfig;
