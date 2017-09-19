import React, { Component } from 'react';
import '../styles/display.css';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { SideNav } from './SideNav';
import { Swatch } from './Swatch';
import { Pagination } from './Pagination';

class FamilyView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
      colorsDisplayed: this.props.curColors
    };

    this.redirectToColor = this.redirectToColor.bind(this);
  }

  redirectToColor() {
    this.props.getRandomColor()
      .then(res => {
        this.props.history.push(`/colors/${res.data.hex}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    const family = this.props.family;

    axios
      .get(`https://hh-server.herokuapp.com/api/family?fam=${family}`)
      .then(res => {
        console.log(res.data.length);
        this.setState({
          colorsDisplayed: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <main className="app-main">
        <SideNav redirectToColor={this.redirectToColor} />
        <div className="display-container">
          <div className="display-grid">
            {
              this.state.colorsDisplayed ?
                this.state.colorsDisplayed.map(color => <div
                  className="swatch-small"
                  key={color.id}
                >
                  <Link to={`/colors/${color.hex}`} >
                    <Swatch
                      hex={color.hex}
                      size="small"
                    />
                  </Link>
                </div>)
              : null
            }
            {
              this.state.colorsDisplayed?
                !this.state.colorsDisplayed.length ?
                  <div>No matches :(</div> : null
                : null
            }
          </div>
          <footer className="display-footer">
            <Pagination
              curPage={this.props.curPage}
              pages={this.props.pages}
            />
          </footer>
        </div>
      </main>
    );
  }
};

export default FamilyView;
