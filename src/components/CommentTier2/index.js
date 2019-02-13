import React, {Component} from 'react'; 
import CreateComment from '../CreateComment';

/*

these are tier2 comments, they dont need to ref to a post.id as long as they are attached to their parent comment 

*/
class CommentTier2 extends Component {
	constructor() {
		super(); 
		this.state = {
			actualComments: [],// the actual comment objs
			comments: [], // the existing children comments id
			parentComment: null // this is your parent comment 
		}
	}

	componentWillMount =  () => {
		this.setup();
	}

	componentDidMount() {
		this.convertId();
	}
	setup = () => {

		this.setState({
			parentComment: {
				...this.props.currentComment
			}, 
			comments: [...this.props.currentComment.children], 

		});
	}

	convertId = () => {
		const temp = this.state.comments.map((item) => {
			return this.getComments(item); //each 'item' is an id, here 
		});
		console.log('covert', temp[0])

		this.setState({
			actualComments: [...temp]
		});
	}

	getComments = async (id) => {
 		try {
 			const response = await fetch('http://localhost:9000/api/v1/comment/' + id);
 			if (!response.ok) {
 				throw Error(response.statusText);
 			}

 			const parsedComment = await response.json(); 

 			return parsedComment;

 		} catch (err) {
 			return err; 
 		}
 	}

	addComment = async (arg) => {
		try {
			const response = await fetch('http://localhost:9000/api/v1/comment', {
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
				comments: [...this.state.comments, parsedCreatedComment._id], 
				actualComments: [...this.state.actualComments, parsedCreatedComment]
			}); // update state


		// After created the new comment, we want to store it in our parent's array 


			const temp = [
				...this.state.parentComment.children, 
				this.state.comments
			];
			console.log('temp', temp);
			const tempParent = {
				...this.state.parentComment, 
				children: temp
			};
			console.log('tempParent', tempParent);

			const parentResponse = await fetch('http://localhost:9000/api/v1/comment/' + this.state.parentComment._id, {
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
		const embeddedComments = this.state.actualComments.map((item) => {
			return <li key={item._id}> {item.description} </li>
		});

		return (
			<div> 
				<ul> {embeddedComments} </ul> 
				<CreateComment addComment={this.addComment} />

			</div>
			)
	}
}

export default CommentTier2;