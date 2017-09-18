import React, { Component } from 'react';
import './styles/app.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';
import { Display } from './components/Display';
import { NoMatch } from './components/NoMatch';
import { Test } from './components/Test';

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
    console.log(this.state.pages);
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
                    pages={this.state.pages}
                  />
                )}
              />
              {
                this.state.pages ?
                this.state.pages.map((route, idx) => {
                  console.log(`/colors?page=${idx + 1}`);
                  return <Route
                    key={idx}
                    exact
                    path={`/colors?page=${idx + 1}`}
                    component={(props) => (
                      <Display {...props}
                        curPage={idx + 1}
                        pages={this.state.pages}
                      />
                    )}
                  />
                })
                : <Route
                    path="/colors"
                    component={(props) => (
                      <Test />
                    )}
                  />
              }
              {/* <Route
                exact
                path="/colors"
                component={(props) => (
                  <Test />
                )}
              /> */}
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
