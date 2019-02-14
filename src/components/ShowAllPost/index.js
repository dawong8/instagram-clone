import React, {Component} from 'react'; 
import CommentContainer from '../../containers/CommentContainer';
import EditPost from '../EditPost';

import Cookies from 'universal-cookie';


const PostList = (props) =>{

	const cookie = new Cookies();


	const posts = props.allPosts.slice(0).reverse().map((item) => { // each item is a post 
		return <li key={item._id}> 

					{ typeof item.whoLiked.find((i) => {return i===cookie.get('userId')}) === 'undefined' ? <button onClick={props.addlike.bind(null, item, true, cookie.get('userId'))}> ❤ </button> : <button onClick={props.addlike.bind(null, item, false, cookie.get('userId'))}> remove ❤ </button> } 

					<button onClick={props.addComment.bind(null, item._id)}> 💬 </button> 

					{ cookie.get('userId') == item.userId 
						? <span> <button onClick={props.deletePost.bind(null, item._id)}> Delete </button> <button onClick={props.editPost.bind(null, item._id)}> ✏️ </button> </span>
						: null 
					}
					<h1> {item.likes} # of likes </h1>
					<h2> owner: {item.owner}</h2>
					<img src={"http://localhost:9000/" + item.picture} /> 
					
					{ props.canEdit && props.currentPostId == item._id ? <EditPost post={item} edit={props.editingPost} editPost={props.editPost} /> : <h2> description: {item.description}</h2> }


					<CommentContainer userId={item.userId} thePost={item._id} canComment={props.canComment} currentPostId={props.currentPostId} /> 

				</li>
	});
	return(
			<ul> 
				{posts}
			</ul> 
	);
}

export default PostList;