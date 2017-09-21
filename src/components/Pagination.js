import React from 'react';
import '../styles/display.css';

import { Link } from 'react-router-dom';

const Pagination = (props) => {
  const pages = [];
  const totalPages = Math.ceil(
    props.count / props.perPage
  );

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }

  console.log(props);

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
