import React from 'react';
import {Composition} from 'remotion';
import {ConstraintBook} from './video/ConstraintBook';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ConstraintBook"
    component={ConstraintBook}
    durationInFrames={1146}
    fps={30}
    width={1920}
    height={1080}
  />
);
