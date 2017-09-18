import React, { Component } from 'react';
import './styles/app.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Display from './components/Display';
import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';
import { NoMatch } from './components/NoMatch';
// import { Test } from './components/Test';

import { createPageLis } from './utils/helpers.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: null,
      pages: null,
      perPage: 12,
    };
  }

  componentWillMount() {
    axios
      .get('http://localhost:8000/api/colors/count')
      .then(res => {
        const totalPages = Math.ceil(res.data.count / this.state.perPage);
        const pages = createPageLis(totalPages, this.state.curPage);

        this.setState({ pages }, () => {
          // console.log(this.state.pages);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="app-container">
        <TopNav />
        <main className="app-main">
          <SideNav />
          <Router>
            <Switch>
              <Route
                exact path="/"
                component={(props) => (
                  <Display
                    {...props}
                    curPage={1}
                    perPage={this.state.perPage}
                    pages={this.state.pages}
                  />
                )}
              />
              {
                this.state.pages ?
                  this.state.pages.map((route, idx) => <Route
                    key={idx}
                    exact
                    path={`/colors/${idx + 1}`}
                    component={(props) => (
                      <Display {...props}
                        curPage={idx + 1}
                        perPage={this.state.perPage}
                        pages={this.state.pages}
                      />
                    )}
                  />)
                  : null
              }
              <Route
                path="*"
                component={NoMatch}
              />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
