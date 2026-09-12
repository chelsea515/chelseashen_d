"use client";

import { useState } from "react";

type Phase = {
  title: string;
  bullets: string[];
};

type Project = {
  id: string;
  title: string;
  role: string;
  rolePlacement?: "after-second-phase";
  summary?: string;
  phases?: Phase[];
  bullets?: string[];
  metrics?: string[];
};

type ProjectGroup = {
  title: string;
  description?: string;
  projects: Project[];
};

type Employer = {
  id: string;
  company: string;
  team: string;
  period: string;
  overview: string;
  groups: ProjectGroup[];
};

const translations: Record<string, string> = {
  "德勤管理咨询": "Deloitte Consulting",
  "客户与营销": "Customer & Marketing",
  "上汽通用汽车金融": "SAIC-GMAC Automotive Finance",
  "市场销售部": "Marketing & Sales",
  "普华永道": "PwC",
  "创新服务部": "Innovation Services",
  "01 / 数字化与 AI 转型规划、Use Case 落地": "01 / Digital & AI Transformation Planning, Use Case Delivery",
  "02 / 用户数据洞察驱动业务运营优化": "02 / Consumer Date Insights for Business Optimization",
  "全球奢侈时尚品牌｜数字化与 AI 转型规划及经营分析 Dashboard": "Global Luxury Fashion Brand | Digital & AI Transformation Planning and Business Analytics Dashboard",
  "头部汽车品牌｜营销数据平台（DMP）三年规划与端到端建设": "Leading Automotive Brand | Three-year Marketing Data Platform (DMP) Roadmap and End-to-end Build",
  "头部美妆品牌｜门店 SA 智能导购问答平台": "Leading Beauty Brand | Store SA AI-assisted Advisor Q&A Platform",
  "全球酒店集团｜CRM 会员运营战略与本地化 Campaign": "Global Hotel Group | CRM Membership Strategy and Localized Campaigns",
  "头部豪华汽车品牌｜CRM 用户流失诊断及召回策略": "Leading Luxury Automotive Brand | CRM Churn Diagnosis and Win-back Strategy",
  "头部服装品牌｜基于客户分群的数据建模与买货策略优化": "Leading Fashion Brand | Customer Segmentation Modeling and Merchandise Planning Optimization",
  "2C 线上平台｜用户画像及市场调研": "D2C Online Platform | Customer Profiling and Market Research",
  "渠道经营分析与 BI 看板（0→1）": "Channel Performance Analytics & BI Dashboard (0→1)",
  "用户画像分析与市场策略优化": "Customer Profiling and Market Strategy Optimization",
  "数据分析赋能用户运营": "Data Analytics for User Operations",
  "经营分析与增长运营": "Business Analytics and Growth Operations",
  "用户洞察带动增长": "User Insights Driving Growth",
  "项目经理兼 BA Lead": "PM / BA Lead",
  "PM/BA Lead": "PM / BA Lead",
  "BA Lead": "BA Lead",
  "咨询顾问": "Consultant",
  "市场销售部": "Marketing & Sales",
  "数字化转型与产品落地交付": "Digital Transformation & Product Delivery",
  "连接业务、数据与技术，推动品牌数字化转型及数据产品交付，驱动广告、会员、线下零售等业务运营优化": "Connecting business, data and technology to deliver digital/AI transformation and data products, enabling optimization across media, consumer and retail operations",
  "工作理念：沉下心，有担当，有热爱": "Working philosophy: Stay grounded, take ownership and bring passion",
  "年工作经验": "years of experience",
  "市场营销与分析（本/硕）": "Marketing & Analytics (B/M)",
  "端到端的产品解决方案交付": "End-to-end Product Solution Delivery",
  "产品规划，产品落地，业务赋能": "Roadmap Planning, product delivery, business enablement",
  "数字化 / AI 转型规划": "Digital / AI Transformation Planning",
  "数字化产品落地": "Digital Product Delivery",
  "数据洞察驱动运营": "Data Insights Driving Operations",
  "识别业务机会，定义 Use Case，制定优先级与路线图": "Identify business opportunities, define use cases, and set priorities and roadmaps",
  "以 PM / BA 身份连接业务、数据与技术，推进端到端交付": "Connect business, data and technology as PM / BA to drive end-to-end delivery",
  "将用户、营销与经营数据转化为可执行的增长和运营策略": "Turn customer, marketing and business data into actionable growth and operating strategies",
  "工作经历": "Experience",
  "点击公司或项目，查看具体职责、项目阶段及业务成果。": "Select a company or project to view responsibilities, project phases and outcomes.",
  "项目成果": "Project outcomes",
  "阶段 1｜数字化 / AI 战略规划与 Use Case 路线图": "Phase 1 | Digital / AI Strategy and Use Case Roadmap",
  "阶段 2｜跨职能 Dashboard 产品设计与端到端交付": "Phase 2 | Cross-functional Dashboard Design and End-to-end Delivery",
  "阶段 1｜三年期产品规划": "Phase 1 | Three-year Product Roadmap",
  "阶段 2｜一期产品实施": "Phase 2 | Phase-one Product Implementation",
  "18 家门店 Pilot": "Pilot across 18 stores",
  "2026 年全国推广计划": "Nationwide rollout planned for 2026",
  "10+ 数据平台接入": "10+ data platforms integrated",
  "广告 ROI 提升 7%+": "Advertising ROI improved by 7%+",
  "3 个大型会员活动": "3 large membership campaigns",
  "3+ 项目团队成员": "3+ project team members",
  "300+ 候选数据指标": "300+ candidate data metrics",
  "10+ 主机厂及经销商": "10+ OEMs and dealers",
  "20 万+ 客户": "200K+ customers",
  "100+ 渠道 / 经销商": "100+ channels / dealers",
  "30+ 数据诊断报告": "30+ data diagnostic reports",
  "客资量 +50%": "Leads +50%",
  "转化率 +30%": "Conversion +30%",
  "客资成本 −20%": "Lead cost −20%",
  "聚焦奢侈品、美妆、汽车及酒店行业，负责数字化与 AI 转型规划、数据产品交付及客户运营优化。": "Focus on luxury, beauty, automotive and hospitality, leading digital and AI transformation planning, data product delivery and customer operations optimization.",
  "参与面向存量用户的 2C 线上平台探索，以用户和市场数据支持运营策略及数字化转型。": "Supported exploration of a D2C platform for existing customers, using customer and market data to shape operations and transformation.",
  "通过经营看板、渠道运营诊断及用户画像分析，支持管理层的业务增长与运营决策。": "Supported leadership growth and operating decisions through performance dashboards, channel diagnostics and customer profiling.",
  "帮助中国区团队实现本地化、个性化的会员沟通与运营机制。": "Helped the China team establish localized and personalized membership communications and operating mechanisms.",
  "整合多端客户数据，识别高价值非活跃用户，并形成可执行的激活策略。": "Integrated multi-channel customer data to identify high-value inactive customers and shape actionable activation strategies.",
  "以外部数据、门店聚类和销售预测支持更精细的商品规划。": "Used external data, store clustering and sales forecasting to support more precise merchandise planning.",
  "以 AI 知识问答与个性化推荐，支持门店 SA 围绕消费者需求进行产品讲解与销售沟通。": "Used AI-powered knowledge Q&A and personalized recommendations to help store SAs explain products and engage customers around their needs.",
  "为销售痛点、目标人群、触达时间和渠道选择提供数据支持。": "Provided data support for sales pain points, target audiences, contact timing and channel selection.",
  "构建经营数据基础设施，并以用户分析驱动市场增长。": "Built performance data infrastructure and used customer analytics to drive market growth.",
  "将用户数据转化为可验证的市场宣传策略。": "Translated customer data into testable marketing communication strategies.",
  "面向 Marketing、E-commerce、CRM、Merchandising 及 Retail 团队梳理未来 3–5 年业务需求与痛点，沉淀跨部门 Use Case 清单、价值评估框架及实施路线图": "Synthesized 3–5 year needs and pain points across Marketing, E-commerce, CRM, Merchandising and Retail, creating a cross-functional use-case backlog, value framework and delivery roadmap",
  "调研阿里、字节、腾讯等中国主流技术生态的 AI 能力，并按 To Function、To Store、To Customer 三类场景评估奢侈品零售适配性": "Assessed AI capabilities across Alibaba, ByteDance, Tencent and other leading China ecosystems, evaluating luxury retail fit across To Function, To Store and To Customer scenarios",
  "综合业务价值、数据基础、技术可行性、实施复杂度及组织准备度完成优先级评估，推动业务团队与集团管理层就实施范围及路线图达成共识": "Prioritized use cases across business value, data readiness, technical feasibility, implementation complexity and organizational readiness, aligning business teams and group leadership on scope and roadmap",
  "负责从业务需求调研、指标及口径设计、BRD/PRD 与原型输出，到开发协调、UAT、上线推广的端到端交付": "Owned end-to-end delivery from business discovery, KPI and definition design, BRD/PRD and prototyping through development coordination, UAT and rollout",
  "完成 Pilot 上线，覆盖集团管理层、办公室团队及 18 家门店；计划于 2026 年底完成全国门店推广": "Launched the pilot for group leadership, office teams and 18 stores; nationwide rollout planned by the end of 2026",
  "基于广告投放业务需求，制定三年期产品规划方案，设计分阶段业务 Use Case 及实施路线图：\n1）第一年 – 数据资产及分析框架落地：完成全域营销数据的端到端接入与串联，打通用户从品牌认知、兴趣互动到购买转化的全链路可视化看板\n2）第二年 – 高阶数据应用场景落地赋能精准投放：1）依托联邦计算合作实现一方/三方数据协同，实现更精准的人群圈选；2）MMM 营销效能归因分析\n3）第三年 - AI for BI 等智能分析场景": "Built a three-year product roadmap from advertising needs, with phased use cases and delivery plans:\n1) Year 1 – Data assets and analytics foundation: connect and visualize the full marketing funnel from awareness and engagement to purchase\n2) Year 2 – Advanced applications for precision targeting: enable first-/third-party data collaboration through federated computing and deliver MMM marketing effectiveness attribution\n3) Year 3 – Intelligent analytics scenarios such as AI for BI",
  "结合业务价值、数据可得性、技术依赖及实施复杂度明确优先建设能力，并基于数据洞察提出投放优化建议": "Prioritized capabilities by business value, data availability, technical dependencies and implementation complexity, then translated insights into media optimization recommendations",
  "梳理品牌广告与效果广告分析场景，输出数据层与应用层的分阶段 BRD/PRD、需求优先级及交付计划": "Mapped brand and performance advertising analytics scenarios and produced phased BRDs/PRDs, priorities and delivery plans across data and application layers",
  "对接腾讯、字节、阿里及媒体监测生态等 10+ 数据平台，关联外部营销数据与品牌一方数据，支持公私域联动及用户全生命周期行为还原": "Integrated 10+ platforms including Tencent, ByteDance, Alibaba and media measurement partners, linking external marketing data with first-party data to reconstruct full-lifecycle customer behavior",
  "设计媒介投放端到端指标体系、KPI 字典及分析看板；以敏捷方式推动数仓分层、UI 原型、数据及产品开发和测试验收": "Designed end-to-end media metrics, KPI dictionary and analytics dashboards; led agile data-layering, UI prototyping, product development and testing",
  "梳理产品知识、成分功效、适用人群、搭配方案及销售话术等多源资产，构建结构化知识体系与问答场景框架": "Structured product knowledge, ingredients, benefits, target users, pairing recommendations and sales scripts into a governed knowledge base and Q&A framework",
  "访谈品牌、培训、销售及门店一线团队，定义问题分类、答案呈现逻辑、推荐策略与业务规则，确保输出符合品牌调性与销售规范": "Interviewed brand, training, sales and frontline store teams to define question taxonomy, answer logic, recommendation strategies and business rules aligned with brand standards",
  "负责需求调研、流程设计、知识库治理、原型及需求文档、UAT 支持等全流程 BA 工作，并建立准确性、合规性与推荐相关性的运营迭代机制": "Owned BA activities across discovery, process design, knowledge governance, prototyping, requirements documentation and UAT, establishing operating loops for accuracy, compliance and relevance",
  "梳理会员人群分层、生命周期运营与沟通触点，产出覆盖会员活动、生命周期沟通、线下门店运营及产品能力的 5 年发展蓝图": "Defined membership segments, lifecycle operations and communication touchpoints, delivering a five-year blueprint across campaigns, lifecycle communications, store operations and product capabilities",
  "带领 3+ 团队成员并协调外部供应商，落地 3 个大型会员活动，完成策略设计、需求管理、项目排期、上线执行及复盘": "Led 3+ team members and external vendors to deliver three large membership campaigns spanning strategy, requirements, planning, launch and retrospective",
  "开拓本地化沟通渠道与机制，实现会员招募规模及 CPE 五年内最佳表现": "Opened localized communication channels and mechanisms, achieving five-year highs in member acquisition and CPE",
  "整合车机端、用户端、经销商等内外部数据，还原用户流失路径及潜在原因": "Integrated in-car, customer and dealer data to reconstruct churn journeys and root causes",
  "识别具激活潜力的高价值非活跃用户，基于人群行为、价值及触点偏好完成分群": "Identified high-value inactive customers with activation potential and segmented them by behavior, value and touchpoint preferences",
  "输出以 Moments、Offer、Channel 为核心的召回策略，支持客户后续配置触达节奏、权益内容及渠道组合": "Developed win-back strategies around Moments, Offer and Channel to guide contact cadence, benefits and channel mix",
  "主导线上电商行为、线下行为及客群属性等外部数据可用性评估，筛选 300+ 与客户特征及销售表现相关的核心指标作为候选特征库": "Led external data usability assessment across online, offline and audience attributes, screening 300+ metrics related to customer traits and sales as candidate features",
  "基于客群属性及门店聚类，牵头构建分客群销售预测子模型，输出年度分门店、分品类销售预测": "Built segmented sales forecasting models using audience attributes and store clusters, producing annual forecasts by store and category",
  "面向买手及区域运营团队提出主推品类、SKU 宽度与深度建议，推动数据洞察进入商品规划决策": "Advised buyers and regional operations on priority categories and SKU breadth/depth, embedding insights into merchandise decisions",
  "对接 10+ 主机厂及经销商，按需提供客户画像与市场调研报告。": "Partnered with 10+ OEMs and dealers to deliver customer profiles and market research on demand",
  "整合实地调研、主机厂及经销商数据、行业报告和内部数据，支持用户运营及市场策略制定。": "Combined field research, OEM/dealer data, industry reports and internal data to shape user operations and market strategy",
  "协助 1 位合伙人及 6 位经理为 6 条业务线、100+ 渠道 / 合作经销商制定数据统计及 BI 经营分析模型，并协同 IT 实现月度、季度及年度报告自动化。": "Supported a partner and six managers across six business lines and 100+ channels/dealers, defining BI performance models and automating monthly, quarterly and annual reporting with IT",
  "管理 100+ 合作经销商的绩效与运营数据，累计提供 30+ 份可视化数据诊断报告，支持高层制定运营策略及问题排查。": "Managed performance and operating data for 100+ dealers and delivered 30+ visual diagnostic reports to support leadership decisions and issue resolution",
  "分析 20 万+ 客户的画像、痛点及购买行为，完成市场宣传策略支持及 A/B Test 设计和执行。": "Analyzed profiles, pain points and purchase behavior for 200K+ customers, supporting campaign strategy and A/B test design and execution",
  "围绕客户画像、痛点与购买行为提供市场策略洞察，并设计及执行 A/B Test 验证优化方向。": "Generated market strategy insights from customer profiles, pain points and purchase behavior, designing and running A/B tests to validate optimization directions",
  "优化后实现客资量提升 50%、活跃度提升 15%、转化率提升 30%，客资成本下降 20%。": "Optimization increased leads by 50%, activity by 15% and conversion by 30%, while reducing lead cost by 20%",
};

