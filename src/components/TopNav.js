import React from 'react';
import '../styles/topnav.css';
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
        <input
          className="topnav-searchbar"
          placeholder="Search"
          type="text"
        />
      </div>
    </nav>
  );
};

export { TopNav };
