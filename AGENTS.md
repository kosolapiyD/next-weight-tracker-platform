<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Weight War — Agent Rules

## Project Summary
Competitive weight-tracking platform. Groups of users submit weight weekly; the leaderboard ranks them by percentage of body weight lost from their start weight. Users have roles (`user`, `admin`). Features: leaderboard, weekly view, per-user progress charts, weight entry form, admin dashboard.

## Stack
| Concern       | Choice                                      |
|---------------|---------------------------------------------|
| Framework     | Next.js App Router (TypeScript)             |
| Database      | MongoDB via Mongoose                        |
| Auth          | NextAuth.js / Auth.js v5                    |
| Styling       | SCSS Modules + global theme (`src/styles/`) |
| State         | Server Components + URL state; no Redux     |
| Validation    | Zod (API routes only)                       |

**No Tailwind. No CSS-in-JS. No component libraries (MUI, Chakra, Radix, shadcn).** All UI is custom.

---

## Directory Map

```
src/
├── app/
│   ├── (auth)/              # Public route group: sign-in, sign-up
│   ├── (app)/               # Protected route group: all authenticated pages
│   │   ├── admin/           # Admin-only sub-group (role-guarded in layout.tsx)
│   │   ├── leaderboard/
│   │   ├── my-progress/
│   │   ├── log-weight/
│   │   └── user/[userId]/
│   └── api/                 # Route Handlers — one folder per endpoint
├── components/
│   ├── ui/                  # Base primitives: Button, Card, Input, Badge, Table
│   ├── charts/              # Chart wrappers (recharts or similar)
│   ├── layout/              # Shell, Sidebar, Header
│   ├── navigation/          # SideNav, Breadcrumbs
│   └── features/            # Feature-scoped: leaderboard/, weight/, user/
├── lib/
│   ├── db/
│   │   ├── mongodb.ts       # Singleton connection — always import from here
│   │   └── models/          # Mongoose models (*.model.ts)
│   ├── auth/
│   │   └── auth.config.ts   # NextAuth config; exports { auth, handlers, signIn, signOut }
│   └── utils/
│       ├── calculations.ts  # weightLossPercent, rankByWeightLoss, isoWeek
│       └── formatters.ts    # Date/number display helpers
├── hooks/                   # Custom React hooks (use-*.ts)
├── types/                   # Shared interfaces (*.types.ts)
├── styles/
│   └── theme/               # SCSS design tokens — see SCSS section below
└── proxy.ts                 # Auth route protection (Next.js 16: middleware → proxy)
```

---

## Critical: Server vs Client Components

- **Default: Server Component.** Never add `'use client'` without a concrete reason.
- Add `'use client'` **only when** you need: hooks (`useState`, `useEffect`, `useRouter`, `usePathname`), event handlers, browser APIs, or third-party client-only libs.
- **Never fetch data in Client Components.** Fetch in Server Components; pass data as props.
- Never call server actions directly from Client Components without `useTransition` or `useActionState`.
- Charts, animated counters, interactive tables — these need `'use client'`. Static layouts do not.

---

## File & Naming Conventions

| Thing              | Convention                              | Example                         |
|--------------------|-----------------------------------------|---------------------------------|
| Files              | `kebab-case`                            | `weight-form.tsx`               |
| Folders            | `kebab-case`                            | `my-progress/`                  |
| Components         | PascalCase named export, matching file  | `WeightForm.tsx` → `export function WeightForm` |
| Type files         | `*.types.ts`                            | `user.types.ts`                 |
| Model files        | `*.model.ts`                            | `user.model.ts`                 |
| Hook files         | `use-*.ts`                              | `use-leaderboard.ts`            |
| Util files         | `kebab-case.ts`                         | `calculations.ts`               |

### Component folder structure
Each component lives in its own folder with co-located styles:
```
WeightForm/
  WeightForm.tsx
  WeightForm.module.scss
  index.ts               ← re-exports: export { WeightForm } from './WeightForm'
```

---

## SCSS Rules

### Theme system location: `src/styles/theme/`

| File                 | Contents                                                    |
|----------------------|-------------------------------------------------------------|
| `_variables.scss`    | All design tokens: colors, spacing, radii, shadows, z-index |
| `_typography.scss`   | Font families, sizes, weights, line-heights, tracking       |
| `_breakpoints.scss`  | `$breakpoints` map + `respond-to` / `respond-below` mixins  |
| `_mixins.scss`       | Utility mixins: `flex-center`, `card`, `glass`, `truncate`  |
| `_animations.scss`   | Keyframe definitions + duration/easing presets              |
| `_index.scss`        | Barrel: `@forward`s all of the above                        |

