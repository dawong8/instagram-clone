import React, { Component } from 'react';
import { Header, Divider, Container, Image, Grid, Segment } from 'semantic-ui-react';

import Login from '../../components/Login';
import Register from '../../components/Register';


// Inline styling
const styles = {
	textFont: {
		fontSize: '70px',
	  	margintop: '30px'
	},
	dividerWidth:{
		marginTop: '8%',
		marginLeft: '4%'
	}
}


class ParentLoginRegister extends Component{
	constructor(){
		super();

		this.state = {

			//Login information
			loginEmail: '',
			loginPassword: '',
			loginSuccessful: false,

			//Register information
			registerUsername: '',
			registerPassword: '',
			registerEmail: '',
			registerSuccessful: false
		}
	}

	// Handles the login submit form when the button is clicked
	handleLoginSubmit = (e) =>{
		e.preventDefault();
		this.setState({
			loginSuccessful: true
		});
	}

	//
	handleChange = (e) =>{
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	// Handles the register submit form when then the button is clicked
	handleRegisterSubmit = (e) =>{
		e.preventDefault();
		this.setState({
			registerSuccessful: true
		});

	}

	render(){
		console.log("State from ParentLoginRegister: ", this.state);
		return(
			<Grid>
				<Container textAlign='center'>
					<h1 style={styles.textFont}> Instaclone </h1>
				</Container>

				<Grid.Row columns={2}>
					<Grid.Column verticalAlign='middle'>
						<Image className='imageContainer' size="huge" src="https://images.pexels.com/photos/1338789/pexels-photo-1338789.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
					</Grid.Column>

					<Grid.Column>
						<Grid.Row className='loginContainer'>
							<Login handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit}/>
							<Divider style={styles.dividerWidth}/>
						</Grid.Row>

						<Grid.Row className='registerContainer'>
							<Register handleChange={this.handleChange} handleRegisterSubmit={this.handleRegisterSubmit}/>
						</Grid.Row>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ParentLoginRegister;