import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom';
import './index.css';


const Navbar = (props) =>{


	// function to logout the user 
	const logout = async () => {
	// console.log('Click');
	  try{
	      //Make request to server in backend to delete the user cookie
	       const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
	        credentials: 'include'
	      });

	       if (!response.ok) {
	          throw Error(response.statusText);
	        }

	        const responseParsed = await response.json(); 
	        console.log("logout parsed response: ", responseParsed);

	       //Delete front end cookie as well
	       if(responseParsed.data === 'logout successful'){
	              const cookies = new Cookies();
	              cookies.remove("userId");

	              console.log("Cookie deleted: ",cookies.get('userId'));
	       
	              // Redirect to sign in page
	              props.history.push('/');
	            }
	 	 }

	  catch(err){
	    console.log(err);
	  }

	}
	// console.log('NAV PROPS', props)

	// function to delete the user
	const deleteUser = async () =>{
		try{
			// Get current userId stored in cookie
			const cookies = new Cookies();
			// console.log("Delete user cookie: ",cookies.get('userId'));

			// Make fetch request with the userId stored in cookie
			const response = await fetch("http://localhost:9000/api/v1/user/"+cookies.get('userId'),{
				method: 'DELETE',
				credentials: 'include'
			}); 
			// Use json status to delete the cookie with the user id
			if (!response.ok) {
	          throw Error(response.statusText);
	        }

	        const responseParsed = await response.json(); 
	        // console.log("Delete user parsed response: ", responseParsed);
	        // console.log("Cookie before user deleted: ", cookies.get('userId'));

	        if(responseParsed.success === 'User was removed'){
	        	cookies.remove('userId');
	        	// console.log("Cookie after user deleted: ", cookies.get('userId'));

	        	//Redirect user to loginPage
	        	props.history.push('/');
	        }
		}

		catch(err){
			console.log(err);
		}
	}



	return(

		<header>
			<ul>
				<li> <Link to ='/home'> All Posts </Link></li>
				<li> <Link to = '/profile/edit'> Edit Profile </Link></li>
				<li> <Link to = '/followers'> Follow </Link></li>
				<li> <span onClick={deleteUser}> Delete Profile </span></li>
				<li> <span onClick={logout}> Logout </span></li>				
			</ul>
		</header>
	);
}

// need to wrap navbar with withRouter to make it get the child properties from BrowserRouter. By default 
// BrowserRouter will only apply its child properties to its children which have been 
// specified in App.js since <App> is enclosed within <BrowserRouter> in index.js
export default withRouter(Navbar);