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
      curPage: null,
      colorsToDisplay: null,
      perPage: 12,
      totalPages: null,
      searchTerm: '',
      searching: false
    };

    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getColors = this.getColors.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getColors(family) {
    const curPage = this.state.curPage;
    const perPage = this.state.perPage;
    const url = family ?
      `http://localhost:8000/api/colors?page=${curPage}&&limit=${perPage}&&family=${family}` : `http://localhost:8000/api/colors?page=${curPage}&&limit=${perPage}`;

    axios
      .get(url)
      .then(res => {
        const totalPages =  Math.ceil(
          res.data.count / this.state.perPage
        );

        this.setState({
          colorsToDisplay: res.data.colors,
          count: res.data.count,
          totalPages
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getRandomColor() {
    let randId = Math.floor(Math.random() * (this.state.count - 1) + 1);

    axios
      .get(`http://localhost:8000/api/color/${randId}`)
      .then(color => {
        this.props.history.push(`/colors/${color.data.hex}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClearSearch() {
    this.getColors();
    this.setState({
      searchTerm: '',
      searching: false
    });
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let hex = this.state.searchTerm;

    if (hex[0] === '#') hex = hex.slice(1);

    axios
      .get(`http://localhost:8000/api/search?color=${hex}`)
      .then(res => {
        this.setState({
          colorsToDisplay: res.data.colors,
          searching: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    const path = this.props.location.pathname.split('/');

    // update current page indicator based on url
    if ((path[1] === 'colors' || path[1] === 'family') && path[2]) {
      this.setState({
        curPage: Number.parseInt(path[2], 10) || 1
      }, () => {
        // make call to appropriate endpoint
        if (path[1] === 'family') {
          this.getColors(path[2]);
        }
        else {
          this.getColors();
        }
      });
    }
    else if (!path[1]) {
      this.setState({
        curPage: 1
      }, () => {
        this.getColors();
      });
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
                onClick={this.handleClearSearch}
              >
                &#10005;
              </div>
            </form>
        </TopNav>
        <div className="app-main">
          <SideNav
            getRandomColor={this.getRandomColor} />
          <div className="app-display">
            <ListView
              colorsToDisplay={this.state.colorsToDisplay}
            />
            <div className="display-footer">
              {
                this.state.searching ? null :
                <Pagination
                  curPage={this.state.curPage}
                  totalPages={this.state.totalPages}
                  perPage={this.state.perPage}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
