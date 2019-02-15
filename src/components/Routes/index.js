import React from 'react'; 


import ParentLoginRegister from '../../containers/ParentLoginRegister';
import MainPage from '../../containers/MainPage';
import ProfileContainer from '../../containers/ProfileContainer';
import EditProfile from '../../containers/EditProfile';
import Followers from '../../containers/Followers';
import My404 from '../404';


import { Route, Switch } from 'react-router-dom';




const AllRoutes = () => {
	return (
		<Switch>
      		<Route exact path = '/' component= {ParentLoginRegister  } />
          	<Route exact path = '/home' component={MainPage} />
            <Route exact path = '/profile/edit' component = { EditProfile} />
          	<Route path = '/profile/:handle' component= { ProfileContainer } />
          	<Route exact path = '/followers' component = { Followers } />
      		<Route component= { My404 } />
      	</Switch>
		)
};

export default AllRoutes; 