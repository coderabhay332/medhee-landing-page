import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Medhee — Personal Health Operating System & Drug Safety';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0B1E19 0%, #102A22 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: '#0D9488' }} />
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#FFFFFF' }}>Medhee</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
            Healthcare that remembers you.
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#A7F3D0' }}>
            Personal Health OS · Drug Safety · Medication Guides
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#94A3B8' }}>medhee.com</div>
      </div>
    ),
    { ...size },
  );
}
