import React, {Component} from 'react'; 
import CommentList from '../../components/ShowAllComments';
import CreateComment from '../../components/CreateComment';

// all comments for 1 particular post

class CommentContainer extends Component {
	constructor() {
		super(); 
		this.state = {
			comments: [], 
			canEdit: false, 
			commentId: '', // id of the comment that we will edit 
			replyHit: false // is the reply button hit? 
		}
	}
 	componentDidMount () {
 		this.getComments();
 	}

 	getComments = async () => {
 		try {
 			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/comment/post/` + this.props.thePost);
 			if (!response.ok) {
 				throw Error(response.statusText);
 			}

 			const parsedComment = await response.json(); 

 			this.setState({
 				comments: parsedComment
 			});

 		} catch (err) {
 			return err; 
 		}
 	}



	addComment = async (arg) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/comment`, {
				method: 'POST', 
				body: JSON.stringify(arg),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json' // hey express server, we're sending over json
				}
			});

			if (!response.ok) {
				throw Error(response.statusText);
			}

			const parsedCreatedComment = await response.json(); 

			this.setState({ // want to create a new array with all previous movies + new movie 
				comments: [...this.state.comments, parsedCreatedComment]
			}); // update state



		} catch(err) {
			return err; 
		}
	}
	addlike = async (comment) => {
		try {

			const temp = {
				...comment, 
				likes: comment.likes + 1
			};
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/comment/` + comment._id, {
				method: 'PUT',
				body: JSON.stringify(temp), 
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!response.ok) {
				return Error(response.statusText);
			}

			const editParsed = await response.json(); 

			console.log('edited parsed', editParsed);


			const tempArray = this.state.comments.map((item) => {
					if (item._id === comment._id) {
						item = editParsed;
					} 
					return item; 
					
				});


			this.setState({
				comments: tempArray
			});


		} catch (err) {
			return err; 
		}
	}

	editComment = async (comment) => {
		try {
			console.log('sent over commet', comment)
			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/comment/` + comment._id, {
				method: 'PUT',
				body: JSON.stringify(comment), 
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!response.ok) {
				return Error(response.statusText);
			}

			const editParsed = await response.json(); 
			const tempArray = this.state.comments.map((item) => {
					if (item._id === comment._id) {
						item = editParsed;
					} 
					return item; 
					
				});


			this.setState({
				comments: tempArray
			});
		} catch (err) {
			return err; 
		}
	}

	canEdit = (id) => {

		if (id === this.state.commentId) { // same key pressed for the same comment 
			this.setState({
				canEdit: !this.state.canEdit, 
				commentId: id
			})
		} else { //if a different one is pressed 
			this.setState({
				canEdit: true, 
				commentId: id
			})
		}

	}
	
	replyHit = (id) => {
		if (id === this.state.commentId) { // same key pressed for the same comment 
			this.setState({
				replyHit: !this.state.replyHit, 
				commentId: id
			})
		} else { //if a different one is pressed 
			this.setState({
				replyHit: true, 
				commentId: id
			})
		}
		
	}

// comment list is all the comments for that particular post **** NOT all comments ever existing

	render() {
		console.log('state at comment container', this.state.comments);
		return (
			<div>
				<CommentList userId={this.props.userId} allComments={this.state.comments} addlike={this.addlike} editComment={this.editComment} canEdit={this.canEdit} showForm={this.state.canEdit} commentId={this.state.commentId} replyHit={this.replyHit} moreComments={this.state.replyHit}/> 
				{ this.props.canComment && this.props.currentPostId === this.props.thePost ? <CreateComment addComment={this.addComment} post={this.props.thePost} /> : null}
				
			</div>

			)
	}
}

export default CommentContainer;