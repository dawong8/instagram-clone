import React, {Component} from 'react'; 

class CreateComment extends Component {
	constructor() {
		super(); 
		this.state = {
			description: '', 
			postId: ''
		}
	}
	handleInput = (e) => {
		this.setState({
			description: e.target.value, 
			postId: this.props.post
		});
	}

	handleSubmit = async (e) => { // creating a comment 
		e.preventDefault(); 

		this.props.addComment(this.state);

		this.setState({
			description: ''
		});
	}



	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="description" onChange={this.handleInput} value={this.state.description}/>
					<input type="submit" value="Send" /> 
				</form> 
			</div>

			)
	}
}

export default CreateComment;