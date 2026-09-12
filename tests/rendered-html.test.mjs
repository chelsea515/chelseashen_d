import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("career page contains the required positioning and accessible disclosure controls", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(page, /Chelsea Shen/);
  assert.doesNotMatch(page, /沈 川/);
  assert.doesNotMatch(page, /<em>沈 川<\/em>/);
  assert.match(page, /<p className="eyebrow">PROFILE<\/p>/);
  assert.match(page, /数字化转型与产品落地交付/);
  assert.match(page, /连接业务、数据与技术，推动品牌数字化转型及数据产品交付，驱动广告、会员、线下零售等业务运营优化/);
  assert.doesNotMatch(page, /浏览工作经历/);
  assert.doesNotMatch(page, /负责、热爱/);
  assert.doesNotMatch(page, /聚焦奢侈品、美妆、汽车及酒店行业的数据与客户运营场景/);
  assert.match(page, /6\+<\/strong><span>年工作经验/);
  assert.match(page, /墨尔本大学<\/strong><span>市场营销与分析（本\/硕）/);
  assert.doesNotMatch(page, /本科、硕士｜市场营销与分析/);
  assert.doesNotMatch(page, /个硕博学位/);
  assert.match(page, /经历亮点：端到端的产品解决方案 - 产品规划 &gt; 产品落地 &gt; 业务赋能/);
  assert.doesNotMatch(page, /01 \/ Profile/);
  assert.doesNotMatch(page, /把模糊的业务问题，变成可落地的数据与产品方案/);
  assert.doesNotMatch(page, /具备从需求洞察、Use Case 规划、数据分析与产品设计/);
  assert.doesNotMatch(page, /从业务机会识别、路线图制定，到数据产品设计、开发协同及上线运营的端到端交付/);
  assert.doesNotMatch(page, /从用户分层、行为路径与外部数据机会中提炼策略，推动营销、CRM 与商品运营决策/);
  assert.match(page, /aria-expanded/);
  assert.match(page, /aria-controls/);
  assert.match(page, /阶段 1｜三年期产品规划/);
  assert.match(page, /阶段 2｜一期产品实施/);
  assert.match(page, /10\+ 数据平台接入/);
  assert.match(page, /广告 ROI 提升 7%\+/);
  assert.match(page, /chelsea-portrait-v2\.jpg/);
  assert.doesNotMatch(page, /portrait-note/);
  assert.doesNotMatch(page, /以结果为责，以专业深耕价值/);
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
  assert.doesNotMatch(css, /\.site-header \{[^}]*border-bottom/);
  assert.doesNotMatch(css, /portrait-frame::before/);
  assert.match(css, /\.fact-grid span \{[^}]*font-size: 13px/);
  assert.match(css, /background: #e8edf3/);
  assert.match(css, /background: #dfe8f2/);
  assert.match(css, /background: #eef3f8/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"test": "WRANGLER_LOG_PATH=\.wrangler\/wrangler\.log vinext build && node --test tests\/rendered-html\.test\.mjs"/);
  assert.doesNotMatch(packageJson, /"test": "npm run build/);
});
