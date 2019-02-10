import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';

const Register = (props) => {
  return (
  		<Form onSubmit={props.handleRegisterSubmit}>
			 <Form.Group>
			 	<Grid container>
		  			<Grid.Row centered>
				  		<Form.Input className="containerWidth" type="text" name="username" onChange={props.handleRegisterChange} placeholder='Username'/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Form.Input className="containerWidth" type="email" name="email" onChange={props.handleRegisterChange} placeholder='Email'/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Form.Input className="containerWidth" type="password" name="password" onChange={props.handleRegisterChange} placeholder='Password'/>
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
