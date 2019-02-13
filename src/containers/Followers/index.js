import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

class Followers extends Component{
	constructor(){
		super();
	}
	
	

	
	render(){
		return(
			<div>
				<Header/>
				<Navbar/>
				<h1> You have visited the Followers Container </h1>
				<Footer/>
			</div>
		);
	}
}

export default Followers;