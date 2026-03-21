# 灵墟 (LingXu)

**末法纪 · 失落修行文明档案馆**
*The Age of Declining Dharma · Archive of a Lost Cultivation Civilization*

[![构建状态](https://img.shields.io/badge/build-29%20pages-blue)](https://github.com/badhope/LingXu)
[![版本](https://img.shields.io/badge/version-v1.1.0-gold)](CHANGELOG.md)
[![框架](https://img.shields.io/badge/framework-Astro-purple)](https://astro.build)

---

## 快速入门

### 灵墟是什么？

灵墟是一个数字档案馆，探索中国历史上的修行文明——那个通过精神修炼可以获得非凡能力的世界。这里不是玄幻小说，而是对真实历史文化信仰、典籍与实践的探索，这些内容塑造了中华文化数千年。

**核心问题**：一个拥有精密精神技术的古老文明，为何只在现代留下零散的痕迹？

### 如何浏览

```
入口
    ↓
叩启封印 (Portal) — 仪式感入口体验
    ↓
首页 (Homepage) — 档案主殿
    ↓
五大板块：
    ├── 档案馆 /archive — 历史纪元与文明轨迹
    ├── 典籍 /medicine — 医典经典与身体修炼
    ├── 神话 /myth — 神怪传说与山海地理
    ├── 法门 /dharma — 佛道传承与修行法门
    └── 境界 /realms — 修炼境界体系与路径
```

### 核心概念

| 概念 | 说明 |
|------|------|
| **末法纪** | 灵机衰微、修行难以成就的当代 |
| **六纪** | 文明纪年框架：太初纪→神人纪→人皇纪→法脉纪→隐退纪→末法纪 |
| **法脉** | 修行知识通过血脉/师徒传承 |
| **残痕** | 修行文明在现代留下的各种痕迹 |

### 精选条目

- [六纪时代划分](/archive/six-eras) — 六纪纪年框架
- [末法纪总论](/archive/end-of-dharma-age) — 理解末法纪
- [黄帝内经与修行身体](/medicine/huangdi-neijing) — 经典文本与身体修炼
- [山海经：失落的地理](/myth/shanhai-overview) — 重构山海经世界
- [修行境界体系](/realms/cultivation-realm-system) — 完整境界层级

---

## 贡献者指南

### 当前状态

**版本**: v1.1.0 — 框架完成
**构建**: 29 pages
**内容**: 5个板块共20条目
**文档**: 9份参考文档

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/badhope/LingXu.git
cd LingXu

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

### 工作优先级

**高优先级**:
- 扩展15个草稿条目内容
- 添加条目间交叉引用
- 集成精选图片

**中优先级**:
- 术语表/词汇页
- 交互式时间线
- 搜索功能 (Pagefind)

**低优先级**:
- 组件颜色类去重
- 增强移动端导航
- 国际化基础设施

### 内容写作规范

**应该**:
- 使用正式中文文学风格
- 承认论述中的不确定性
- 以经典文献为权威依据
- 将内容与末法纪框架关联
- 全程使用中文标点符号

**不应该**:
- 将推测当作事实
- 以现代小说为权威引用
- 引入矛盾的设定
- 使用网络用语

详见 `docs/handoff.md` 第6节。

---

## 技术文档

### 技术栈

| 技术 | 用途 |
|------|------|
| Astro | 静态站点框架 |
| TypeScript | 类型安全 |
| Tailwind CSS | 样式系统 |
| MDX | 内容编写 |
| GitHub Pages | 部署 |

### 目录结构

```
LingXu/
├── src/
│   ├── components/          # 组件
│   │   ├── interactive/     # 动效与大气效果
│   │   ├── layout/         # 布局组件
│   │   ├── portal/         # 入口大门
│   │   ├── ui/             # UI组件
│   │   ├── widgets/        # 组合组件
│   │   └── index.ts        # 桶导出
│   ├── content/
│   │   └── config.ts       # 内容集合配置
│   ├── data/
│   │   ├── navigation.ts   # 导航配置
│   │   └── timeline.ts     # 六纪时间线数据
│   ├── layouts/            # 布局模板
│   ├── lib/
│   │   └── constants.ts   # 站点配置
│   ├── pages/              # 页面
│   └── styles/
│       ├── global.css      # 设计系统
│       └── motion.css      # 动效系统
├── docs/                   # 架构文档
├── public/                 # 静态资源
└── 配置文件
```

### 内容集合

| 集合 | 板块 | 条目数 | 扩展字段 |
|------|------|--------|----------|
| `archive` | 档案馆 | 4 | `category: era\|cultivation\|theory` |
| `medicine` | 典籍 | 4 | `category: classic\|theory\|practice` |
| `myth` | 神话 | 4 | `category: beast\|deity\|place\|event` |
| `dharma` | 法门 | 4 | `tradition: buddhism\|daoism\|both` |
| `realms` | 境界 | 4 | `realmType: qi\|body\|spirit\|combined` |

### 前置matter模板

```yaml
---
title: 条目标题              # 必填
subtitle: 副标题             # 可选
description: 简介            # 必填，用于meta和卡片
section: 所属板块            # 必填，必须与父级板块匹配
category: 分类               # 集合特定
tags: [标签1, 标签2]        # 用于交叉引用
era: 所属时代               # 六纪参考
featured: true              # 精选状态
order: 1                    # 排序顺序
status: planned|draft|ready|published
quote: "引用文字"           # 重要引述
quoteSource: "引用来源"      # 引述出处
updatedAt: YYYY年M月
relatedArticles:
  - title: 相关条目
    href: /板块/slug
    description: 相关原因
---
```

### 动效系统

动效系统分5层：

1. **入口层** — 封印→解锁→穿越序列
2. **大气层** — 粒子场、雾气效果、环境动画
3. **页面过渡层** — BaseLayout中的基础过渡
4. **组件交互层** — 触摸反馈、悬停状态
5. **阅读层** — 滚动显现、目录高亮、分隔线

所有动效支持 `prefers-reduced-motion` 并针对移动端优化了时序。

### 不可更改决策

未经完整项目评审**请勿更改**：

| 决策 | 位置 | 原因 |
|------|------|------|
| 五大板块 | `navigation.ts`, `content/config.ts` | 导航耦合 |
| 六纪纪年 | `data/timeline.ts`, `docs/worldbuilding.md` | 世界观核心 |
| 板块配色 | `navigation.ts` SECTION_COLORS | 设计系统 |
| 基础路径 `/LingXu` | `astro.config.mjs`, `lib/constants.ts` | 部署 |

详见 `docs/handoff.md` 第3节。

### 添加新内容

**第一步**: 在对应板块创建MDX文件
```
src/pages/[板块]/[slug].mdx
```

**第二步**: 添加前置matter（参考上方模板）

**第三步**: 导入ArticleLayout并编写内容

**第四步**: 验证构建通过: `npm run build`

---

## 开发注意事项

### 基础路径同步

基础路径在**两个位置**定义，必须保持同步：

```typescript
// astro.config.mjs
base: '/LingXu'

// src/lib/constants.ts
base: '/LingXu',
```

### CSS架构

- `global.css` — 设计令牌、散文样式、工具类、动画
- `motion.css` — 动效系统、滚动显现、过渡

两者都必须在BaseLayout中导入。

### 组件开发

组件应该：
- 使用Astro的 `.astro` 格式
- 定义TypeScript Props接口
- 支持Tailwind工具类
- 添加到 `src/components/index.ts` 导出
- 交互元素包含触摸反馈

### 构建验证

提交前验证构建通过：

```bash
npm run build
# 应输出: XX page(s) built
```

### 代码质量

```bash
# 格式化代码
npx prettier --write .

# 检查代码
npx eslint .
```

---

## 版本路线图

详见 `docs/roadmap.md`。

### v1.2.0 — 内容扩展
- 完成全部15个草稿条目
- 添加精选图片
- 实现条目交叉引用

### v1.3.0 — 导航增强
- 交互式时间线
- 标签筛选
- 阅读路径推荐

### v1.4.0 — 发现功能
- 术语表页面
- 搜索功能 (Pagefind)
- 可视化主题地图

---

## 相关资源

- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [worldbuilding.md](docs/worldbuilding.md) — 世界观与设定
- [handoff.md](docs/handoff.md) — 接续指南

---

> "法门虽隐，真机未亡。"
