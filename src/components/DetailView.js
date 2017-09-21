import React from 'react';

import { Swatch } from './Swatch';

import { hexToRgb, generateTint } from '../utils/helpers.js';

const DetailView = (props) => {
  const rgb = hexToRgb(props.color);
  const tints = [];

  tints[0] = generateTint(rgb, -40);
  tints[1] = generateTint(rgb, -20);
  tints[2] = generateTint(rgb, 0);
  tints[3] = generateTint(rgb, 20);
  tints[4] = generateTint(rgb, 40);

  return (
    <div className="display-detail-container">
      <div className="swatch-large">
        <Swatch hex={props.color} />
      </div>
      <div className="display-tint-container">
        {
          tints.map((tint, idx) => (
            <div className="swatch-small" key={idx}>
              <Swatch hex={tint} size="small" />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export { DetailView };
