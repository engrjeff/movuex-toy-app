import type { CSSProperties } from 'react';

const containerStyles: CSSProperties = {
  aspectRatio: '16 / 9',
};

const iframeStyles: CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
};

export default function YouTube({ id }: { id: string }) {
  return (
    <div style={containerStyles}>
      <iframe
        style={iframeStyles}
        src={`https://www.youtube.com/embed/${id}`}
        allow='autoplay; encrypted-media'
        title='Embedded YouTube video'
      />
    </div>
  );
}
