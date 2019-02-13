import React, {Component} from 'react'; 
import EditComment from '../EditComment';
import CommentTier2 from '../../components/CommentTier2';


const CommentList = (props) =>{
	const myComments = props.allComments.map((item) => {
		return <li key={item._id}> 
					{ props.commentId == item._id && props.showForm ? <EditComment form={props.canEdit} comment={item} submitEdit={props.editComment}  /> : <h2> {item.owner} said, "{item.description}", likes: {item.likes}  </h2> }
					<button onClick={props.addlike.bind(null, item)}> ❤ </button> 
					<button onClick={props.canEdit.bind(null, item._id)}> ✏️ </button> 

					<button onClick={props.replyHit.bind(null, item._id)}> Reply </button> 
					<ul>
						{ props.moreComments && item._id == props.commentId ?  <CommentTier2 currentComment={item} /> : null}
					</ul>


				</li>
	});
	return(
			<ul> 
				{myComments}
			</ul> 
	);
}

export default CommentList;