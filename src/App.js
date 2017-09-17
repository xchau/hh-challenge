import React, { Component } from 'react';
import './styles/app.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { TopNav } from './components/TopNav';
import { SideNav } from './components/SideNav';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: null
    };
  }

  render() {
    return (
      <div className="app-container">
        <TopNav />
        <main className="app-main">
          <SideNav />
          <Router>

          </Router>
        </main>
      </div>
    );
  }
}

export default App;
