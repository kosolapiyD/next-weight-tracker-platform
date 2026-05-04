export default function MyProgressPage() {
  return (
    <section>
      <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
        My Progress
      </h1>

      <p style={{ color: '#b8b8bd', marginBottom: '24px' }}>
        Personal stats and charts will be here.
      </p>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <div
          style={{
            minHeight: '180px',
            padding: '20px',
            borderRadius: '20px',
            background: '#19191d',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <strong>Current Stats</strong>
        </div>

        <div
          style={{
            minHeight: '180px',
            padding: '20px',
            borderRadius: '20px',
            background: '#19191d',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <strong>Progress Chart</strong>
        </div>
      </div>
    </section>
  );
}
