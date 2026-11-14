# Contributing to NOOKORA

Thank you for your interest in contributing to **NOOKORA**! We are building the premier room-discovery and affordable makeover platform for renters, students, and compact-space dwellers.

---

## 1. Code of Conduct

We are committed to providing a welcoming, inclusive, and professional environment. Respect fellow contributors, offer constructive feedback, and prioritize empathy in all discussions.

---

## 2. Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/nookora.git
   cd nookora
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```

4. **Verify TypeScript compilation:**
   ```bash
   npx tsc --noEmit
   ```

5. **Verify production build:**
   ```bash
   npm run build
   ```

---

## 3. Git Branching & Commit Conventions

### Branch Naming
- `feat/feature-name` — New user-facing features or components
- `fix/bug-description` — Bug fixes
- `perf/optimization` — Performance improvements
- `docs/documentation-update` — Documentation edits
- `chore/tooling-update` — Build scripts, package updates

### Commit Messages
We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:
- `feat: implement square footage filter in discovery feed`
- `fix: resolve mobile before-after slider touch jump`
- `perf: optimize three.js procedural geometry memory disposal`
- `docs: update architecture diagram with service boundary`
- `chore: update dependencies and tailwind tokens`

---

## 4. Engineering & Design Standards

All contributions must adhere to the rules in [AGENTS.md](./AGENTS.md) and [DESIGN.md](./DESIGN.md):

1. **Design Fidelity**: Respect the *Nocturne Atelier* dark luxury aesthetic. Do not introduce generic white surfaces or bootstrap-like buttons.
2. **Strict TypeScript**: Avoid `any` types. Provide explicit interfaces for all component props.
3. **Client vs Server Components**: Use `'use client'` strictly at interactive leaf nodes. Keep layout shells as Server Components.
4. **Resilient 3D Fallbacks**: Any 3D feature added must maintain an instantaneous, lightweight 2D fallback for low-power devices.
5. **No Broken Links**: Ensure every button and link routes to a functioning view or provides immediate visual feedback.

---

## 5. Submitting a Pull Request (PR)

Before opening a PR, ensure:
- [ ] Code passes type checking: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`
- [ ] No secrets, `.env` files, or build artifacts are staged
- [ ] PR description explains the problem, the solution, and provides screenshots for visual changes
