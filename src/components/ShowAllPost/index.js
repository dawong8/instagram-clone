import React, {Component} from 'react'; 

const PostList = (props) =>{
	const posts = props.allPosts.slice(0).reverse().map((item) => {
		return <li key={item._id}> <img src={"http://localhost:9000/" + item.picture} /> <h2> {item.description}</h2> </li>
	});
	return(
			<ul> 
				{posts}
			</ul> 
	);
}

export default PostList;