import React, {Component} from 'react'; 

class EditComment extends Component {
	constructor() {
		super(); 
		this.state = {
			comment: null
		}
	}
	componentWillMount() {
		this.setUp();
	}
	setUp = () => {
		this.setState({
			comment: {
				...this.props.comment
			}
		})
	}

	handleInput = (e) => {
		this.setState({
			comment: {
				...this.state.comment,
				description: e.target.value
			}
			
		});
	}

	handleSubmit = async (e) => { // creating a comment 
		e.preventDefault(); 

		this.props.submitEdit(this.state.comment);
		console.log('state comment', this.state.comment);

		this.props.form(); //changes back to from form to text

		// this.setState({
		// 	description: ''
		// });
	}



	render() {

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="description" onChange={this.handleInput} value={this.state.comment.description}/>
					<input type="submit" value="Edit" /> 
				</form> 
			</div>

			)
	}
}

export default EditComment;