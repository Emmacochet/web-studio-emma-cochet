// Replaces Next's generated out/404.html with scripts/404.html (spa-github-pages style redirect).
import { copyFileSync } from "node:fs";

copyFileSync("scripts/404.html", "out/404.html");
console.log("Installed scripts/404.html as out/404.html");
