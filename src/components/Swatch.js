import React from 'react';
import '../styles/swatch.css';

const Swatch = (props) => {
  return (
    <div className="swatch-container">
      <div
        className="swatch-display"
        style={{ backgroundColor: props.hex }}
      />
      <div className={
        props.size === 'small' ?
          'swatch-label-small' :
          'swatch-label-large'
      }>
        { props.hex }
      </div>
    </div>
  );
};

export { Swatch };
