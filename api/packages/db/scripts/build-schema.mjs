import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const prismaDir = path.join(root, "prisma");
const partsDir = path.join(prismaDir, "schema-parts");
const outDir = path.join(prismaDir, "schema");
const outFile = path.join(outDir, "schema.prisma");

// Order matters: generator + datasource first, then models
const files = [path.join(partsDir, "00-generator.prisma"), path.join(partsDir, "01-datasource.prisma")];

// Add all models in alphabetical order
const modelsDir = path.join(partsDir, "models");
const modelFiles = fs
  .readdirSync(modelsDir)
  .filter((f) => f.endsWith(".prisma"))
  .sort()
  .map((f) => path.join(modelsDir, f));

const content =
  [...files, ...modelFiles].map((file) => fs.readFileSync(file, "utf8").trimEnd()).join("\n\n") +
  "\n";

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, content, "utf8");

console.log(`✅ Built ${path.relative(root, outFile)} from ${modelFiles.length} model files`);
