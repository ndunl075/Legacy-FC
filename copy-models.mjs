import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Recursively copy directory contents
 */
function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  // Read source directory
  const entries = fs.readdirSync(source, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name)
    const destPath = path.join(destination, entry.name)

    if (entry.isDirectory()) {
      // Recursively copy subdirectory
      copyDirectory(sourcePath, destPath)
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath)
    }
  }
}

/**
 * Main copy function
 */
function copyModels() {
  console.log('🚀 Starting model files copy...\n')

  try {
    // Copy @imgly/background-removal files
    const bgRemovalSource = path.join(__dirname, 'node_modules/@imgly/background-removal/dist')
    const bgRemovalDest = path.join(__dirname, 'public/static/chunks/imgly')

    console.log('📦 Copying @imgly/background-removal...')
    console.log(`   Source: ${bgRemovalSource}`)
    console.log(`   Destination: ${bgRemovalDest}`)

    if (fs.existsSync(bgRemovalSource)) {
      copyDirectory(bgRemovalSource, bgRemovalDest)
      console.log('✅ @imgly/background-removal copied successfully\n')
    } else {
      console.warn('⚠️  @imgly/background-removal source not found, skipping\n')
    }

    // Copy onnxruntime-web files
    const onnxSource = path.join(__dirname, 'node_modules/onnxruntime-web/dist')
    const onnxDest = path.join(__dirname, 'public/static/chunks/onnx')

    console.log('📦 Copying onnxruntime-web...')
    console.log(`   Source: ${onnxSource}`)
    console.log(`   Destination: ${onnxDest}`)

    if (fs.existsSync(onnxSource)) {
      copyDirectory(onnxSource, onnxDest)
      console.log('✅ onnxruntime-web copied successfully\n')
    } else {
      console.warn('⚠️  onnxruntime-web source not found, skipping\n')
    }

    console.log('✨ All model files copied successfully!')
  } catch (error) {
    console.error('❌ Error copying model files:', error.message)
    process.exit(1)
  }
}

// Run the copy function
copyModels()