const employers: Employer[] = [
  {
    id: "deloitte",
    company: "德勤管理咨询",
    team: "客户与营销",
    period: "2022.05 — 至今",
    overview:
      "聚焦奢侈品、美妆、汽车及酒店行业，负责数字化与 AI 转型规划、数据产品交付及客户运营优化。",
    groups: [
      {
        title: "01 / 数字化与 AI 转型规划、Use Case 落地",
        projects: [
          {
            id: "luxury-dashboard",
            title: "全球奢侈时尚品牌｜数字化与 AI 转型规划及经营分析 Dashboard",
            role: "项目经理兼 BA Lead",
            rolePlacement: "after-second-phase",
            phases: [
              {
                title: "阶段 1｜数字化 / AI 战略规划与 Use Case 路线图",
                bullets: [
                  "面向 Marketing、E-commerce、CRM、Merchandising 及 Retail 团队梳理未来 3–5 年业务需求与痛点，沉淀跨部门 Use Case 清单、价值评估框架及实施路线图",
                  "调研阿里、字节、腾讯等中国主流技术生态的 AI 能力，并按 To Function、To Store、To Customer 三类场景评估奢侈品零售适配性",
                  "综合业务价值、数据基础、技术可行性、实施复杂度及组织准备度完成优先级评估，推动业务团队与集团管理层就实施范围及路线图达成共识",
                ],
              },
              {
                title: "阶段 2｜跨职能 Dashboard 产品设计与端到端交付",
                bullets: [
                  "负责从业务需求调研、指标及口径设计、BRD/PRD 与原型输出，到开发协调、UAT、上线推广的端到端交付",
                  "完成 Pilot 上线，覆盖集团管理层、办公室团队及 18 家门店；计划于 2026 年底完成全国门店推广",
                ],
              },
            ],
            metrics: ["18 家门店 Pilot", "2026 年全国推广计划"],
          },
          {
            id: "dmp",
            title: "头部汽车品牌｜营销数据平台（DMP）三年规划与端到端建设",
            role: "PM/BA Lead",
            phases: [
              {
                title: "阶段 1｜三年期产品规划",
                bullets: [
                  "基于广告投放业务需求，制定三年期产品规划方案，设计分阶段业务 Use Case 及实施路线图：\n1）第一年 – 数据资产及分析框架落地：完成全域营销数据的端到端接入与串联，打通用户从品牌认知、兴趣互动到购买转化的全链路可视化看板\n2）第二年 – 高阶数据应用场景落地赋能精准投放：1）依托联邦计算合作实现一方/三方数据协同，实现更精准的人群圈选；2）MMM 营销效能归因分析\n3）第三年 - AI for BI 等智能分析场景",
                  "结合业务价值、数据可得性、技术依赖及实施复杂度明确优先建设能力，并基于数据洞察提出投放优化建议",
                ],
              },
              {
                title: "阶段 2｜一期产品实施",
                bullets: [
                  "梳理品牌广告与效果广告分析场景，输出数据层与应用层的分阶段 BRD/PRD、需求优先级及交付计划",
                  "对接腾讯、字节、阿里及媒体监测生态等 10+ 数据平台，关联外部营销数据与品牌一方数据，支持公私域联动及用户全生命周期行为还原",
                  "设计媒介投放端到端指标体系、KPI 字典及分析看板；以敏捷方式推动数仓分层、UI 原型、数据及产品开发和测试验收",
                ],
              },
            ],
            metrics: ["10+ 数据平台接入", "广告 ROI 提升 7%+"],
          },
          {
            id: "ai-clienteling",
            title: "头部美妆品牌｜门店 SA 智能导购问答平台",
            role: "BA Lead",
            summary:
              "以 AI 知识问答与个性化推荐，支持门店 SA 围绕消费者需求进行产品讲解与销售沟通。",
            bullets: [
              "梳理产品知识、成分功效、适用人群、搭配方案及销售话术等多源资产，构建结构化知识体系与问答场景框架",
              "访谈品牌、培训、销售及门店一线团队，定义问题分类、答案呈现逻辑、推荐策略与业务规则，确保输出符合品牌调性与销售规范",
              "负责需求调研、流程设计、知识库治理、原型及需求文档、UAT 支持等全流程 BA 工作，并建立准确性、合规性与推荐相关性的运营迭代机制",
            ],
          },
        ],
      },
      {
        title: "02 / 用户数据洞察驱动业务运营优化",
        projects: [
          {
            id: "hotel-crm",
            title: "全球酒店集团｜CRM 会员运营战略与本地化 Campaign",
            role: "咨询顾问",
            summary:
              "帮助中国区团队实现本地化、个性化的会员沟通与运营机制。",
            bullets: [
              "梳理会员人群分层、生命周期运营与沟通触点，产出覆盖会员活动、生命周期沟通、线下门店运营及产品能力的 5 年发展蓝图",
              "带领 3+ 团队成员并协调外部供应商，落地 3 个大型会员活动，完成策略设计、需求管理、项目排期、上线执行及复盘",
              "开拓本地化沟通渠道与机制，实现会员招募规模及 CPE 五年内最佳表现",
            ],
            metrics: ["3 个大型会员活动", "3+ 项目团队成员"],
          },
          {
            id: "auto-crm",
            title: "头部豪华汽车品牌｜CRM 用户流失诊断及召回策略",
            role: "BA Lead",
            summary:
              "整合多端客户数据，识别高价值非活跃用户，并形成可执行的激活策略。",
            bullets: [
              "整合车机端、用户端、经销商等内外部数据，还原用户流失路径及潜在原因",
              "识别具激活潜力的高价值非活跃用户，基于人群行为、价值及触点偏好完成分群",
              "输出以 Moments、Offer、Channel 为核心的召回策略，支持客户后续配置触达节奏、权益内容及渠道组合",
            ],
          },
          {
            id: "merch",
            title: "头部服装品牌｜基于客户分群的数据建模与买货策略优化",
            role: "BA Lead",
            summary:
              "以外部数据、门店聚类和销售预测支持更精细的商品规划。",
            bullets: [
              "主导线上电商行为、线下行为及客群属性等外部数据可用性评估，筛选 300+ 与客户特征及销售表现相关的核心指标作为候选特征库",
              "基于客群属性及门店聚类，牵头构建分客群销售预测子模型，输出年度分门店、分品类销售预测",
              "面向买手及区域运营团队提出主推品类、SKU 宽度与深度建议，推动数据洞察进入商品规划决策",
            ],
            metrics: ["300+ 候选数据指标"],
          },
        ],
      },
    ],
  },
  {
    id: "saic-gmac",
    company: "上汽通用汽车金融",
    team: "市场销售部",
    period: "2021.09 — 2022.05",
    overview:
      "参与面向存量用户的 2C 线上平台探索，以用户和市场数据支持运营策略及数字化转型。",
    groups: [
      {
        title: "数据分析赋能用户运营",
        description: "以客户画像与市场研究支持新业务赛道的用户激活和复购增长决策。",
        projects: [
          {
            id: "saic-operations",
            title: "2C 线上平台｜用户画像及市场调研",
            role: "市场销售部",
            summary: "为销售痛点、目标人群、触达时间和渠道选择提供数据支持。",
            bullets: [
              "对接 10+ 主机厂及经销商，按需提供客户画像与市场调研报告。",
              "整合实地调研、主机厂及经销商数据、行业报告和内部数据，支持用户运营及市场策略制定。",
            ],
            metrics: ["10+ 主机厂及经销商"],
          },
        ],
      },
    ],
  },
  {
    id: "pwc",
    company: "普华永道",
    team: "创新服务部",
    period: "2019.09 — 2021.09",
    overview:
      "通过经营看板、渠道运营诊断及用户画像分析，支持管理层的业务增长与运营决策。",
    groups: [
      {
        title: "经营分析与增长运营",
        description: "覆盖渠道经营、BI 分析模型、数据诊断及用户洞察。",
        projects: [
          {
            id: "pwc-bi",
            title: "渠道经营分析与 BI 看板（0→1）",
            role: "创新服务部",
            summary: "构建经营数据基础设施，并以用户分析驱动市场增长。",
            bullets: [
              "协助 1 位合伙人及 6 位经理为 6 条业务线、100+ 渠道 / 合作经销商制定数据统计及 BI 经营分析模型，并协同 IT 实现月度、季度及年度报告自动化。",
              "管理 100+ 合作经销商的绩效与运营数据，累计提供 30+ 份可视化数据诊断报告，支持高层制定运营策略及问题排查。",
              "分析 20 万+ 客户的画像、痛点及购买行为，完成市场宣传策略支持及 A/B Test 设计和执行。",
            ],
            metrics: ["20 万+ 客户", "100+ 渠道 / 经销商", "30+ 数据诊断报告"],
          },
        ],
      },
      {
        title: "用户洞察带动增长",
        description: "以客户画像与实验设计优化获客效率和转化。",
        projects: [
          {
            id: "pwc-growth",
            title: "用户画像分析与市场策略优化",
            role: "创新服务部",
            summary: "将用户数据转化为可验证的市场宣传策略。",
            bullets: [
              "围绕客户画像、痛点与购买行为提供市场策略洞察，并设计及执行 A/B Test 验证优化方向。",
              "优化后实现客资量提升 50%、活跃度提升 15%、转化率提升 30%，客资成本下降 20%。",
            ],
            metrics: ["客资量 +50%", "转化率 +30%", "客资成本 −20%"],
          },
        ],
      },
    ],
  },
];

