import React from 'react';
import '../styles/sidenav.css';

const SideNav = (props) => {
  return (
    <nav className="sidenav-container">
      <button
        onClick={props.redirectToColor}
        className="sidenav-random"
      >
        Random Color
      </button>
      <ul>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </ul>
    </nav>
  );
};

export { SideNav };
