import styles from './page.module.scss';

export default function LeaderboardPage() {
  return (
    <section>
      <h1 className={styles.title}>Leader Board</h1>

      <p className={styles.subtitle}>Main competition ranking will be here.</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <strong>1st Place</strong>
          <p className={styles.cardText}>Top performer card</p>
        </div>

        <div className={styles.card}>
          <strong>2nd Place</strong>
          <p className={styles.cardText}>Top performer card</p>
        </div>

        <div className={styles.card}>
          <strong>3rd Place</strong>
          <p className={styles.cardText}>Top performer card</p>
        </div>
      </div>
    </section>
  );
}
