import React, { Component } from 'react';
import axios from 'axios';

import { TopNav } from '../components/TopNav';
import { SideNav } from '../components/SideNav';
import { ListView } from '../components/ListView';
import { Pagination } from '../components/Pagination';

class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorsToDisplay: null,
      searchTerm: '',
      count: null,
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getColors = this.getColors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getColors(family) {
    const curPage = this.props.curPage;
    const perPage = this.props.perPage;
    const url = family ?
      `http://localhost:8000/api/colors?page=${curPage}&&limit=${perPage}&&family=${family}` : `http://localhost:8000/api/colors?page=${curPage}&&limit=${perPage}`;

    axios
      .get(url)
      .then(res => {
        console.log(res);
        this.setState({
          colorsToDisplay: res.data.colors,
          count: res.data.count
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClear() {
    // window.location.reload(true);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    // this.props.handleSubmit(this.state.search);
  }

  componentDidMount() {
    const path = this.props.location.pathname.split('/');

    if (path[1] === 'family') {
      this.getColors(path[3]);
    }
    else {
      this.getColors();
    }
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
            <ListView
              colorsToDisplay={this.state.colorsToDisplay}
            />
            <div className="display-footer">
              <Pagination
                curPage={this.props.curPage}
                count={this.state.count}
                perPage={this.props.perPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
