import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 16,
          background: 'linear-gradient(135deg, rgba(200,169,126,0.15), rgba(200,169,126,0.05))',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C8A97E',
          borderRadius: '50%',
          border: '2px solid rgba(200,169,126,0.4)',
          fontFamily: 'sans-serif',
          fontWeight: 700,
        }}
      >
        AK
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
