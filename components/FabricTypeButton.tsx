'use client'

interface FabricTypeButtonProps {
  name: string
  icon: string
  color: string
}

export default function FabricTypeButton({ name, icon, color }: FabricTypeButtonProps) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 24px',
        background: 'white',
        borderRadius: '50px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
        border: '1px solid var(--color-border)',
        cursor: 'pointer',
        transition: 'all 0.25s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color
      }}>
        <i className={icon}></i>
      </div>
      <span style={{ fontWeight: 600, fontSize: '15px' }}>{name}</span>
    </div>
  )
}
