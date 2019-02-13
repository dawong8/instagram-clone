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


// const MyLogout = async (props) => {

//   try{
//       //Make request to server in backend to delete the user cookie
//        const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
//         credentials: 'include'
//       });

//        if (!response.ok) {
//           throw Error(response.statusText);
//         }

//         const responseParsed = await response.json(); 
//         console.log("logout parsed response: ", responseParsed);

//        //Delete front end cookie as well
//        if(responseParsed.data === 'logout successful'){
//               const cookies = new Cookies();
//               cookies.remove("userId");
       
//               // Redirect to sign in page
//               // props.history.push('/');
//             }

//        // return(
//        //  <div>
//        //  </div>
//        //  );

//   }

//   catch(err){
//     console.log(err);
//   }

//   return <div>Logged out...</div>;
// }

// Testing if the user has successfully logged in/registered account
// const MyHome = () => {
//   return(
//     <div>
//       You have successfully completed Login/Register and have entered <strong> Home </strong>
//     </div>
//     );
// }


class App extends Component {
  render() {
    return (
      <main>
      	<Switch>
      		<Route exact path = '/' component= { ParentLoginRegister } />
          <Route exact path = '/home' component={MainContainer} />
          <Route exact path = '/profile' component= { ProfileContainer } />
          <Route exact path = '/profile/edit' component = { EditProfile } />
          {/* <Route exact path = '/logout' component={ MyLogout } /> */}
      		<Route component= { My404 } />
      	</Switch>
      </main>
    );
  }
}

export default App;