### How to use in a component module
```scss
// Path is relative from the component file to src/styles/theme/
// src/components/navigation/   → @use '../../styles/theme' as t;
// src/app/(app)/leaderboard/   → @use '../../../styles/theme' as t;
// src/app/                     → @use '../styles/theme' as t;
@use '../../styles/theme' as t;  // adjust depth as needed

.card {
  background: t.$color-bg-card;
  border-radius: t.$radius-lg;
  padding: t.$space-6;

  @include t.respond-to(md) {
    padding: t.$space-8;
  }
}
```

Turbopack (the default bundler in Next.js 16) does not support `sassOptions.includePaths`.
Use relative paths — calculate `../` depth from the SCSS file to `src/styles/theme`.

### Rules
- **Never hardcode colors, font sizes, or spacing.** Use `t.$` variables.
- Never `@import` — always `@use` / `@forward` (the old `@import` is deprecated).
- `globals.scss` is imported once in `app/layout.tsx`. It contains only: CSS custom properties on `:root`, a reset, and base element styles. Never put component styles here.
- Use flat BEM-like class names inside modules: `.root`, `.header`, `.item`, `.item--active`.

---

## API Routes (`src/app/api/`)

```ts
// Pattern for every route handler:
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ weight: z.number().positive() });

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const result = schema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: result.error.flatten() }, { status: 400 });

  // ... DB logic
  return NextResponse.json({ ok: true }, { status: 201 });
}
```

- Every mutating handler checks auth first.
- Validate all input with Zod before touching the DB.
- Return structured `{ error: string }` on failure — never let unhandled exceptions reach the client.
- Use explicit HTTP status codes.

---

## MongoDB / Mongoose

- Connection singleton: `src/lib/db/mongodb.ts` — always import from here.
- Import models **inside async functions**, not at module top level (avoids Next.js hot-reload issues).
- All model files: named export of the Mongoose model.
- Use `.lean<T>()` for read-only queries — returns plain objects, not Mongoose Documents.

```ts
// Inside an async function:
const { UserModel } = await import('@/lib/db/models/user.model');
const users = await UserModel.find().lean<IUser[]>();
```

---

## Auth (NextAuth v5 / Auth.js)

- Config: `src/lib/auth/auth.config.ts` — exports `{ auth, handlers, signIn, signOut }`.
- In Server Components / Route Handlers: `const session = await auth();`
- In Client Components: `useSession()` from `next-auth/react` — requires `<SessionProvider>` in root layout.
- Protect pages at the **route-group layout level**: `(app)/layout.tsx` checks session.
- Admin pages: check `session.user.role === 'admin'` in `(app)/admin/layout.tsx`.

---

## Core Business Logic

- **Ranking metric**: `((startWeight - currentWeight) / startWeight) * 100` — higher is better.
- All calculation functions live in `src/lib/utils/calculations.ts` — import from there, never re-implement.
- One weight entry per user per week — enforced server-side using `isoWeek()` from calculations.ts.
- `startWeight` = the user's very first weight entry. It never changes once set.

---

## TypeScript

- All shared types in `src/types/` — import from there, never re-declare inline.
- `interface` for object shapes; `type` for unions, intersections, and aliases.
- Avoid `any` — use `unknown` + type guards instead.
- Mongoose model types: define the interface in `src/types/`, use it in the model as `Model<IUser>`.
- NextAuth session extensions live in `src/types/auth.types.ts` (module augmentation).

---

## Do NOT

- Add Tailwind, Emotion, styled-components, or any CSS-in-JS.
- Add component libraries (MUI, Chakra, Radix, shadcn).
- Use the `pages/` directory — this is App Router only.
- Hardcode color/spacing values in CSS — use theme variables.
- Fetch inside `useEffect` — use Server Components or SWR/React Query if client-side is required.
- Use `getServerSideProps` / `getStaticProps` — they do not exist in App Router.
- Skip Zod validation on any external input.
- Create new MongoDB connections outside of `src/lib/db/mongodb.ts`.
- Create a `middleware.ts` file — the convention is deprecated in Next.js 16. Use `proxy.ts` with an exported `proxy()` function instead.
- Use `sassoptions.includePaths` expecting it to work in Turbopack — it does not. Use relative `@use` paths in all SCSS files.
