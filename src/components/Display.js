import React from 'react';
import '../styles/display.css';

import { Pagination } from './Pagination';

const Display = (props) => {
  console.log(props);
  return (
    <div className="display-container">
      <div className="display-content">
        zzz
      </div>
      <footer className="display-footer">
        <Pagination
          curPage={props.curPage}
          pages={props.pages}
        />
      </footer>
    </div>
  );
};

export { Display };
