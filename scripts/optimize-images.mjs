/**
 * Image Optimization Script
 * Uses Sharp to optimize images for better PageSpeed scores
 *
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(publicDir, 'backup-originals');

// Images that need optimization based on PageSpeed report
const optimizations = [
  // Workers - shown at 560x560 max
  { file: 'worker2.avif', width: 560, height: 560, quality: 60 },
  { file: 'worker4.avif', width: 560, height: 560, quality: 60 },
  { file: 'worker6.avif', width: 560, height: 560, quality: 60 },
  { file: 'worker.avif', width: 560, height: 560, quality: 65 },

  // Services - shown at ~500x300 in cards
  { file: 'service1.avif', width: 600, height: 400, quality: 55 },
  { file: 'service2.avif', width: 600, height: 400, quality: 55 },
  { file: 'service3.avif', width: 600, height: 400, quality: 55 },
  { file: 'service4.avif', width: 600, height: 400, quality: 55 },
  { file: 'service5.avif', width: 600, height: 400, quality: 55 },
  { file: 'service6.avif', width: 600, height: 400, quality: 55 },
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  // Create backup directory
  if (!existsSync(backupDir)) {
    await mkdir(backupDir, { recursive: true });
    console.log('📁 Created backup directory\n');
  }

  let totalSaved = 0;

  for (const opt of optimizations) {
    const inputPath = path.join(publicDir, opt.file);
    const backupPath = path.join(backupDir, opt.file);

    if (!existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${opt.file} - file not found`);
      continue;
    }

    try {
      // Get original size
      const originalMeta = await sharp(inputPath).metadata();
      const originalSize = (await sharp(inputPath).toBuffer()).length;

      // Backup original if not already backed up
      if (!existsSync(backupPath)) {
        await copyFile(inputPath, backupPath);
        console.log(`💾 Backed up: ${opt.file}`);
      }

      // Optimize image
      const optimized = await sharp(inputPath)
        .resize(opt.width, opt.height, {
          fit: 'cover',
          position: 'center'
        })
        .avif({ quality: opt.quality, effort: 6 })
        .toBuffer();

      // Save optimized
      await sharp(optimized).toFile(inputPath);

      const newSize = optimized.length;
      const saved = originalSize - newSize;
      const percentage = ((saved / originalSize) * 100).toFixed(1);
      totalSaved += saved;

      console.log(`✅ ${opt.file}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KiB (${originalMeta.width}x${originalMeta.height})`);
      console.log(`   Optimized: ${(newSize / 1024).toFixed(1)} KiB (${opt.width}x${opt.height})`);
      console.log(`   Saved: ${(saved / 1024).toFixed(1)} KiB (${percentage}%)\n`);

    } catch (error) {
      console.error(`❌ Error optimizing ${opt.file}:`, error.message);
    }
  }

  console.log('━'.repeat(50));
  console.log(`\n🎉 Total saved: ${(totalSaved / 1024).toFixed(1)} KiB (${(totalSaved / 1024 / 1024).toFixed(2)} MiB)`);
  console.log(`\n📂 Original images backed up to: public/backup-originals/`);
}

optimizeImages().catch(console.error);
