import React, {Component} from 'react'; 
import CreateComment from '../CreateComment';

/*

these are tier2 comments, they dont need to ref to a post.id as long as they are attached to their parent comment 

*/
class CommentTier2 extends Component {
	constructor() {
		super(); 
		this.state = {
			comments: [], // the existing children comments 
			parentComment: null // this is your parent comment 
		}
	}

	componentWillMount =  () => {
		this.getComments();


	}


	getComments = async () => {
 		try {
 			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/comment/` + this.props.currentComment._id);
 			if (!response.ok) {
 				throw Error(response.statusText);
 			}

 			const parsedComment = await response.json(); 

 			this.setState({
 				parentComment: {
 					...this.props.currentComment
 				}, 
 				comments: parsedComment.children
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

			this.setState({ 
				comments: [...this.state.comments, parsedCreatedComment], 
			}); // update state


		// After created the new comment, we want to store it in our parent's array 


			
			const tempParent = {
				...this.state.parentComment,
				children: [
					...this.state.comments
				]
			};
			console.log('tempParent', tempParent);

			const parentResponse = await fetch(`${process.env.REACT_APP_API}/api/v1/comment/` + this.state.parentComment._id, {
				method: 'PUT',
				body: JSON.stringify(tempParent), 
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!parentResponse.ok) {
				return Error(parentResponse.statusText);
			}

			const parsed = await parentResponse.json();

			this.setState({
				parentComment: parsed
			});


		} catch(err) {
			return err; 
		}


	}



	render() {
		console.log('2nd tier', this.state)
		const embeddedComments = this.state.comments.map((item) => {
			return <div key={item._id}> {item.owner} said : @{this.state.parentComment.owner} {item.description} </div>
		});

		return (
			<div> 
				<div> {embeddedComments} </div> 
				{ this.props.clickedComment === this.props.currentComment._id && this.props.clicked ? <CreateComment addComment={this.addComment} /> : null}

			</div>
			)
	}
}

export default CommentTier2;