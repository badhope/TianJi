# LingXu · 灵墟

**A Digital Archive of Lost Cultivation Civilizations**

*The gates have been sealed. The archives remain.*

[![Version](https://img.shields.io/badge/version-v1.0.0-gold)](CHANGELOG.md)
[![Pages](https://img.shields.io/badge/pages-33-gold)](https://badhope.github.io/LingXu)
[![Framework](https://img.shields.io/badge/framework-Astro-ff5d01)](https://astro.build)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 🎯 Project Overview

LingXu is an immersive digital archive exploring the rise, flourishing, and eventual decline of China's ancient cultivation civilization—a real historical and cultural phenomenon where practitioners sought transcendence through meditative practices, breathwork, alchemy, and spiritual refinement.

This is **not** a fantasy or xianxia website. It is a meticulously researched digital humanities project that reconstructs the trajectory of this lost civilization using modern web technology.

### The Central Narrative

At some point in Chinese history, cultivation was a lived reality. Practitioners could achieve extraordinary abilities through disciplined practice. Then, the spiritual energy (灵气) declined. The **End of Dharma Age** (末法纪) descended. The cultivation civilization retreated into obscurity, leaving only fragments in ancient texts, folklore, and surviving practices.

**LingXu attempts to digitally reconstruct the arc of this lost civilization**—not as fiction, but as a trace/imagination of real historical and cultural脉络.

---

## 🌟 Key Features

- **Immersive Entry Portal** — A ritualized gateway experience that transitions visitors from ordinary reality into the archive world
- **Five Archival Modules** — Archive, Medicine, Myth, Dharma, Realms
- **Motion System** — Five-layer animation architecture supporting atmosphere, transitions, and readability
- **Responsive Design** — Mobile-first with reduced-motion support
- **User Preferences** — Language, font size, animation controls

---

## 🏗️ Technical Architecture

### Core Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Astro](https://astro.build) | Static site framework | ^4.x |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling | ^3.x |
| [MDX](https://mdxjs.com) | Content authoring | ^3.x |
| [TypeScript](https://typescriptlang.org) | Type safety | ^5.x |

### Project Structure

```
lingxu/
├── public/                    # Static assets
├── src/
│   ├── components/            # Astro components
│   │   ├── interactive/       # Motion, scroll effects
│   │   ├── layout/            # Header, Footer
│   │   ├── portal/            # Entry portal system
│   │   ├── ui/               # Reusable UI components
│   │   └── widgets/           # Card components
│   ├── content/               # Astro content collections
│   ├── data/                  # Navigation, timeline data
│   ├── layouts/               # Page templates
│   │   ├── BaseLayout.astro   # Root layout
│   │   ├── PageLayout.astro   # Standard page layout
│   │   └── ArticleLayout.astro # Article content layout
│   ├── lib/                   # Utilities, constants
│   ├── pages/                 # File-based routing
│   │   ├── archive/           # Archive module
│   │   ├── dharma/            # Dharma module
│   │   ├── medicine/          # Medicine module
│   │   ├── myth/              # Myth module
│   │   └── realms/            # Cultivation realms module
│   └── styles/                # Global styles
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

---

## 📐 Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Gold | `#c9a227` / `#d4af37` | Primary accent, archive theme |
| Ochre | `#8a4a2d` / `#ba7a5a` | Realm module theme |
| Jade | `#2d8a4a` / `#5aba7a` | Medicine module theme |
| Sapphire | `#2d4a6b` / `#6b9ad4` | Dharma module theme |
| Amethyst | `#6b2d8a` / `#ad5aba` | Myth module theme |
| Background | `#080808` / `#050505` | Dark backgrounds |

### Typography

- **Display**: Noto Serif SC (Chinese headings)
- **Body**: System font stack with serif fallback
- **Monospace**: JetBrains Mono (code blocks)

### Spatial System

- Base unit: 4px
- Content max-width: 1280px
- Section spacing: 64px (mobile: 48px)
- Component gap: 24px

---

## 🎬 Motion System

LingXu implements a **five-layer motion architecture**:

### Layer 1: Portal (Entry Experience)
- Sealed gate state
- Unlock sequence animation
- Transit/crossing effect with particle system
- Archive arrival reveal
- Total duration: 2-3 seconds

### Layer 2: Atmospheric (Ambient Effects)
- Floating particles
- Mist effects
- Background gradients
- Subtle continuous animations

### Layer 3: Page Transitions
- Fade transitions between pages
- Content reveal on navigation

### Layer 4: Component Interaction
- Hover states on cards and buttons
- Click feedback (scale, glow)
- Toggle switches
- Focus states

### Layer 5: Reading (Scroll-based)
- ScrollReveal: Elements fade/slide into view
- Staggered delays for lists
- prefers-reduced-motion support

### Animation Specifications

```css
:root {
  --motion-duration-fast: 150ms;
  --motion-duration-normal: 300ms;
  --motion-duration-slow: 500ms;
  --motion-duration-reveal: 600ms;
  --motion-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --motion-ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

---

## 📂 Content Model

### Article Schema

```typescript
interface Article {
  title: string;           // Article title
  subtitle?: string;       // Subtitle/tagline
  description: string;      // Meta description (150-200 chars)
  section: string;          // Module name
  sectionColor: Color;      // Theme color
  tags: string[];           // Content tags
  era: string;              // Historical era reference
  quote?: string;           // Featured quote
  quoteSource?: string;     // Quote attribution
  updatedAt?: string;       // Last update date
  featured?: boolean;       // Featured content flag
  order?: number;           // Sort order
  related?: RelatedLink[];   // Related article references
}
```

### Navigation Structure

```
Archive (档案馆)      → /archive
Medicine (典籍)      → /medicine
Myth (神话)          → /myth
Dharma (法门)        → /dharma
Realms (境界)        → /realms
About (缘起)         → /about
```

### Historical Timeline (Six Eras)

1. **混沌纪** (Chaos Era) — Primordial beginnings
2. **太初纪** (Primeval Era) — Early cultivation emergence
3. **神人纪** (Divine-Human Era) — Peak of immortal practitioners
4. **人皇纪** (Human Sovereign Era) — Institutionalization
5. **隐退纪** (Retreat Era) — Gradual decline
6. **末法纪** (End of Dharma Era) — Current/post-cultivation age

---

## 🔒 Frozen Decisions

These architectural decisions are **immutable** and should not be changed without major version bump:

### Architecture
- [x] Astro framework (static site generation)
- [x] Tailwind CSS for styling (no CSS-in-JS)
- [x] MDX for content authoring
- [x] TypeScript for type safety
- [x] File-based routing (Astro conventions)

### Design
- [x] Dark theme with gold accents
- [x] Serif display font for Chinese text
- [x] Five distinct module color themes
- [x] Mobile-first responsive design

### Motion
- [x] Five-layer motion architecture
- [x] Portal entry as required first experience
- [x] CSS-based animations (no JS animation libraries)
- [x] prefers-reduced-motion support mandatory

### Content
- [x] Chinese as primary language
- [x] English as secondary (future)
- [x] Six-era historical framework
- [x] Archive module as primary entry after portal

---

## 🔓 Flexible Areas

These areas are **open for modification** without version bump:

### Content
- Individual article content and depth
- Tag taxonomy and organization
- Related article linking strategy
- New article creation within existing modules

### Design
- Color saturation adjustments within theme
- Spacing refinements
- Typography scale adjustments
- Card/component styling variations

### Motion
- Animation duration fine-tuning
- Easing curve adjustments
- Stagger delay values
- Hover effect intensity

### Technical
- Component internal implementation
- Data structure organization
- Asset optimization strategies
- Build tool configuration

---

## 🚀 Roadmap

### v1.0.x — Current (Foundation)
- [x] Project infrastructure
- [x] Entry portal system
- [x] All module routes (skeleton)
- [x] Content schema defined
- [x] Navigation system
- [x] Motion foundations
- [x] Mobile responsiveness
- [x] User preferences (settings panel)

### v1.1.x — Content Expansion
- [ ] Archive module: 10+ articles
- [ ] Medicine module: 8+ articles
- [ ] Myth module: 8+ articles
- [ ] Dharma module: 8+ articles
- [ ] Realms module: 8+ articles

### v1.2.x — English Localization
- [ ] English content translations
- [ ] i18n routing system
- [ ] Language switcher implementation
- [ ] EN-specific SEO metadata

### v1.3.x — Enhanced Interactivity
- [ ] Full-text search
- [ ] Advanced filtering/tags
- [ ] Bookmark/favorites system
- [ ] Reading progress indicator

### v2.0.x — Major Features
- [ ] Interactive cultivation timeline
- [ ] 3D archive visualization
- [ ] Community annotations
- [ ] API for external consumption

---

## 🤝 Contributing

We welcome contributions from developers, researchers, and enthusiasts.

### Development Setup

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

# Preview production build
npm run preview
```

### Code Style

- Use Astro component conventions
- Follow Tailwind CSS best practices
- TypeScript strict mode enabled
- Prettier for code formatting
- Semantic HTML and accessibility

### Content Guidelines

- Follow the Article schema
- Maintain historical accuracy
- Use canonical Chinese terms with translations
- Provide proper source citations
- Include related article links

### Commit Convention

```
feat: new article or feature
fix: bug correction
docs: documentation changes
style: formatting, styling
refactor: code reorganization
perf: performance improvements
```

---

## 📋 Handoff Documentation

For detailed architecture, content model, and contributor guidelines, see:

- [Handoff Documentation](docs/handoff.md) — Complete technical handoff
- [Frozen Decisions](docs/handoff.md#frozen-decisions) — Immutable architectural decisions
- [Flexible Areas](docs/handoff.md#flexible-areas) — Open modification areas
- [Content Model](docs/handoff.md#content-model) — Article schema and structure

---

## 🗺️ Module Overview

| Module | Chinese | Description | Theme Color |
|--------|---------|-------------|------------|
| Archive | 档案馆 | Historical eras,文明轨迹 | Gold |
| Medicine | 典籍 | Medical classics, body cultivation | Jade |
| Myth | 神话 | Legends, geography, creatures | Amethyst |
| Dharma | 法门 | Buddhist/Daoist lineages | Sapphire |
| Realms | 境界 | Cultivation levels and paths | Ochre |

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Ancient text preservation efforts
- Digital humanities research community
- Astro framework and its contributors
- Open source ecosystem

---

> *"The path of cultivation is long. The archive remains."*
>
> *— LingXu Project*

---

**Live Archive**: https://badhope.github.io/LingXu/
**Repository**: https://github.com/badhope/LingXu