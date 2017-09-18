import React from 'react';
import '../styles/swatch.css';

import { Link } from 'react-router-dom';

const Swatch = (props) => {
  return (
    <Link to={`/colors/${props.hex}`}>
      <div className="swatch-container">
        <div
          className="swatch-display"
          style={{ backgroundColor: props.hex }}
        />
        <div className="swatch-label">
          { props.hex }
        </div>
      </div>
    </Link>
  );
};

export { Swatch };
