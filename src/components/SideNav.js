import React from 'react';

import { Link } from 'react-router-dom';

const SideNav = (props) => {
  return (
    <nav className="sidenav-container">
      <button
        onClick={props.getRandomColor}
        className="sidenav-random"
      >
        Random Color
      </button>
      <ul className="sidenav-ul">
        <li>
          <Link to="/family/red">
            Red
          </Link>
        </li>
        <li>
          <Link to="/family/orange">
            Orange
          </Link>
        </li>
        <li>
          <Link to="/family/yellow">
            Yellow
          </Link>
        </li>
        <li>
          <Link to="/family/green">
            Green
          </Link>
        </li>
        <li>
          <Link to="/family/blue">
            Blue
          </Link>
        </li>
        <li>
          <Link to="/family/purple">
            Purple
          </Link>
        </li>
        <li>
          <Link to="/family/brown">
            Brown
          </Link>
        </li>
        <li>
          <Link to="/family/gray">
            Gray
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { SideNav };
