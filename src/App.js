import React, { Component } from 'react';
import './styles/styles.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import ListContainer from './containers/ListContainer';
import { NoMatch } from './components/NoMatch';

import { colorFamilies } from './routes/families';
import { totalPages } from './routes/totalPages';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            <Route
              exact path="/"
              component={ListContainer}
            />
            {
              totalPages.map(num => (
                <Route
                  key={num}
                  path={`/colors/${num}`}
                  component={ListContainer}
                />
              ))
            }
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
