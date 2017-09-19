import React from 'react';
import { Swatch } from './Swatch';

import { Link } from 'react-router-dom';

const DetailView = (props) => {
  console.log(props);
  return (
    <div className="display-container">
      <div className="display-detail">
        <div className="swatch-large">
          <Swatch hex={props.location.hash} />
        </div>
      </div>
      <footer className="display-footer">
        <div
          className="display-clear"
          onClick={props.history.goBack}
        >
          Clear
        </div>
      </footer>
    </div>
  );
};

export { DetailView };
