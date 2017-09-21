import React from 'react';

import { Swatch } from './Swatch';

const DetailView = (props) => {
  return (
    <div className="display-detail-container">
      <div className="swatch-large">
        <Swatch hex={props.color} />
      </div>
    </div>
  );
};

export { DetailView };
