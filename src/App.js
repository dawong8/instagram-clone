import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ParentLoginRegister from './containers/ParentLoginRegister';
import { Route, Switch } from 'react-router-dom';

const My404 = () =>{
	return(
		<div>
			You Are Lost!!!
		</div>
	);
}



class App extends Component {
  render() {
    return (
      <main>
      	<Switch>
      		<Route exact path='/' component= { ParentLoginRegister } />
      		<Route component= { My404 } />
      	</Switch>
      </main>
    );
  }
}

export default App;
