'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './side-nav.module.scss';

const navItems = [
  { href: '/leaderboard', label: 'Leader Board' },
  { href: '/my-progress', label: 'My Progress' },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandTitle}>Weight War</span>
        <span className={styles.brandSubtitle}>Compete. Track. Win.</span>
      </div>

      <ul className={styles.list}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
