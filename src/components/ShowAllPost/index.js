import React, {Component} from 'react'; 
import CommentContainer from '../../containers/CommentContainer';
import EditPost from '../EditPost';
// import { Icon } from 'semantic-ui-react';

const PostList = (props) =>{

	// const currentUser = props.getCurrentUser();
	// console.log("Current user: ", currentUser);
	console.log("Props user name: ", props.currentUserName);

	const posts = props.allPosts.slice(0).reverse().map((item) => {
		return <li key={item._id} className="completePost"> 
					<button onClick={props.deletePost.bind(null, item._id)}> Delete </button> 
					<button onClick={props.addlike.bind(null, item)}> ❤ </button> 
					<button onClick={props.addComment.bind(null, item._id)}> 💬 </button> 
					<button onClick={props.editPost.bind(null, item._id)}> ✏️ </button>
					{ props.currentUserName !== item.owner ? <button className="followUser"> <i className=" exception fas fa-user-plus"></i> Follow </button> : null} 

					<h1> {item.likes} likes </h1>
					<h2> owner: <span className="postOwner">{item.owner}</span></h2>
					<img src={"http://localhost:9000/" + item.picture} /> 
					
					{ props.canEdit && props.currentPostId == item._id ? <EditPost post={item} edit={props.editingPost} editPost={props.editPost} /> : <h2> description: {item.description}</h2> }


					<CommentContainer thePost={item._id} canComment={props.canComment} currentPostId={props.currentPostId} /> 

				</li>
	});
	return(
			<ul> 
				{posts}
			</ul> 
	);
}

export default PostList;