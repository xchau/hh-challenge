import React from 'react';
import '../styles/display.css';

import { Pagination } from './Pagination';

const Display = (props) => {
  console.log(props);
  return (
    <div className="display-container">
      zzz

      <div className="display-pagination-container">
        <Pagination
          curPage={props.curPage}
          pages={props.pages}
        />
      </div>
    </div>
  );
};

export { Display };
