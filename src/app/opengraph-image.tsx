/* eslint-disable react/no-unknown-property */
import { readFileSync } from 'fs';
import LocalFont from 'next/font/local';
import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'danscan.xyz | Computing Enthusiast';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const fetchFont = fetch(
  new URL('../../public/fonts/ArgentPixelCF-Italic.otf', import.meta.url).href
).then((res) => res.arrayBuffer());

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
        <div tw="flex flex-col text-white">
          <div
            style={{ fontFamily: "'ArgentPixelCF', sans-serif" }}
            tw="text-6xl italic mb-3"
          >
            danscan
          </div>
          <div
            style={{ fontFamily: "'ArgentPixelCF', sans-serif" }}
            tw="text-3xl italic"
          >
            Computing Enthusiast
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          data: await fetchFont,
          style: 'italic',
          weight: 400,
          name: 'ArgentPixelCF',
        },
      ],
    }
  );
}
