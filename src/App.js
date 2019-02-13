import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/Routes';


class App extends Component {

  constructor() {
    super(); 
    this.state = {

    }
  }

  render() {
    return (
      <main>
        <AllRoutes />
      </main>
    );
  }
}

export default App;
