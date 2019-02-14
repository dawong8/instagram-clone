import React from 'react';
import { Button, Form, Header, Segment,  Grid } from 'semantic-ui-react';

const EditProfileComponent = (props) =>{
	return(
		<div className='login-form'>
			<style>{`
		      body > div,
		      body > div > div,
		      body > div > div > div.login-form {
		        height: 100%;
		      }
		    `}
		    </style>

		    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>	
		    	<Grid.Column style={{ maxWidth: 450 }}>
		    		<Header as='h2' color='teal' textAlign='center'>
	          			<span> Edit Profile Details </span>
	       			</Header>
					<Form onSubmit={props.handleSubmit} size='large'>
						<Segment stacked>
							<Form.Input fluid icon="exception user circle" iconPosition='left' type="text" name="username" onChange={props.handleChange} placeholder="Username"/> 
							  	
							<Form.Input fluid icon="exception lock" iconPosition='left' type="password" name="password" onChange={props.handleChange} placeholder="Password"/>
						
							<Form.Input fluid icon="exception expeditedssl" iconPosition='left' type="password" name="confirmPassword" onChange={props.handleChange} placeholder="Confirm Password"/>
						</Segment>	  	
							
							<Button className="containerWidth"  color='teal' fluid size='large' type='submit'> Confirm Changes </Button>		  	
						
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default EditProfileComponent;