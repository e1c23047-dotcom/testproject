import fs from "fs";
import path from "path";

export function getFile() {
  const fp = path.join(process.cwd(), "data", "orders.json");
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, "[]", "utf8");
  return fp;
}

export function loadJson(fp) {
  return JSON.parse(fs.readFileSync(fp, "utf8"));
}

export function saveJson(fp, data) {
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf8");
}
