import React from 'react';
import GenerateComments from '../GenerateComments';

const FollowerComponent = (props) =>{

	// REMAINING (CONTINUE FROM HERE): If the post has comments, render the comments components. If the components have comments within them,
	// render the second level comments component  as well

	const fetchComments = async (itemId) =>{
		const comments = await props.getComment(itemId);
		// return comments;
		console.log('FETCH COMMENTS COMMENT = ', comments)
	}


			// Checks if the post has comments
	// { (props.getComment(item._id).length !== 0 ) ? <h4> {props.getComment(item._id).} </h4> : null}
	const followerComments = props.followingPosts.map((item) => {
		// const comments = props.getComment(item._id);
		const comments = fetchComments(item._id);
		console.log("Commments from FOLLOWERCOMPONENT: ", comments);

		return (
			<li key={item._id}>
				<img src={"http://localhost:9000/"+item.picture} alt="Post picture"/>
				<h3> Description: {item.description} </h3>
				<h3> Owner: {item.owner} </h3>
				{ (props.getComment(item._id).length !== 0 ) ? <GenerateComments item={item} getComment={props.getComment} itemId={item._id}/> : null}

			</li>
		);

	});


	return(
		<ul>
			{followerComments}
		</ul>
	);
}

export default FollowerComponent;