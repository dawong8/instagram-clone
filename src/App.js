import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import ParentLoginRegister from './containers/ParentLoginRegister';
import MainContainer from './containers/MainContainer';
import ProfileContainer from './containers/ProfileContainer';
import EditProfile from './containers/EditProfile';

import { Route, Switch } from 'react-router-dom';

const My404 = () =>{
	return(
		<div>
			 <h1> You Are Lost!!!</h1>
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
      		<Route exact path = '/' component= { ParentLoginRegister } />
          <Route exact path = '/home' component={MainContainer} />
          <Route exact path = '/profile' component= { ProfileContainer } />
          <Route exact path = '/profile/edit' component = { EditProfile} />
      		<Route component= { My404 } />
      	</Switch>
      </main>
    );
  }
}

export default App;
