import React, { Component } from 'react';
import './styles/styles.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import ListContainer from './containers/ListContainer';
import DetailView from './components/DetailView';
import FamilyView from './components/FamilyView';
import TopNav from './components/TopNav';
import { NoMatch } from './components/NoMatch';

import { colorFamilies } from './routes/families';
import { createPageLis } from './utils/helpers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curPage: 1,
      perPage: 12,
    };


  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route
              exact path="/"
              component={(props) => (
                <ListContainer {...props}
                  curPage={this.state.curPage}
                  perPage={this.state.perPage}
                  // isFamilyView={false}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
