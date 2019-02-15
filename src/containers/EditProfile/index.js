import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import ErrorMessage from '../../components/ErrorMessage';
import EditProfileComponent from '../../components/EditProfileComponent';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

class EditProfile extends Component{
	constructor(){
		super();

		this.state ={
			username: '',
			password: '',
			confirmPassword: '',
			responseObtained: {},
			errorMessage: false,
			errorMessageString: ''
		}
	}

	// fetches the userId cookie which contains the id of the current user
	fetchUserCookie = () =>{
		const cookies = new Cookies();
		return cookies.get('userId');
	}


	// Fetches the user details from the mongodb server
	fetchProfileDetails = async() =>{
		try{
			console.log("Fetch Profile Details Activated");
			console.log("User cookie froom EditProfile: ", this.fetchUserCookie());
			const response = await fetch("http://localhost:9000/api/v1/user/"+this.fetchUserCookie(), {
				credentials: 'include'
			});
			console.log("Response received");

			if(!response.ok){
				throw Error(response.statusText);

			}

			const parsedReponse = await response.json();
			console.log("Parsed response from EditProfile: ", parsedReponse);
			
			this.setState({
				responseObtained: parsedReponse
			});

		}

		catch(err){
			return err;
		}
	}

	handleSubmit = async (e) =>{
		e.preventDefault();
		console.log("Handle Submit Activated");
		if(this.state.password === this.state.confirmPassword){
			console.log("Password matches. You have successfully edited your profile");
			
			const modifiedParsedResponse = this.state.responseObtained;
			modifiedParsedResponse.username = this.state.username;
			modifiedParsedResponse.password = this.state.password;

			console.log("Modified Parsed Response: ", modifiedParsedResponse);

			const response = await fetch("http://localhost:9000/api/v1/auth/userInfo/"+this.fetchUserCookie(),{
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(modifiedParsedResponse),
				headers: {
         		 'Content-Type': 'application/json'
        		}
			});

			if(!response.ok){
				throw Error(response.statusText);

			}

			console.log("Edit response: ", response);
			const parsedReponse = await response.json();

			console.log("Parsed Response handleSubmit received: ", parsedReponse);

			if(parsedReponse.data === 'user updated')
			{
				console.log("Updated User parsed: ", parsedReponse.updatedUser);
				// If previous state included an error message and the user enters correctly on their next turn
				this.setState({
					errorMessage: false,
					errorMessageString: ''
				});
				this.props.history.push('/profile');

				// this.setState({
				// 	responseObtained: parsedReponse.updatedUser
				// });
			}

			else{
				this.setState({
					errorMessage: true,
					errorMessageString: 'Username already exists. Please enter a new username.'
				});
			}
		}

		else{
			console.log("Passwords don't match. Please enter valid matching passwords");
			this.setState({
				errorMessage: true,
				errorMessageString: "Passwords don't match. Please enter valid matching passwords."
			});

		}
	}

	handleChange = (e) =>{
		console.log("Handle Change Activated");
		this.setState({
			[e.target.name] : e.target.value
		});
	}

	componentDidMount(){
		this.fetchProfileDetails();
	}

	render(){
		console.log("State: ", this.state);
		return(
			<div>
				<Header/>
				<Navbar/>
				<EditProfileComponent handleChange={this.handleChange} handleSubmit = {this.handleSubmit} responseName = {this.state.responseObtained.username}/>
				{ this.state.errorMessage ?<ErrorMessage errorMessage={this.state.errorMessageString}/> : null}
			</div>
		);
	}
}


export default EditProfile