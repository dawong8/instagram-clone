import React, {Component} from 'react'; 
import { Divider, Container, Image, Grid } from 'semantic-ui-react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


class ProfileContainer extends Component {
	constructor() {
		super(); 
		this.state = {

		}
	}

	render() {
		return ( 
			<div> 
				<Header/>
					<h1> You have been visited by the Profile Container </h1>
				<Navbar/>
				<Footer/>
			</div>
			)
	}
}

export default ProfileContainer; 