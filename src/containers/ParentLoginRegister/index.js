import React, { Component } from 'react';
import { Divider, Container, Image, Grid } from 'semantic-ui-react';

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

			login:{
				email: '',
				password: '',
				successful: false
			},

			register:{
				username: '',
				password: '',
				email: '',
				successful: false
			}


			//Login information
			// loginEmail: '',
			// loginPassword: '',
			// loginSuccessful: false,

			//Register information
			// registerUsername: '',
			// registerPassword: '',
			// registerEmail: '',
			// registerSuccessful: false
		}
	}

	// Handles the login submit form when the button is clicked
	handleLoginSubmit = (e) =>{
		e.preventDefault();
		const updatedLogin = {
			...this.state.login //spreads current value of login into updatedLogin
		}

		updatedLogin.successful = true;
		
		this.setState({
			login: updatedLogin
		});
	}

	//
	handleLoginChange = (e) =>{
		const updatedChange = {
			...this.state.login
		}
		updatedChange[e.target.name] = e.target.value;

		this.setState({
			login: updatedChange
		});
	}

	handleRegisterChange = (e) => {
		const updatedChange = {
			...this.state.register
		}
		updatedChange[e.target.name] = e.target.value;

		this.setState({
			register: updatedChange
		});
	}

	// Handles the register submit form when then the button is clicked
	handleRegisterSubmit = (e) =>{
		e.preventDefault();
		const updatedRegister = {
			...this.state.register //spreads current value of register into updatedRegister
		}





		// Sets register to successful if the user successfully registers an account
		updatedRegister.successful = true;
		this.setState({
			register: updatedRegister
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
							<Login handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit}/>
							<Divider style={styles.dividerWidth}/>
						</Grid.Row>

						<Grid.Row className='registerContainer'>
							<Register handleRegisterChange={this.handleRegisterChange} handleRegisterSubmit={this.handleRegisterSubmit}/>
						</Grid.Row>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ParentLoginRegister;