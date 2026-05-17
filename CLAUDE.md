@AGENTS.md

# Project: Weight War

Competitive weight-tracking platform for small groups. Users submit their weight once per week; the leaderboard ranks them by percentage of body weight lost from their start weight. Social pressure as motivation — competition is the core mechanic.

## Current State
Foundation stage. Core pages scaffolded (leaderboard, my-progress), no database, no auth, no real data yet.

## Priority Build Order
1. Auth — NextAuth v5 + MongoDB adapter + User model + sign-in/sign-up pages
2. Weight entry form + weekly submission API (enforce one entry per user per week)
3. Leaderboard calculation + ranking display
4. Per-user progress view + weight charts over time
5. Admin dashboard (manage users, edit/delete entries, view all data)
6. Settings page

## Key Domain Rules
- **Ranking**: `((startWeight - currentWeight) / startWeight) * 100` — higher percentage = better rank
- **Entry cadence**: exactly one weight entry per user per calendar week (ISO week), enforced server-side
- **Start weight**: the user's very first entry — immutable, never recalculated
- **Roles**: `user` (default) and `admin` (can manage all users and entries)
- **Units**: track in kg; display conversion optional later

## Design System
Dark theme. Accent color: crimson red (`#c51d2e`). SCSS theme is at `src/styles/theme/`.
User will supply final color palette and typography via design images — placeholders are in `_variables.scss` and `_typography.scss`.
