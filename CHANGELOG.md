# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-03-21

### Added
- **Component barrel exports** (`src/components/index.ts`) - Centralized component exports for cleaner imports
- **ESLint configuration** (`eslint.config.mjs`) - Code linting with Astro rules
- **Prettier configuration** (`prettierrc.json`) - Code formatting standards
- **500 error page** (`src/pages/500.astro`) - Server error fallback page
- **Motion system** - Portal animations, scroll reveal, touch feedback, reduced-motion support
- **MotionController component** - Scroll reveal, dividers, TOC, timeline, touch interactions
- **Portal component** - Ritualized entry gateway with seal/gate unlock sequence
- **PortalParticles component** - Transit particle effects
- **motion.css** - Site-wide motion foundation with CSS variables and keyframes

### Improved
- Mobile navigation drawer toggle behavior
- Touch target sizes for accessibility
- Reduced motion support across all animations
- Article content structure with proper section headings

### Documentation
- Updated handoff.md to reflect V1.1.0 status

## [1.0.0] - 2026-03-20

### Added
- Initial project setup with Astro + Tailwind + MDX
- 5 content collections (archive, medicine, myth, dharma, realms)
- Complete route skeleton (28 pages)
- 3 layout templates (BaseLayout, PageLayout, ArticleLayout)
- Navigation system with mobile support
- Design tokens and typography system
- Section color palettes (gold, jade, amethyst, sapphire, ochre)
- Timeline component for era visualization
- SectionHeader component with reveal animations
- 404 page with worldbuilding-consistent styling
- About page with project backstory
- ParticleField atmospheric background
- MistEffect ambient layer
- ScrollReveal interaction component
- ArchiveCard and SectionNav widgets
- Comprehensive documentation (9 docs files)
- GitHub Pages deployment configuration

### Content
- 20 topic pages across 5 sections
- Placeholder content for all planned entries
- Frontmatter schema with title, subtitle, description, tags, era, quote, status

---

## Versioning

This project uses semantic versioning. Versions are tagged in git.

## Branches

- `main` - Stable releases
- No feature branches currently in use (single-developer workflow)
