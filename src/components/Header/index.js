import React from 'react';
import './index.css';
import {Link} from 'react-router-dom';

const Header = (props) => {
  return (
	  	<div> 
	  		<Link to = '/'> <h1 className="header"> Flutter </h1> </Link>
	  	</div>
    );
}


export default Header;
