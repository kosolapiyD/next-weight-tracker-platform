// NextAuth session type augmentation.
// This file requires next-auth to be installed:
//   npm install next-auth@beta
//
// Once installed, uncomment the block below so TypeScript knows about our
// custom session fields (id, role) throughout the codebase.

import type { UserRole } from './user.types';

// Suppress lint warning on unused import — UserRole is used in the block below.
export type { UserRole };

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       role: UserRole;
//     } & DefaultSession['user'];
//   }
//
//   interface User {
//     role: UserRole;
//   }
// }
