import React, { Component } from 'react';
import { Divider, Container, Image, Grid } from 'semantic-ui-react';

import Login from '../../components/Login';
import Register from '../../components/Register';
import ErrorMessage from '../../components/ErrorMessage';


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
				successful: false,
				errorMsg: ''
			},

			register:{
				username: '',
				password: '',
				email: '',
				successful: false,
				errorMsg: ''
			}
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
	handleRegisterSubmit = async (e) =>{
		e.preventDefault();
		const updatedRegister = {
			...this.state.register //spreads current value of register into updatedRegister
		}
		
		try{
			const response = await fetch('http://localhost:9000/auth', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(updatedRegister),
			headers: {
				'Content-Type': 'application/json'
				}
			});

			// console.log("Register response: ",response);

			if(!response.ok){
				throw Error(response.statusText);

			}

			const parsedReponse = await response.json();
			console.log("Parsed response: ", parsedReponse);

			if(parsedReponse.data === 'register successful')
			// Sets register to successful if the user successfully registers an account
			{
				updatedRegister.errorMsg = '';
				updatedRegister.successful = true;
				this.setState({
					register: updatedRegister
				});
				this.props.history.push('/home');
			}

			else{
				if(parsedReponse.errmsg.includes('email')){
					console.log("Email already exists");
					updatedRegister.errorMsg = 'Email already exists. Please enter a new email';
				}
				else if(parsedReponse.errmsg.includes('username')){
					console.log("Username already exists");
					updatedRegister.errorMsg = 'Username already exists. Please enter a new username';
				}

				this.setState({
					register: updatedRegister
				});
				this.props.history.push('/');
			}
			
		}

		catch(err){
			console.log("Error: ", err);
		}
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
							<Register handleRegisterChange={this.handleRegisterChange} handleRegisterSubmit={this.handleRegisterSubmit} />
							{this.state.register.errorMsg !== '' ? <ErrorMessage errorMessage={this.state.register.errorMsg}/> : null}
						</Grid.Row>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ParentLoginRegister;