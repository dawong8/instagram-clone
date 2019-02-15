import React from 'react';
import './index.css';

const Footer = () =>{
	return(
		<footer>
			<div className='copyright'>
			 Ⓒ 2019 Flutter
			</div> 

			<div className="github-links">
				Follow us on GitHub:  <a className="link1" href="https://github.com/dawong8"> Danny Wong </a> 
				<a href="https://github.com/Akshay199456" className="link2"> Akshay Mysore </a> 
			</div>
		</footer>
	);
}

export default Footer;