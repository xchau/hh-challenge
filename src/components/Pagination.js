import React from 'react';
import '../styles/display.css';

import { Link } from 'react-router-dom';

const Pagination = (props) => {
  return (
    <ul className="pagination-ul">
      {
        props.pages ?
          props.pages.map(page => {
            let liClass = `pagination-link ${page === props.curPage ? 'pagination-active' : null}`;

            return <Link
              className={liClass}
              key={page}
              to={`/colors/${page}`}
            >
              <li>
                {page}
              </li>
            </Link>
          })
          : null
      }
    </ul>
  );
};

export { Pagination };
