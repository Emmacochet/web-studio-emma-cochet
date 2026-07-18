// Pre-generates resized WebP variants for local images in `public/`, so the
// custom image loader (see image-loader.ts) can serve responsive images
// without a running server — required because this site uses
// `output: "export"` and can't use Next's built-in Image Optimization API.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const WIDTHS = [640, 750, 828, 1080, 1200, 1920];
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimize(sourcePath) {
  const sourceStat = await stat(sourcePath);
  const { dir, name } = path.parse(sourcePath);
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const originalWidth = metadata.width ?? Math.max(...WIDTHS);

  // Always emit a file for every bucket width the loader might request,
  // even past the image's real width — capped (never upscaled) at
  // originalWidth — so the loader's chosen bucket is never a 404.
  for (const width of WIDTHS) {
    const actualWidth = Math.min(width, originalWidth);
    const outputPath = path.join(dir, `${name}@${width}.webp`);
    try {
      const outputStat = await stat(outputPath);
      if (outputStat.mtimeMs >= sourceStat.mtimeMs) continue;
    } catch {
      // Output doesn't exist yet, fall through and generate it.
    }

    await sharp(sourcePath).resize({ width: actualWidth }).webp({ quality: 80 }).toFile(outputPath);
    console.log(`optimized ${path.relative(PUBLIC_DIR, outputPath)}`);
  }
}

const sources = await walk(PUBLIC_DIR);
await Promise.all(sources.map(optimize));
console.log(`Done — processed ${sources.length} source image(s).`);
