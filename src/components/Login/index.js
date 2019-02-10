import React from 'react';
import { Grid, Form, Input, Button, Container } from 'semantic-ui-react';

const Login = (props) => {
  return (
	  	<Form onSubmit={props.handleLoginSubmit}>
			 <Form.Group>
			 	<Grid container>
		  			<Grid.Row centered>
				  		<Form.Input className="containerWidth" type="email" name="loginEmail" onChange={props.handleChange} placeholder='Email'/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Form.Input className="containerWidth" type="password" name="loginPassword" onChange={props.handleChange} placeholder='Password'/>
				  	</Grid.Row>
				  	<Grid.Row centered>
				  		<Button className="containerWidth" color='blue' type='submit'> Log In </Button>
				  	</Grid.Row>
				</Grid>
			</Form.Group>
		</Form>
    );
}


export default Login;
