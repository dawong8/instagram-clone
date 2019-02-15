import React from 'react';
import GenerateComments from '../GenerateComments';
import './index.css';
import { Card, Icon, Image } from 'semantic-ui-react'

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
			<Card key={item._id}>
				<Card.Content>
					<Image className="image card-image" src={`${process.env.REACT_APP_API}/`+item.picture} alt="Post picture"/>
					<Card.Header> {item.description} </Card.Header>
					<Card.Header> <i className="exception fas fa-user"></i> {item.owner} </Card.Header>
					{ (props.getComment(item._id).length !== 0 ) ? <GenerateComments item={item} getComment={props.getComment} itemId={item._id}/> : null}
				</Card.Content>

			</Card>
		);

	});


	return(
		<Card.Group itemsPerRow={3}>
			{followerComments}
		</Card.Group>
	);
}

export default FollowerComponent;