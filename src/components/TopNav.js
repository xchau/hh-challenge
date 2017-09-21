import React from 'react';
import logo from '../assets/images/logo-symbol.svg';

const TopNav = (props) => {
  return (
    <nav className="topnav-container">
      <div className="topnav-content">
        <img
          alt="logo"
          className="topnav-logo"
          src={logo}
        />
        { props.children }
      </div>
    </nav>
  );
};

export { TopNav };
