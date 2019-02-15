import React, {Component} from 'react'; 
import CommentContainer from '../../containers/CommentContainer';
import EditPost from '../EditPost';
// import { Icon } from 'semantic-ui-react';

import Cookies from 'universal-cookie';
import { Card, Icon, Image, Button, Grid } from 'semantic-ui-react'
import './index.css';

const PostList = (props) =>{

	const cookie = new Cookies();

	// const currentUser = props.getCurrentUser();
	// console.log("Current user: ", currentUser);
	console.log("Props user name: ", props.currentUserName);


	const posts = props.allPosts.slice(0).reverse().map((item) => { // each item is a post 

		return (
				typeof item === 'undefined' ? null : // may not need?
				<Card className="card" key={item._id}> 
					<Image className="image card-image" src={"http://localhost:9000/" + item.picture} /> 
					<Card.Content>
						<Card.Header> <h2> {item.owner} </h2> 
							{ props.currentUserName !== item.owner ? ( props.checkUserExistsInArray(item.owner) ? <span className="followingComponent"> <i className="exceptionAgain fas fa-check-circle"></i> Following </span>: <button className="followUser" onClick={props.followButtonClicked.bind(this, item.owner)}> <i className=" exception fas fa-user-plus"></i> Follow </button>) : null} 

						</Card.Header>
							{ typeof item.whoLiked.find((i) => {return i===cookie.get('userId')}) === 'undefined' 
								? <Button  color='violet' content='❤' label={{ basic: true, color: 'violet', pointing: 'left', content: item.likes }} onClick={props.addlike.bind(null, item, true, cookie.get('userId'))} /> 
								: <Button  color='violet' content='❤' label={{ basic: true, color: 'violet', pointing: 'left', content: item.likes }} onClick={props.addlike.bind(null, item, false, cookie.get('userId'))} /> 
							} 


							{ cookie.get('userId') == item.userId 
								? <span> <button onClick={props.deletePost.bind(null, item._id)}> Delete </button> <button onClick={props.editPost.bind(null, item._id)}> ✏️ </button> </span>
								: null 
							}

						<Card.Description> 
						
							{ props.canEdit && props.currentPostId == item._id ? <EditPost post={item} edit={props.editingPost} editPost={props.editPost} /> : <h2> description: {item.description}</h2> }
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button onClick={props.addComment.bind(null, item._id)} content='💬' basic color='black' /> 

						<CommentContainer userId={item.userId} thePost={item._id} canComment={props.canComment} currentPostId={props.currentPostId} /> 
					</Card.Content>
				</Card>
			)

	});
	return(
		<div className="main"> 
			
					{posts}
				
		</div>
	);
}

export default PostList;