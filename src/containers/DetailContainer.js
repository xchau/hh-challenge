import React, { Component } from 'react';
import axios from 'axios';

import { TopNav } from '../components/TopNav';
import { SideNav } from '../components/SideNav';
import { DetailView } from '../components/DetailView';

class DetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.location.hash
    };

    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="app-layout">
        <TopNav>
          <form
            className="topnav-form"
            onSubmit={this.handleSubmit}
            >
              <input
                className="topnav-searchbar"
                onChange={this.handleChange}
                placeholder="Search"
                type="text"
                value={this.state.searchTerm}
              />
              <div
                className="topnav-clear"
                onClick={this.handleClear}
              >
                &#10005;
              </div>
            </form>
        </TopNav>
        <div className="app-main">
          <SideNav />
          <div className="app-display">
            <DetailView color={this.state.color} />
            <div className="display-footer">
              <div
                className="display-clear"
                onClick={this.redirectToHome}
              >
                Clear
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailContainer;
