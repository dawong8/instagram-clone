import React, { Component } from 'react';
// import logo from './logo.svg';
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


// Testing if the user has successfully logged in/registered account
const MyHome = () => {
  return(
    <div>
      You have successfully completed Login/Register and have entered <strong> Home </strong>
    </div>
    );
}


class App extends Component {
  render() {
    return (
      <main>
      	<Switch>
      		<Route exact path='/' component= { ParentLoginRegister } />
          <Route exact path='/home' component={MyHome} />
      		<Route component= { My404 } />
      	</Switch>
      </main>
    );
  }
}

export default App;
