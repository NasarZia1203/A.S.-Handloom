'use client'

import Image from 'next/image'
import ThreeDTilt from '@/components/ThreeDTilt'

const heritageSteps = [
  {
    step: '01',
    icon: 'fas fa-seedling',
    title: 'Cocoon & Yarn Harvesting',
    description: 'Authentic Bhagalpuri Tussar silk harvested from local forests, meticulously hand-reeled to preserve natural golden luster and breathable texture.',
    badge: 'Raw Material Purity',
    color: '#B38728',
    bg: '#FFF9E6',
  },
  {
    step: '02',
    icon: 'fas fa-palette',
    title: 'Natural Dyeing & Warping',
    description: 'Yarns are dyed in soft pastel tones using AZO-free botanical and gentle reactive pigments, aligned with sustainable artisanal methods.',
    badge: 'Eco-conscious Dyeing',
    color: '#C2596A',
    bg: '#FDF2F4',
  },
  {
    step: '03',
    icon: 'fas fa-ring',
    title: 'Pit-Loom Weaving',
    description: 'Weft and warp interlock on traditional Bhagalpur pit-looms. Each saree requires 48 to 72 continuous hours of skilled artisan dedication.',
    badge: 'Pit-Loom Heritage',
    color: '#2D6A4F',
    bg: '#F0F7F2',
  },
  {
    step: '04',
    icon: 'fas fa-truck-fast',
    title: 'Pan-India & Global Delivery',
    description: 'Every roll and saree is thoroughly examined, steam-finished, watermarked, and dispatched with tamper-evident courier or air cargo.',
    badge: 'Inspected & Delivered',
    color: '#C05634',
    bg: '#FDF4F0',
  },
]

interface AboutProps {
  heading?: string
  subheading?: string
}

export default function About({
  heading = 'From Ancestral Pit-Looms to Your Doorstep',
  subheading = 'Nestled along the Ganges in Bhagalpur, Bihar, our pit-loom weaving lineage spans generations. At A S Handloom (incorporating our flagship retail boutique Linen Galaxy), under the stewardship of MD RAZA ALAM, we preserve this venerable heritage by keeping master artisans and pure natural fibers at the heart of our craft.',
}: AboutProps = {}) {
  return (
    <section id="about" className="section-lux" style={{ background: '#FAF8F5', padding: '90px 0' }}>
      <div className="container-lux">
        {/* Header with Golden Ratio hierarchy */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <span className="golden-eyebrow" style={{ color: '#B38728' }}>
            The Living Heritage of Bhagalpur • Since 2007
          </span>
          <h2 className="golden-h1" style={{ margin: '14px 0 18px', color: '#111827' }}>
            {heading}
          </h2>
          <p className="golden-lead" style={{ color: '#4B5563' }}>
            {subheading}
          </p>
        </div>

        {/* Workshop Imagery 3D Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '64px',
        }}>
          <ThreeDTilt intensity={8}>
            <div 
              className="pastel-card" 
              style={{ 
                padding: '16px', 
                borderRadius: '24px',
                border: '1.5px solid rgba(197, 160, 89, 0.25)',
                background: '#FFFFFF',
                boxShadow: '0 12px 32px -8px rgba(17, 24, 39, 0.08)',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '18px', overflow: 'hidden', background: '#F5EFEB' }}>
                <Image
                  src="/assets/ASHandloomWorkshop.webp"
                  alt="A S Handloom Weaving Workshop Bhagalpur"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '20px 10px 8px' }}>
                <span className="pastel-badge pastel-badge-gold" style={{ marginBottom: '8px' }}>
                  Pit-Loom Weaving Loft
                </span>
                <h4 style={{ fontSize: '1.3rem', color: '#111827', fontWeight: 700, margin: '6px 0 8px' }}>
                  Traditional Pit-Loom Weaving Floor
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Where skilled master weavers handcraft pure Tussar silk, soft cotton, and fine linen textiles with geometric jacquards and authentic zari borders.
                </p>
              </div>
            </div>
          </ThreeDTilt>

          <ThreeDTilt intensity={8}>
            <div 
              className="pastel-card" 
              style={{ 
                padding: '16px', 
                borderRadius: '24px',
                border: '1.5px solid rgba(197, 160, 89, 0.25)',
                background: '#FFFFFF',
                boxShadow: '0 12px 32px -8px rgba(17, 24, 39, 0.08)',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '18px', overflow: 'hidden', background: '#F5EFEB' }}>
                <Image
                  src="/assets/ASHandloomOffice.webp"
                  alt="A S Handloom Fabric Office and Dispatch Facility"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '20px 10px 8px' }}>
                <span className="pastel-badge pastel-badge-sage" style={{ marginBottom: '8px' }}>
                  Inspection & Dispatch Loft
                </span>
                <h4 style={{ fontSize: '1.3rem', color: '#111827', fontWeight: 700, margin: '6px 0 8px' }}>
                  Wholesale Bolt & Retail Dispatch
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Located on M T N Ghosh Road in Champanagar, Bhagalpur, housing our quality inspection benches, swatch archives, and parcel dispatch lines.
                </p>
              </div>
            </div>
          </ThreeDTilt>
        </div>

        {/* 4-Step 3D Manufacturing Process Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {heritageSteps.map((item, idx) => (
            <ThreeDTilt key={idx} intensity={8}>
              <div
                className="pastel-card"
                style={{
                  padding: '32px 26px',
                  height: '100%',
                  borderRadius: '24px',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(197, 160, 89, 0.22)',
                  boxShadow: '0 10px 28px -6px rgba(17, 24, 39, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: item.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        fontSize: '20px',
                        boxShadow: `0 4px 14px ${item.bg}`,
                      }}
                    >
                      <i className={item.icon}></i>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'rgba(197, 160, 89, 0.35)',
                      lineHeight: 1,
                    }}>
                      {item.step}
                    </span>
                  </div>

                  <span 
                    style={{ 
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: item.color, 
                      marginBottom: '10px' 
                    }}
                  >
                    {item.badge}
                  </span>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: '#111827', fontWeight: 700 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </ThreeDTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
