export default function LeaderboardPage() {
  return (
    <section>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
        Leader Board
      </h1>

      <p style={{ color: '#b8b8bd', marginBottom: '24px' }}>
        Main competition ranking will be here.
      </p>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '20px',
            background: '#19191d',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <strong>1st Place</strong>
          <p style={{ marginTop: '8px', color: '#b8b8bd' }}>
            Top performer card
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '20px',
            background: '#19191d',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <strong>2nd Place</strong>
          <p style={{ marginTop: '8px', color: '#b8b8bd' }}>
            Top performer card
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '20px',
            background: '#19191d',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <strong>3rd Place</strong>
          <p style={{ marginTop: '8px', color: '#b8b8bd' }}>
            Top performer card
          </p>
        </div>
      </div>
    </section>
  );
}
