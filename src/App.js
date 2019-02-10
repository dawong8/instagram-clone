import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ParentLoginRegister from './containers/ParentLoginRegister';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ParentLoginRegister/>
      </div>
    );
  }
}

export default App;
