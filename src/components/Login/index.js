import React from 'react';
import { Grid, Form, Button} from 'semantic-ui-react';

const Login = (props) => {
  return (
	  	<Form onSubmit={props.handleLoginSubmit}>
			 <Form.Group>
			 	<Grid container>
		  			<Grid.Row centered>
				  		<Form.Input className="containerWidth" focus type="text" name="username" onChange={props.handleLoginChange} placeholder='Username'/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Form.Input className="containerWidth" focus type="password" name="password" onChange={props.handleLoginChange} placeholder='Password'/>
				  	</Grid.Row>
				  	<Grid.Row centered>
				  		<Button className="containerWidth" color='black' type='submit'> Log In </Button>
				  	</Grid.Row>
				</Grid>
			</Form.Group>
		</Form>
    );
}


export default Login;
