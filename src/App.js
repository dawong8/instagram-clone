import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/Routes';
import Cookies from 'universal-cookie';



class App extends Component {

  constructor() {
    super(); 
    this.state = {
      logged: false
    }
  }


  render() {
    const cookies = new Cookies();
    const cookie = cookies.get('userId');
      //console.log('MY COOKIE', cookie)

    return (
      <main>

        { typeof cookie === 'undefined' 
          ? <Redirect to='/' />
          : null }

          <AllRoutes />
        
      </main>
    );
  }
}

export default App;
