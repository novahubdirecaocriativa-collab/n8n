import React from 'react';
import { Composition } from 'remotion';
import { Carousel } from './Carousel';
import { CAROUSEL_WIDTH, CAROUSEL_HEIGHT, FPS, SLIDE_DURATION_FRAMES } from './theme';

const TOTAL_SLIDES = 5;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full carousel as video */}
      <Composition
        id="NovahubCarousel"
        component={Carousel}
        durationInFrames={SLIDE_DURATION_FRAMES * TOTAL_SLIDES}
        fps={FPS}
        width={CAROUSEL_WIDTH}
        height={CAROUSEL_HEIGHT}
      />
    </>
  );
};
