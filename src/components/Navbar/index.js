import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom';


const Navbar = (props) =>{

	const MyLogout = async () => {
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
	       
	              // Redirect to sign in page
	              props.history.push('/');
	            }
	  }

	  catch(err){
	    console.log(err);
	  }

	}
	// console.log('NAV PROPS', props)

	return(

		<header>
			<ul>
				<li> <Link to ='#'> All Posts </Link></li>
				<li> <Link to = '/profile/edit'> Edit Profile </Link></li>
				<li> <Link to = '#'> Delete Profile </Link></li>
				<li> <span onClick={MyLogout}> Logout </span></li>				
			</ul>
		</header>
	);
}

// need to wrap navbar with withRouter to make it get the child properties from 
export default withRouter(Navbar);