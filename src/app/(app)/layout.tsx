import type { ReactNode } from 'react';
import { SideNav } from '@/components/navigation/side-nav';
import styles from '@/components/layout/app-shell.module.scss';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <SideNav />
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
