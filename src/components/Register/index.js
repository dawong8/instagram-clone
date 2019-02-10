import React from 'react';
import { Grid, Form, Input, Button, Container } from 'semantic-ui-react';

const Register = (props) => {
  return (
  		<Form onSubmit={props.handleRegisterSubmit}>
			 <Form.Group>
			 	<Grid container>
		  			<Grid.Row centered>
				  		<Form.Input className="containerWidth" type="text" name="registerUsername" onChange={props.handleChange} placeholder='Username'/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Form.Input className="containerWidth" type="password" name="registerPassword" onChange={props.handleChange} placeholder='Password'/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Form.Input className="containerWidth" type="email" name="registerEmail" onChange={props.handleChange} placeholder='Email'/>
				  	</Grid.Row>
				  	<Grid.Row centered>
				  		<Button className="containerWidth" color='blue' type='submit'> Sign Up </Button>
				  	</Grid.Row>
				</Grid>
			</Form.Group>
		</Form>
    );
}


export default Register;
