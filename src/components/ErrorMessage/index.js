import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = (props) =>{
	return(
			<Message negative size='mini'>
			  	<Message.Header> {props.errorMessage} </Message.Header>
			</Message>	
	);
}

export default ErrorMessage;