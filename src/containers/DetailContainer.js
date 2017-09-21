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

    this.getRandomColor = this.getRandomColor.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  getRandomColor() {
    let randId = Math.floor(Math.random() * (this.state.count - 1) + 1);
    axios
      .get('http://localhost:8000/api/colors')
      .then(res => {
        randId = Math.floor(Math.random() * (res.data.count - 1) + 1);

        return axios
          .get(`http://localhost:8000/api/color/${randId}`)
      })
      .then(color => {
        this.props.history.push(`/colors/${color.data.hex}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  goHome() {
    this.props.history.push('/');
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      this.setState({
        color: location.hash
      });
    });
  }

  componentWillUnmount() {
    // returns unlisten
    this.unlisten = this.props.history.listen();
    this.unlisten();
  }

  render() {
    return (
      <div className="app-layout">
        <TopNav goHome={this.goHome}>
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
          <SideNav
            getRandomColor={this.getRandomColor}
          />
          <div className="app-display">
            <DetailView color={this.state.color} />
            <div className="display-footer">
              <div
                className="display-clear"
                onClick={this.goHome}
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
