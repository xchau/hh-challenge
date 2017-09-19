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
import TopNav from './components/TopNav';
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
      searching: false
    };

    this.getRandomColor = this.getRandomColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getRandomColor() {
    const max = this.state.count;
    const randomNum = Math.floor(Math.random() * (max - 1) + 1);

    return axios.get(`http://localhost:8000/api/color/${randomNum}`);
  }

  handleSubmit(hex) {
    let searchTerm = hex;

    if (searchTerm[0] === '#') searchTerm = searchTerm.slice(1);

    axios
      .get(`http://localhost:8000/api/search?color=${searchTerm}`)
      .then(res => {
        const totalPages = Math.ceil(res.data.length / this.state.perPage);
        const pages = createPageLis(totalPages);

        const old = this.state.curColors;

        this.setState({
          count: res.data.length,
          curColors: res.data,
          pages,
          searching: true
        }, () => {
          console.log('submitted: ');
          console.log(old, this.state.curColors);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/colors/count')
      .then(res => {
        const totalPages = Math.ceil(res.data.count / this.state.perPage);
        const pages = createPageLis(totalPages);

        this.setState({
          count: res.data.count,
          pages,
          searching: false
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
        <TopNav
          searchTerm={this.state.search}
          handleSubmit={this.handleSubmit}
        />
        <Router>
          <Switch>
            <Route
              exact path="/"
              component={(props) => (
                <ListView {...props}
                  count={this.state.count}
                  curColors={this.state.curColors}
                  curPage={1}
                  getRandomColor={this.getRandomColor}
                  perPage={this.state.perPage}
                  pages={this.state.pages}
                  searching={this.state.searching}
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
                      curColors={this.state.curColors}
                      curPage={idx + 1}
                      getRandomColor={this.getRandomColor}
                      perPage={this.state.perPage}
                      pages={this.state.pages}
                      searching={this.state.searching}
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
