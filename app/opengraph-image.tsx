import { ImageResponse } from 'next/og';
import { MEDHEE_LOGO_PNG_DATA_URI } from '@/lib/brand-image';

export const runtime = 'nodejs';
export const alt = 'Medhee | Healthcare that remembers you';
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
          <div style={{ width: 64, height: 64, borderRadius: 16, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={MEDHEE_LOGO_PNG_DATA_URI} width="56" height="56" alt="" />
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#FFFFFF' }}>Medhee</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
            Healthcare that remembers you.
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#A7F3D0' }}>
            Medicines · Lab reports · Doctor consults · English & Hindi
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#94A3B8' }}>medhee.com</div>
      </div>
    ),
    { ...size },
  );
}
