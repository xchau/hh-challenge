import React, { Component } from 'react';
import '../styles/display.css';

import axios from 'axios';

import { Swatch } from './Swatch';
import { Pagination } from './Pagination';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorsDisplayed: null
    };
  }

  componentDidMount() {
    const start = this.props.perPage * (this.props.curPage - 1);
    const limit = this.props.perPage;

    axios
      .get(`http://localhost:8000/api/colors/${start}/${limit}`)
      .then(res => {
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
      <div className="display-container">
        <div className="display-content">
          {
            this.state.colorsDisplayed ?
              this.state.colorsDisplayed.map(color => <div
                className="swatch-small"
                key={color.id}
              >
                <Swatch hex={color.hex} />
              </div>)
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
    );
  }
};

export default Display;
