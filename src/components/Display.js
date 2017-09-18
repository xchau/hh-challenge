import React from 'react';
import '../styles/display.css';

import { Pagination } from './Pagination';

const Display = (props) => {
  console.log(props);
  return (
    <div className="display-container">
      zzz

      <div className="display-pagination-container">
        <Pagination pages={props.pages} />
      </div>
    </div>
  );
};

export { Display };
