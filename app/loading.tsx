export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-background, #FFF8F5)',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(233, 30, 99, 0.15)',
          borderTopColor: '#E91E63',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748B',
          letterSpacing: '0.5px',
        }}
      >
        Loading A S Handloom...
      </div>
    </div>
  )
}
