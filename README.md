# Weight War

Competitive weight-tracking platform for small groups. Users submit their weight once per week and the leaderboard ranks everyone by percentage of body weight lost from their start weight. Social pressure as motivation — competition is the core mechanic.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 — App Router (TypeScript) |
| Database | MongoDB via Mongoose |
| Auth | NextAuth.js / Auth.js v5 |
| Styling | SCSS Modules + custom theme system |
| Fonts | Bebas Neue (display) · DM Sans (UI) |
| Validation | Zod (API routes) |

No Tailwind. No component libraries. All UI is custom.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Sign-in, sign-up
│   ├── (app)/           # Protected pages: leaderboard, my-progress, log-weight, user/[id], admin/
│   └── api/             # Route Handlers
├── components/
│   ├── ui/              # Base primitives: Button, Card, Input, Badge, Table
│   ├── charts/          # Chart wrappers
│   ├── layout/          # App shell
│   ├── navigation/      # SideNav
│   └── features/        # leaderboard/, weight/, user/
├── lib/
│   ├── db/              # MongoDB singleton + Mongoose models
│   ├── auth/            # NextAuth config
│   └── utils/           # calculations.ts, formatters.ts
├── styles/theme/        # SCSS design tokens (variables, typography, mixins, animations)
├── types/               # Shared TypeScript interfaces
└── proxy.ts             # Auth route protection (Next.js 16)
```

---

## Key Domain Rules

- **Ranking metric**: `((startWeight − currentWeight) / startWeight) × 100` — higher % = better rank
- **Entry cadence**: exactly one weight submission per user per ISO calendar week, enforced server-side
- **Start weight**: the user's very first entry — immutable, never recalculated
- **Roles**: `user` (default) · `admin` (manages users and entries)
- **Units**: kilograms

---

## SCSS Theme

All design tokens live in `src/styles/theme/`. Import in any SCSS module with a relative path:

```scss
@use '../../styles/theme' as t;  // adjust depth as needed

.card {
  background: t.$color-bg-card;
  border-radius: t.$radius-xl;
  padding: t.$space-5;
}
```

Never hardcode colors, font sizes, or spacing — use `t.$` variables.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
