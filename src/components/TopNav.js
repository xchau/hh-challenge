import React from 'react';
import logo from '../assets/images/logo-symbol.svg';

import { Link } from 'react-router-dom';

const TopNav = (props) => {
  return (
    <nav className="topnav-container">
      <div className="topnav-content">
        <Link to="/">
          <img
            alt="logo"
            className="topnav-logo"
            onClick={props.goHome}
            src={logo}
          />
        </Link>
        { props.children }
      </div>
    </nav>
  );
};

export { TopNav };
