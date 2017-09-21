import React, { Component } from 'react';
import './styles/styles.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import ListContainer from './containers/ListContainer';
import DetailContainer from './containers/DetailContainer';
import { NoMatch } from './components/NoMatch';

import { colorFamilies } from './routes/colorFamilies';
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
            {
              colorFamilies.map(fam => (
                <Route
                  key={fam}
                  exact
                  path={`/family/${fam}`}
                  component={ListContainer}
                />
              ))
            }
            <Route
              path="/colors/"
              component={DetailContainer}
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
