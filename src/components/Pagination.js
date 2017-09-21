import React from 'react';

import { Link } from 'react-router-dom';

const Pagination = (props) => {
  const pages = [];

  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i + 1);
  }

  return (
    <ul className="pagination-ul">
      {
        pages.map(page => {
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
      }
    </ul>
  );
};

export { Pagination };
