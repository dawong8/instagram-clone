import React from 'react';
import { Label, Grid, Form, Button } from 'semantic-ui-react';

const EditProfileComponent = (props) =>{
	return(
			<Form onSubmit={props.handleSubmit}>
			 <Form.Group>
			 	<Grid container>
		  			<Grid.Row centered>
		  				<Label as='a' color='red' ribbon>
         					 Username
        				</Label>
				  		<Form.Input className="containerWidth" type="text" name="username" onChange={props.handleChange} placeholder={props.responseName}/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Label as='a' color='red' ribbon>
         					 Password
        				</Label>
				  		<Form.Input className="containerWidth" type="password" name="password" onChange={props.handleChange}/>
				  	</Grid.Row>
				  	<Grid.Row centered>	
				  		<Label as='a' color='red' ribbon>
         					 Confirm Password
        				</Label>
				  		<Form.Input className="containerWidth" type="password" name="confirmPassword" onChange={props.handleChange}/>
				  	</Grid.Row>
				  	<Grid.Row centered>
				  		<Button className="containerWidth" color='blue' type='submit'> Confirm Changes </Button>
				  	</Grid.Row>
				</Grid>
			</Form.Group>
		</Form>
	);
}

export default EditProfileComponent;