import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("career page contains the required positioning and accessible disclosure controls", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(page, /Chelsea Shen/);
  assert.match(page, /沈 川/);
  assert.match(page, /<p className="eyebrow">PROFILE<\/p>/);
  assert.match(page, /数字化转型与产品落地交付/);
  assert.match(page, /6\+<\/strong><span>年工作经验/);
  assert.match(page, /aria-expanded/);
  assert.match(page, /aria-controls/);
  assert.match(page, /阶段 1｜三年期产品规划/);
  assert.match(page, /阶段 2｜一期产品实施/);
  assert.match(page, /10\+ 数据平台接入/);
  assert.match(page, /广告 ROI 提升 7%\+/);
  assert.match(page, /chelsea-portrait-v2\.jpg/);
  assert.doesNotMatch(page, /id="education"/);
  assert.match(page, /联系方式：/);
  assert.match(page, /chuanshen5@163\.com/);
  assert.match(page, /130 8281 3052/);
  assert.match(page, /tel:\+8613082813052/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(layout, /沈川 Chelsea \| 数字化转型与数据产品咨询顾问/);
  assert.match(layout, /og\.png/);
});

test("starter preview surface is not shipped", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"test": "WRANGLER_LOG_PATH=\.wrangler\/wrangler\.log vinext build && node --test tests\/rendered-html\.test\.mjs"/);
  assert.doesNotMatch(packageJson, /"test": "npm run build/);
});
