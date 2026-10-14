// Fails the build early if the downloadable CV PDFs are missing (they are linked from the site).
import { existsSync, statSync } from "node:fs";

const files = [
  "public/cv/Geronimo-Diaz-De-Rosa-CV-EN.pdf",
  "public/cv/Geronimo-Diaz-De-Rosa-CV-ES.pdf",
];

let ok = true;
for (const f of files) {
  if (!existsSync(f) || statSync(f).size < 1024) {
    console.error(`✗ Missing or empty: ${f}`);
    ok = false;
  } else {
    console.log(`✓ ${f}`);
  }
}
if (!ok) {
  console.error("\nExport the CV from the design canvas and save it with the exact file names above.");
  process.exit(1);
}
