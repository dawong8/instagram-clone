import React from 'react';

const GenerateComments = (props) =>{
	console.log("Props from GenerateComments: ", props);
	

	// need to get comments from follower component which has it as a props
	const posts = props.item;
	console.log("Posts from GenerateComments HOO HAA: ", posts);

	return(
		<div>
		</div>
	);
}

export default GenerateComments;