import React, {Component} from 'react'; 

class EditPost extends Component {
	constructor() {
		super(); 
		this.state = {
			post: null
		}
	}

	componentWillMount() {
		this.setup();
	}

	setup = () => {
		this.setState({
			post: {
				...this.props.post

			}
		})
	}

	handleInput = (e) => {
		this.setState({

			post: {
				...this.state.post, 
				[e.target.name]: e.target.value 
			} 
		});
	}

	handleSubmit = async (e) => { // creating a comment 
		e.preventDefault(); 

		this.props.edit(this.state.post);
		this.props.editPost();

		// this.setState({
			
		// });
	}



	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="description" onChange={this.handleInput} value={this.state.post.description}/>
					<input type="submit" value="Edit" /> 
				</form> 
			</div>

			)
	}
}

export default EditPost;