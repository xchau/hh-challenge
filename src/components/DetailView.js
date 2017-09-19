import React, { Component } from 'react';
import { Swatch } from './Swatch';
import { SideNav } from './SideNav';

class DetailView extends Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <main className="app-main">
        <SideNav redirectToColor={this.redirectToColor} />
        <div className="display-container">
          <div className="display-detail">
            <div className="swatch-large">
              <Swatch hex={this.props.location.hash} />
            </div>
          </div>
          <footer className="display-footer">
            <div
              className="display-clear"
              onClick={this.props.history.goBack}
              >
                Clear
              </div>
            </footer>
          </div>
        </main>
      );
  }
};

export default DetailView;
