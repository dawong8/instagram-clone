import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react'
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component{
	constructor(){
		super();

		this.state = {
			isLoggedIn: false,
			userId: '',
			name: '',
			email: '',
			picture: ''
		}
	}

	componentClicked = () =>{
		// console.log("Facebook Container: Component has been clicked!");
	}

	responseFacebook = response =>{
		// console.log("Facebook response: ",response);
		if(this.props.buttonText === 'Login with Facebook')
			this.props.setStateFacebook(response.name, response.email, response.id, "login");
		else
			this.props.setStateFacebook(response.name, response.email, response.id, "register");
	}



	render(){
		let fbContent;
		// console.log("Props from Facebook Container: ", this.props);

		if(this.state.isLoggedIn){
			fbContent = null;
		}
		else{

			// App Id token: 2689294537754822
			fbContent = (
						<Grid>
							<Grid.Row centered>
								<FacebookLogin
								    appId="2689294537754822"
								    autoLoad={true}
								    fields="name,email,picture"
								    onClick={this.componentClicked}
								    callback={this.responseFacebook}
								    icon="fb-enter fa-facebook-square"
								    size="small"
								    textButton = {this.props.buttonText} 
								/>
							</Grid.Row>
						</Grid>
						);
		}



		return(
			<div>
				{fbContent}
			</div>
		);
	}
}

export default Facebook;