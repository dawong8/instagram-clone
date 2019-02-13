import React, { Component } from 'react';
import { Divider, Container, Image, Grid } from 'semantic-ui-react';

import Cookies from 'universal-cookie';
import Login from '../../components/Login';
import Register from '../../components/Register';
import ErrorMessage from '../../components/ErrorMessage';
import Facebook from '../Facebook';


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
				username: '',
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
			...this.state.login //spreads current value of register into updatedRegister
		}
		
		this.fetchLogin(updatedLogin);
	}

	// Handles the register submit form when then the button is clicked
	handleRegisterSubmit = (e) =>{
		e.preventDefault();
		const updatedRegister = {
			...this.state.register //spreads current value of register into updatedRegister
		}
		




		// Check if the password or username contain any unallowable characters
		// here. Only if they contain the right format should you be forward the result  
		// to fetchRegister. START WITH YOUR CODE FROM HERE... Should make these same 
		// verifications when updating the user profile info.

		const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
		// console.log("Password test: ",strongRegex.test(updatedRegister.password));
		if(strongRegex.test(updatedRegister.password)){
			console.log("Password matches standard");
			this.fetchRegister(updatedRegister);
		}

		else{
			console.log("Invalid password standard");
			updatedRegister.errorMsg = "Password doesn't meet the standard. Password must contain 1 uppercase, 1 lowercase, 1 numeric, 1 special character[!,@,#,$,%,^ and &] and be 6 characters or more.";
			this.setState({
				register: updatedRegister
			});
		}
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


	fetchRegister = async (updatedRegister) =>{
		try{
			const response = await fetch('http://localhost:9000/api/v1/auth', {
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

				const cookies = new Cookies();
				console.log("Register username: ", this.state.register.username);
				cookies.set('userId', parsedReponse.userId);
				console.log("Cookie value: ", cookies.get('userId'));
				localStorage.setItem('username', parsedReponse.userId);
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



	fetchLogin = async (updatedLogin) =>{
		try{
				const response = await fetch('http://localhost:9000/api/v1/auth/login', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(updatedLogin),
				headers: {
					'Content-Type': 'application/json'
					}
				});

				console.log("Login response: ", response);

				if(!response.ok){
					throw Error(response.statusText);

				}

				const parsedReponse = await response.json();
				console.log("***** ParentLoginRegister *****");
				console.log("Parsed response: ", parsedReponse);
				console.log("*****");

				if(parsedReponse.data === 'login successful')
				// Sets login to successful if the user successfully logs into account
				{
					updatedLogin.errorMsg = '';
					updatedLogin.successful = true;
					this.setState({
						login: updatedLogin
					});
					const cookies = new Cookies();
					console.log("***** ParentLoginRegister *****");
					console.log("Login username: ", this.state.login.username);
					cookies.set('userId', parsedReponse.userId);
					console.log("Cookie value: ", cookies.get('userId'));
					this.props.history.push('/home');
				}

				else{
					updatedLogin.errorMsg = 'Email/Password incorrectly entered. Make sure you have registered an account and have entered the correct login details';

					this.setState({
						login: updatedLogin
					});
					this.props.history.push('/');
				}
			
		}

		catch(err){
			console.log("Error: ", err);
		}
	}



	setStateFacebook =  (name, email, id, status) =>{
		if(status === 'register')
		{
			this.setState({
				register:{
					username: name,
					email: email,
					password: id,
					successful: false,
					errorMsg: ''
				}
			});

			const updatedRegister = {
			...this.state.register //spreads current value of register into updatedRegister
			}


			this.fetchRegister(updatedRegister);
	}

		else{
			this.setState({
				login:{
					username: name,
					password: id,
					successful: false,
					errorMsg: ''
				}
			});

			const updatedLogin = {
			...this.state.login //spreads current value of register into updatedRegister
			}

			this.fetchLogin(updatedLogin);
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
							{this.state.login.errorMsg !== '' ? <ErrorMessage errorMessage={this.state.login.errorMsg}/> : null}
							<Facebook setStateFacebook={this.setStateFacebook} buttonText={"Login with Facebook"}/>
							<Divider style={styles.dividerWidth}/>

						</Grid.Row>

						<Grid.Row className='registerContainer'>
							<Register handleRegisterChange={this.handleRegisterChange} handleRegisterSubmit={this.handleRegisterSubmit} />
							{this.state.register.errorMsg !== '' ? <ErrorMessage errorMessage={this.state.register.errorMsg}/> : null}
							<Facebook setStateFacebook={this.setStateFacebook} buttonText={"SignUp with Facebook"}/>
						</Grid.Row>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default ParentLoginRegister;