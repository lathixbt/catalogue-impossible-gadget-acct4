import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const bytes = readFileSync(sourcePath);
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1048576 byte limit`);
}
if (bytes.length < 33) {
  throw new Error("entry.png is too small to be a valid PNG");
}

const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error("entry.png does not start with the PNG magic bytes");
}
const ihdrType = bytes.subarray(12, 16).toString("ascii");
if (ihdrType !== "IHDR") {
  throw new Error(`first PNG chunk is ${ihdrType}, expected IHDR`);
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
const bitDepth = bytes[24];
const colorType = bytes[25];
if (bitDepth !== 8) {
  throw new Error(`entry.png bit depth is ${bitDepth}, expected 8`);
}
if (colorType !== 2 && colorType !== 6) {
  throw new Error(`entry.png color type is ${colorType}, expected RGB (2) or RGBA (6)`);
}

const sha256 = createHash("sha256").update(bytes).digest("hex");
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.png");
copyFileSync(sourcePath, outputPath);

const written = readFileSync(outputPath);
if (!written.equals(bytes)) {
  throw new Error("read-back check failed: output differs from entry.png");
}
const writtenSha = createHash("sha256").update(written).digest("hex");
if (writtenSha !== sha256) {
  throw new Error(`read-back sha256 mismatch: ${writtenSha} vs ${sha256}`);
}
const writtenSize = statSync(outputPath).size;
if (writtenSize !== bytes.length) {
  throw new Error(`read-back size mismatch: ${writtenSize} vs ${bytes.length}`);
}
console.log(`entry.png ${width}x${height} ${bytes.length} bytes sha256=${sha256}`);
console.log(`wrote ${outputPath}`);
