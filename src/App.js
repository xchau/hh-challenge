import React, { Component } from 'react';
import './styles/app.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import ListView from './components/ListView';
import DetailView from './components/DetailView';
import { TopNav } from './components/TopNav';
import { NoMatch } from './components/NoMatch';

import { createPageLis } from './utils/helpers.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curColors: null,
      colors: null,
      count: null,
      pages: null,
      perPage: 12,
    };

    this.getRandomColor = this.getRandomColor.bind(this);
  }

  getRandomColor() {
    const max = this.state.count;
    const randomNum = Math.floor(Math.random() * (max - 1) + 1);

    return axios.get(`http://localhost:8000/api/color/${randomNum}`);
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/colors/count')
      .then(res => {
        const totalPages = Math.ceil(res.data.count / this.state.perPage);
        const pages = createPageLis(totalPages, this.state.curPage);

        this.setState({
          count: res.data.count,
          pages
        }, () => {
          const colors = new Array(res.data.count);
          colors.fill(null);

          localStorage.setItem('colors', JSON.stringify(colors));
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
        <Router>
          <Switch>
            <Route
              exact path="/"
              component={(props) => (
                <ListView {...props}
                  count={this.state.count}
                  curPage={1}
                  getRandomColor={this.getRandomColor}
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
                    <ListView {...props}
                      count={this.state.count}
                      curPage={idx + 1}
                      getRandomColor={this.getRandomColor}
                      perPage={this.state.perPage}
                      pages={this.state.pages}
                    />
                  )}
                />)
                : null
            }
            <Route
              path="/colors/"
              component={(props) => (
                <DetailView {...props}
                  getRandomColor={this.getRandomColor}
                />
              )}
            />
            <Route
              path="*"
              component={NoMatch}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
