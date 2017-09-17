import React, { Component } from 'react';
import './styles/app.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { TopNav } from './components/TopNav';

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
        <Router>
          
        </Router>
      </div>
    );
  }
}

export default App;
