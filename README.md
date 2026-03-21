# LingXu (灵墟)

**The Age of Declining Dharma · Archive of a Lost Cultivation Civilization**
*末法纪 · 失落修行文明档案馆*

[![Build Status](https://img.shields.io/badge/build-29%20pages-blue)](https://github.com/badhope/LingXu)
[![Version](https://img.shields.io/badge/version-v1.1.0-gold)](CHANGELOG.md)
[![Framework](https://img.shields.io/badge/framework-Astro-purple)](https://astro.build)

---

## For Users · 快速入门

### What is LingXu?

灵墟 (LingXu) is a digital archive exploring China's historical cultivation civilization (修行文明) — the world where practitioners could achieve extraordinary abilities through spiritual cultivation. This is not fantasy fiction. It is an exploration of real historical beliefs, texts, and practices that shaped Chinese culture for millennia.

**Central Question**: Why does an ancient civilization with sophisticated spiritual technologies leave only fragments in the modern world?

### How to Navigate

```
入口 (Entry)
    ↓
Portal (叩启封印) — ritual gateway experience
    ↓
首页 (Homepage) — main archive hall
    ↓
五大板块 (Five Sections):
    ├── 档案馆 /archive — Historical eras &文明的轨迹
    ├── 典籍 /medicine — Medical classics & body cultivation
    ├── 神话 /myth — Mythology, deities, & strange beings
    ├── 法门 /dharma — Buddhist & Daoist lineages
    └── 境界 /realms — Cultivation realm system & paths
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **末法纪** (Age of Declining Dharma) | The current era where spiritual cultivation has faded |
| **六纪** (Six Eras) | The chronological framework: 太初纪 → 神人纪 → 人皇纪 → 法脉纪 → 隐退纪 → 末法纪 |
| **法脉** (Dharma Lineage) | The transmission of cultivation knowledge through lineages |
| **残痕** (Remnants) | Surviving traces of the cultivation civilization in modern times |

### Featured Entries

- [六纪时代划分](/archive/six-eras) — The six-era chronological framework
- [末法纪总论](/archive/end-of-dharma-age) — Understanding the Age of Declining Dharma
- [黄帝内经与修行身体](/medicine/huangdi-neijing) — The classic text on body and cultivation
- [山海经：失落的地理](/myth/shanhai-overview) — Reimagining the Classic of Mountains and Seas
- [修行境界体系](/realms/cultivation-realm-system) — The complete cultivation realm hierarchy

---

## For Contributors · 贡献者指南

### Current Status

**Version**: v1.1.0 — Framework Complete
**Build**: 29 pages
**Content**: 20 entries across 5 sections
**Documentation**: 9 reference documents

### Quick Start

```bash
# Clone the repository
git clone https://github.com/badhope/LingXu.git
cd LingXu

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### What Needs Work

**HIGH Priority**:
- Content expansion for 15 draft entries
- Related article cross-linking
- Featured image integration

**MEDIUM Priority**:
- Glossary/terminology page
- Interactive timeline (fully functional)
- Search functionality (Pagefind)

**LOW Priority**:
- Component colorClasses deduplication
- Enhanced mobile navigation
- Bilateral i18n infrastructure

### Content Writing Guidelines

**DO**:
- Use formal Chinese literary style
- Acknowledge uncertainty in claims
- Reference classical texts as authorities
- Connect content to the Age of Declining Dharma framework
- Use Chinese punctuation throughout

**DON'T**:
- Treat speculation as fact
- Cite modern fiction as authority
- Introduce contradictory lore
- Use casual internet slang

See `docs/handoff.md` Section 6 for full conventions.

---

## For Developers & AI · 技术文档

### Architecture Overview

**Framework**: Astro 4.x with MDX integration
**Styling**: Tailwind CSS 3.x with custom design tokens
**Deployment**: GitHub Pages (static)
**Base Path**: `/LingXu` (configured in two locations — must stay in sync)

### Repository Structure (v1.1.0)

```
LingXu/
├── src/
│   ├── components/
│   │   ├── interactive/        # Motion & atmospheric effects
│   │   │   ├── MotionController.astro
│   │   │   ├── ParticleField.astro
│   │   │   ├── MistEffect.astro
│   │   │   └── ScrollReveal.astro
│   │   ├── layout/             # Structural components
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── portal/             # Entry gateway
│   │   │   ├── Portal.astro
│   │   │   └── PortalParticles.astro
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Badge.astro
│   │   │   ├── Breadcrumbs.astro
│   │   │   ├── Card.astro
│   │   │   ├── SectionHeader.astro
│   │   │   └── Timeline.astro
│   │   ├── widgets/            # Composed widgets
│   │   │   ├── ArchiveCard.astro
│   │   │   └── SectionNav.astro
│   │   └── index.ts            # Barrel exports
│   ├── content/
│   │   └── config.ts           # Collection schemas (5 collections)
│   ├── data/
│   │   ├── navigation.ts        # NAV_ITEMS, SECTION_COLORS
│   │   └── timeline.ts         # Six-era chronology data
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root HTML + global components
│   │   ├── PageLayout.astro    # Section index template
│   │   └── ArticleLayout.astro # Long-form content template
│   ├── lib/
│   │   ├── constants.ts        # SITE_CONFIG
│   │   └── utils.ts
│   ├── pages/
│   │   ├── archive/            # 4 entries
│   │   ├── medicine/           # 4 entries
│   │   ├── myth/               # 4 entries
│   │   ├── dharma/             # 4 entries
│   │   ├── realms/             # 4 entries
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro         # About page
│   │   ├── 404.astro           # Not found
│   │   └── 500.astro          # Server error
│   └── styles/
│       ├── global.css          # Design system, prose, components
│       └── motion.css          # Animation system, transitions
├── docs/                       # Architecture documentation
│   ├── handoff.md             # Continuation guide (V1.1.0)
│   ├── architecture.md        # Technical architecture
│   ├── information-architecture.md
│   ├── content-model.md       # Content schema
│   ├── ui-principles.md       # Design decisions
│   ├── motion-principles.md   # Animation guidelines
│   ├── worldbuilding.md       # Lore and setting
│   └── roadmap.md             # Future plans
├── public/                    # Static assets
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
├── eslint.config.mjs          # ESLint configuration
├── prettierrc.json            # Prettier configuration
├── CHANGELOG.md              # Version history
└── README.md                 # This file
```

### Content Collections

| Collection | Section | Entries | Schema Extensions |
|------------|---------|---------|-------------------|
| `archive` | 档案馆 | 4 | `category: era|cultivation|theory` |
| `medicine` | 典籍 | 4 | `category: classic|theory|practice` |
| `myth` | 神话 | 4 | `category: beast|deity|place|event` |
| `dharma` | 法门 | 4 | `tradition: buddhism|daoism|both` |
| `realms` | 境界 | 4 | `realmType: qi|body|spirit|combined` |

### Frontmatter Schema

```yaml
---
title: string              # Required
subtitle: string           # Optional
description: string        # Required - used in meta/cards
section: string           # Required - must match parent section
category: string          # Collection-specific
tags: string[]            # For cross-referencing
era: string               # Six-era reference
featured: boolean         # Featured status
order: number             # Sort order
status: planned|draft|ready|published
quote: string             # Notable quote
quoteSource: string       # Quote attribution
updatedAt: string         # YYYY年M月
relatedArticles:
  - title: string
    href: string
    description: string
---
```

### Motion System

The motion system has 5 layers:

1. **Portal Layer** — Entry gateway with seal/gate unlock sequence
2. **Atmospheric Layer** — ParticleField, MistEffect, ambient animations
3. **Page Transition Layer** — BaseLayout motion integration
4. **Component Interaction Layer** — Touch feedback, hover states
5. **Reading Layer** — Scroll reveal, TOC highlighting, dividers

All motion respects `prefers-reduced-motion` and has mobile-optimized timings.

### Frozen Decisions

**DO NOT CHANGE** without full project review:

| Decision | Location | Reason |
|----------|----------|--------|
| Five sections | `navigation.ts`, `content/config.ts` | Navigation coupling |
| Six-era chronology | `data/timeline.ts`, `docs/worldbuilding.md` | Worldbuilding core |
| Section colors (5 palettes) | `navigation.ts` SECTION_COLORS | Design system |
| Base path `/LingXu` | `astro.config.mjs`, `lib/constants.ts` | Deployment |

See `docs/handoff.md` Section 3 for full list.

### Adding New Content

**Step 1**: Create MDX file in appropriate section
```
src/pages/[section]/[slug].mdx
```

**Step 2**: Add frontmatter with required fields

**Step 3**: Import ArticleLayout and compose content

**Step 4**: Verify build passes: `npm run build`

### Adding New Sections

**Not recommended** — the five sections are frozen. If absolutely necessary:

1. Add to `NAV_ITEMS` in `src/data/navigation.ts`
2. Add section color to `SECTION_COLORS`
3. Create section index page
4. Update all documentation references

---

## Development Notes

### Base Path Synchronization

Base path is defined in **two locations** and must be kept in sync:

```typescript
// astro.config.mjs
base: '/LingXu'

// src/lib/constants.ts
base: '/LingXu',
```

### CSS Architecture

- `global.css` — Design tokens, prose styles, utility classes, animations
- `motion.css` — Motion system foundation, scroll reveal, transitions

Both must be imported in BaseLayout.

### Component Development

Components should:
- Use Astro's `.astro` format
- Accept typed Props interfaces
- Support Tailwind utility classes
- Be added to `src/components/index.ts` for barrel export
- Include touch feedback for interactive elements

### Build Verification

Always verify build passes before committing:

```bash
npm run build
# Should output: XX page(s) built
```

### Code Quality

```bash
# Format code
npx prettier --write .

# Lint code
npx eslint .
```

---

## Roadmap

See `docs/roadmap.md` for full details.

### v1.2.0 — Content Expansion
- Complete all 15 draft entries
- Add featured images
- Implement cross-linking

### v1.3.0 — Navigation Enhancement
- Interactive timeline
- Tag-based filtering
- Reading path recommendations

### v1.4.0 — Discovery Features
- Glossary page
- Search functionality (Pagefind)
- Visual topic map

---

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [worldbuilding.md](docs/worldbuilding.md) — Lore and setting
- [handoff.md](docs/handoff.md) — Continuation guide

---

> "法门虽隐，真机未亡。" — *The Dharma may be hidden, but the true essence remains.*
