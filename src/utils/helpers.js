import React from 'react';
import { Link } from 'react-router-dom';

export const createPageLis = (count, curPage) => {
  const pages = [];
  let liClass;

  for (let i = 0; i < count; i++) {
    // liClass = i + 1 === curPage ? 'pagination-active' : null;

    pages.push(
      <Link
        className="pagination-link"
        key={i + 1}
        to={`/colors/${i + 1}`}
      >
        {/* <li className={liClass} > */}
        <li>
          { i + 1 }
        </li>
      </Link>
    );
  }

  return pages;
};
