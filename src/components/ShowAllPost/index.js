import React, {Component} from 'react'; 
import CommentContainer from '../../containers/CommentContainer';
import EditPost from '../EditPost';



const PostList = (props) =>{



	const posts = props.allPosts.slice(0).reverse().map((item) => {
		return <li key={item._id}> 
					<button onClick={props.deletePost.bind(null, item._id)}> Delete </button> 
					<button onClick={props.addlike.bind(null, item)}> ❤ </button> 
					<button onClick={props.addComment.bind(null, item._id)}> 💬 </button> 
					<button onClick={props.editPost.bind(null, item._id)}> ✏️ </button> 

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