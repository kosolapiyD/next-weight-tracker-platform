import styles from './page.module.scss';

export default function MyProgressPage() {
  return (
    <section>
      <h1 className={styles.title}>My Progress</h1>

      <p className={styles.subtitle}>Personal stats and charts will be here.</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <strong>Current Stats</strong>
        </div>

        <div className={styles.card}>
          <strong>Progress Chart</strong>
        </div>
      </div>
    </section>
  );
}
