import React, {Component} from 'react'; 

const PostList = (props) =>{
	const posts = props.allPosts.map((item) => {
		console.log('what is item? ')
		console.log(item.file);
		return <div key={item._id}> <img src={"http://localhost:9000/" + item.picture} /> <h2> {item.description}</h2> </div>
	});
	return(
			<div> 
				{posts}
			</div> 
	);
}

export default PostList;