import React from 'react';
import '../styles/swatch.css';

const Swatch = (props) => {
  return (
    <div className="swatch-container">
      <div
        className="swatch-display"
        style={{ backgroundColor: props.hex }}
      ></div>
      <div className="swatch-label">
        { props.hex }
      </div>
    </div>
  );
};

export { Swatch };
