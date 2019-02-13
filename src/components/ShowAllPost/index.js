import React, {Component} from 'react'; 
import CommentContainer from '../../containers/CommentContainer';
import EditPost from '../EditPost';
// import { Icon } from 'semantic-ui-react';

const PostList = (props) =>{

	// const userIcon = () => {
	// 	return <Icon name='user plus'/>
	// }

	const posts = props.allPosts.slice(0).reverse().map((item) => {
		return <li key={item._id}> 
					<button onClick={props.deletePost.bind(null, item._id)}> Delete </button> 
					<button onClick={props.addlike.bind(null, item)}> ❤ </button> 
					<button onClick={props.addComment.bind(null, item._id)}> 💬 </button> 
					<button onClick={props.editPost.bind(null, item._id)}> ✏️ </button>
					<button className="followUser" onClick={props.getUser}> <i className=" exception fas fa-user-plus"></i> Follow </button> 

					<h1> {item.likes} likes </h1>
					<h2> owner: {item.owner}</h2>
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