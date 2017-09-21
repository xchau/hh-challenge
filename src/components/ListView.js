import React from 'react';

import { Link } from 'react-router-dom';

import { Swatch } from './Swatch';

const ListView = (props) => {
  return (
    <div className="display-list-container">
      {
        props.colorsToDisplay ?
          props.colorsToDisplay.map(color => (
            <div
              className="swatch-small"
              key={color.id}
            >
              <Link to={`/colors/${color.hex}`}>
                <Swatch
                  hex={color.hex}
                  size="small"
                />
              </Link>
            </div>
          ))
        : null
      }
    </div>
  );
};

export { ListView };
