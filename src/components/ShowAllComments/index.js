import React, {Component} from 'react'; 
import EditComment from '../EditComment';
import CommentTier2 from '../../components/CommentTier2';
import Cookies from 'universal-cookie';
import './index.css';

const CommentList = (props) =>{

	const cookie = new Cookies();

	const myComments = props.allComments.map((item) => { // each item is the comment, props.userId is who 
		return <div key={item._id}> 
					{ //props.commentId == item._id && props.showForm ? <EditComment form={props.canEdit} comment={item} submitEdit={props.editComment}  /> : <h2> {item.owner} {item.description} </h2> }
					}
					{// <button onClick={props.addlike.bind(null, item)}> ❤ </button> }
					}

					{// props.userId == cookie.get('userId') ? <button onClick={props.canEdit.bind(null, item._id)}> ✏️ </button> : null}
				}
					
					<span> 
						{item.owner} {item.description} 
						<button className="reply" onClick={props.replyHit.bind(null, item._id)}> Reply </button> 
					</span>
					<ul>
						<CommentTier2 currentComment={item} clickedComment={props.commentId} clicked={props.moreComments} /> 
					</ul>


				</div>
	});
	return(
			<div> 
				{myComments}
			</div> 
	);
}

export default CommentList;