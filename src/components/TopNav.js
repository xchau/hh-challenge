import React from 'react';
import '../styles/topnav.css';
import logo from '../assets/images/logo-symbol.svg';


class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.search);
  }

  render() {
    return (
      <nav className="topnav-container">
        <div className="topnav-content">
          <img
            alt="logo"
            className="topnav-logo"
            src={logo}
          />
          <form
            className="topnav-form"
            onSubmit={this.handleSubmit}
            >
              <input
                className="topnav-searchbar"
                onChange={this.handleChange}
                placeholder="Search"
                type="text"
                value={this.state.search}
              />
              <span>X</span>
            </form>
          </div>
        </nav>
      );
  }
};

export default TopNav;