function ProjectDetail({ project, t }: { project: Project; t: (value: string) => string }) {
  return (
    <div className="project-detail" id={`project-panel-${project.id}`}>
      {project.rolePlacement !== "after-second-phase" && <div className="project-role">{t(project.role)}</div>}
      {project.summary && <p className="project-summary">{t(project.summary)}</p>}
      {project.phases?.map((phase, phaseIndex) => (
        <section className="phase" key={phase.title}>
          <h5>{t(phase.title)}</h5>
          {project.rolePlacement === "after-second-phase" && phaseIndex === 1 && (
            <div className="project-role phase-role">{t(project.role)}</div>
          )}
          <ul>
            {phase.bullets.map((bullet) => (
              <li key={bullet}>{t(bullet)}</li>
            ))}
          </ul>
        </section>
      ))}
      {project.bullets && (
        <ul className="project-bullets">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{t(bullet)}</li>
          ))}
        </ul>
      )}
      {project.metrics && (
        <div className="metric-row" aria-label="项目成果">
          {project.metrics.map((metric) => (
            <span key={metric}>{t(metric)}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectTitle({ title, t }: { title: string; t: (value: string) => string }) {
  const translated = t(title);
  const separator = translated.indexOf("|");
  if (separator < 0) return <span>{translated}</span>;
  return (
    <span className="project-title">
      <strong className="project-title-brand">{translated.slice(0, separator).trim()}</strong>
      <span className="project-title-rest"> {translated.slice(separator).trim()}</span>
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [openEmployerId, setOpenEmployerId] = useState("");
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});
  const t = (value: string) => (lang === "en" ? translations[value] ?? value : value);

  const toggleEmployer = (employerId: string) => {
    setOpenEmployerId((current) => (current === employerId ? "" : employerId));
  };

  const toggleProject = (projectId: string) => {
    setOpenProjects((current) => ({ ...current, [projectId]: !current[projectId] }));
  };

  return (
    <main>
      <header className="site-header">
        <div className="wordmark contact-details" aria-label="联系方式">
          <span>{lang === "en" ? "Contact:" : "联系方式："}</span>
          <a href="mailto:chuanshen5@163.com">chuanshen5@163.com</a>
          <span> / </span>
          <a href="tel:+8613082813052">130 8281 3052</a>
        </div>
        <div className="language-switcher" role="group" aria-label="Language">
          <button type="button" className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>中</button>
          <span aria-hidden="true">/</span>
          <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">PROFILE</p>
          <h1 id="hero-title">Chelsea Shen</h1>
          <p className="hero-intro">{t("数字化转型与产品落地交付")}</p>
          <p className="hero-subcopy">{t("连接业务、数据与技术，推动品牌数字化转型及数据产品交付，驱动广告、会员、线下零售等业务运营优化")}</p>
          <p className="hero-belief">{t("工作理念：沉下心，有担当，有热爱")}</p>
          <div className="fact-grid" aria-label="职业与教育概览">
            <div><strong>6+</strong><span>{t("年工作经验")}</span></div>
            <div><strong>{lang === "en" ? "University of Melbourne" : "墨尔本大学"}</strong><span>{t("市场营销与分析（本/硕）")}</span></div>
          </div>
        </div>

        <div className="portrait-frame">
          <img
            src="chelsea-portrait-v2.jpg"
            alt="沈川 Chelsea 的职业头像"
            className="portrait"
          />
        </div>

      </section>

      <section className="section profile" id="profile" aria-labelledby="profile-title">
        <div>
          <h2 id="profile-title">{t("端到端的产品解决方案交付")}</h2>
          <p className="profile-subtitle">{t("产品规划，产品落地，业务赋能")}</p>
        </div>
        <div className="capability-list">
          <article><span>01</span><h3>{t("数字化 / AI 转型规划")}</h3><p>{t("识别业务机会，定义 Use Case，制定优先级与路线图")}</p></article>
          <article><span>02</span><h3>{t("数字化产品落地")}</h3><p>{t("以 PM / BA 身份连接业务、数据与技术，推进端到端交付")}</p></article>
          <article><span>03</span><h3>{t("数据洞察驱动运营")}</h3><p>{t("将用户、营销与经营数据转化为可执行的增长和运营策略")}</p></article>
        </div>
      </section>

      <section className="section experience" id="experience" aria-labelledby="experience-title">
        <div className="section-heading">
          <div className="section-label">02 / Experience</div>
          <h2 id="experience-title">{t("工作经历")}</h2>
          <p>{t("点击公司或项目，查看具体职责、项目阶段及业务成果。")}</p>
        </div>

        <div className="experience-list">
          {employers.map((employer, index) => {
            const isOpen = openEmployerId === employer.id;
            return (
              <article className={`employer ${isOpen ? "is-open" : ""}`} key={employer.id}>
                <button
                  className="employer-trigger"
                  type="button"
                  onClick={() => toggleEmployer(employer.id)}
                  aria-expanded={isOpen}
                  aria-controls={`employer-panel-${employer.id}`}
                >
                  <span className="timeline-index">0{index + 1}</span>
                  <span className="employer-name"><strong>{t(employer.company)}</strong><small>{t(employer.team)}</small></span>
                  <span className="employer-period">{lang === "en" ? employer.period.replace("至今", "Present") : employer.period}</span>
                  <span className="toggle-mark" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="employer-panel" id={`employer-panel-${employer.id}`}>
                    {employer.groups.map((group) => (
                      <section className="project-group" key={group.title}>
                        <div className="group-heading">
                          <h3>{t(group.title)}</h3>
                        </div>
                        <div className="project-list">
                          {group.projects.map((project) => {
                            const alwaysOpenProjects = employer.id === "pwc" || employer.id === "saic-gmac";
                            const projectIsOpen = alwaysOpenProjects || Boolean(openProjects[project.id]);
                            return (
                              <article className={`project ${projectIsOpen ? "is-open" : ""}`} key={project.id}>
                                {alwaysOpenProjects ? (
                                  <div className="project-trigger static-project-trigger">
                                    <ProjectTitle title={project.title} t={t} />
                                  </div>
                                ) : (
                                  <button
                                    className="project-trigger"
                                    type="button"
                                    onClick={() => toggleProject(project.id)}
                                    aria-expanded={projectIsOpen}
                                    aria-controls={`project-panel-${project.id}`}
                                  >
                                    <ProjectTitle title={project.title} t={t} />
                                    {!alwaysOpenProjects && <span aria-hidden="true">{projectIsOpen ? (lang === "en" ? "Collapse" : "收起") : (lang === "en" ? "Expand" : "展开")}</span>}
                                  </button>
                                )}
                                {projectIsOpen && <ProjectDetail project={project} t={t} />}
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <footer>
        <p>{lang === "en" ? "Chelsea Shen · Data & Digital Transformation" : "沈川 Chelsea · Data & Digital Transformation"}</p>
        <span>Shang Hai</span>
      </footer>
    </main>
  );
}
