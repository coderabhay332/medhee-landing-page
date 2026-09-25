import { ImageResponse } from 'next/og';
import { getDrugBySlug } from '@/lib/drugs';

export const runtime = 'nodejs';
export const alt = 'Medhee drug information guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function DrugOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getDrugBySlug(slug);

  const drugName = article?.drugName || 'Medication guide';
  const generic = article?.genericName && article.genericName.toLowerCase() !== drugName.toLowerCase()
    ? article.genericName
    : null;
  const category = article?.primaryCategory || null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FAF9F6 0%, #F0FDF4 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, background: '#0D9488' }} />
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#0F172A' }}>Medhee</div>
          </div>
          {category && (
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                fontWeight: 600,
                color: '#0D9488',
                background: '#FFFFFF',
                border: '1px solid #A7F3D0',
                borderRadius: 999,
                padding: '10px 24px',
              }}
            >
              {category}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, color: '#0F172A', lineHeight: 1.05 }}>
            {drugName}
          </div>
          {generic && <div style={{ display: 'flex', fontSize: 34, color: '#475569' }}>Generic: {generic}</div>}
          <div style={{ display: 'flex', fontSize: 30, color: '#475569', marginTop: 8 }}>
            Uses · Dosage · Side effects · Interactions
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#94A3B8' }}>Medication guide · medhee.com/drugs</div>
      </div>
    ),
    { ...size },
  );
}
