import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
	return(
		<header>
			<ul>
				<li> <Link to ='#'> All Posts </Link></li>
				<li> <Link to = '/profile/edit'> Edit Profile </Link></li>
				<li> <Link to = '#'> Delete Profile </Link></li>
				<li> <Link to = '#'> Logout </Link></li>				
			</ul>
		</header>
	);
}

export default Navbar;