import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // sassOptions.includePaths works only with Webpack (next build --webpack).
  // Turbopack (the default) does not support includePaths.
  // All SCSS files must use relative @use paths, e.g.:
  //   @use '../styles/theme' as t;          (from src/app/)
  //   @use '../../styles/theme' as t;       (from src/components/nav/)
  //   @use '../../../styles/theme' as t;    (from src/app/(app)/leaderboard/)
};

export default nextConfig;
