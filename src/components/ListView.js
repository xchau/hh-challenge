import React, { Component } from 'react';
import '../styles/display.css';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { SideNav } from './SideNav';
import { Swatch } from './Swatch';
import { Pagination } from './Pagination';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorsDisplayed: this.props.curColors,
      stored: null
    };

    this.redirectToColor = this.redirectToColor.bind(this);
  }

  redirectToColor() {
    this.props.getRandomColor()
      .then(res => {
        this.props.history.push(`/colors/${res.data.hex}`)
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.state.colorsDisplayed !== nextProps.curColors) {
      this.setState({ colorsDisplayed: nextProps.curColors }, () => {
        console.log('received new props');
        console.log(this.state);
      });
    }
    else {
      console.log('???');
    }
  }

  componentWillMount() {
    const colors = JSON.parse(localStorage.getItem('colors'));

    this.setState({ stored: colors });
  }

  componentDidMount() {
    const start = this.props.perPage * (this.props.curPage - 1);
    const limit = this.props.perPage;

    let colors = this.state.stored ? this.state.stored : [];

    if (colors.slice(start, start + limit).every(e => e)) {
      this.setState({
        colorsDisplayed: colors.slice(start, start + limit)
      });
    }
    else if (!this.props.searching || !colors.length) {
      axios
        .get(`http://localhost:8000/api/colors/${start}/${limit}`)
        .then(res => {
          this.setState({
            colorsDisplayed: res.data
          })

          const newColors = JSON.stringify(
            colors
              .slice(0, start)
              .concat(res.data)
              .concat(colors.slice(start + limit))
          );

          localStorage.setItem('colors', newColors);
        })
        .catch(err => {
          console.error(err);
        });
    }
    else {
      this.setState({ colorsDisplayed: this.props.curColors });
    }
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

export default ListView;
