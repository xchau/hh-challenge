import React, { Component } from 'react';
import '../styles/display.css';

import axios from 'axios';

import { Swatch } from './Swatch';
import { Pagination } from './Pagination';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorsDisplayed: null
    };
  }

  async componentDidMount() {
    const start = this.props.perPage * (this.props.curPage - 1);
    const limit = this.props.perPage;
    const colors = await JSON.parse(localStorage.getItem('colors'));

    if (colors.slice(start, start + limit).every(e => e)) {
      console.log('from localStorage');
      this.setState({
        colorsDisplayed: colors.slice(start, start + limit)
      });
    }
    else {
      console.log('from axios');
      console.log(colors);
      axios
        .get(`http://localhost:8000/api/colors/${start}/${limit}`)
        .then(res => {
          this.setState({
            colorsDisplayed: res.data
          }, () => {
             const newColors = JSON.stringify(
               colors
                .slice(0, start)
                .concat(this.state.colorsDisplayed)
                .concat(colors.slice(start + limit))
            );

            localStorage.setItem('colors', newColors);
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
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

export default ListView;
