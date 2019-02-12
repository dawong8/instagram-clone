import React, {Component} from 'react'; 
import { Divider, Container, Image, Grid } from 'semantic-ui-react';
import PostList from '../../components/ShowAllPost';

const axios = require("axios");


class MainContainer extends Component {
	constructor() {
		super(); 
		this.state = {
			posts: [], 

			file: null, 
			description: '', 
		}
		this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
	}

	componentDidMount () {
		this.getPost();
	}
	
	getPost = async (arg) => {
		try {

			const response = await fetch('http://localhost:9000/api/v1/post', {
				credentials: 'include'
			});

			if (!response.ok) {
				throw Error(response.statusText);
			}
			const postParsed = await response.json(); 
			console.log("getAllPosts parsed posts: ", postParsed);

			this.setState({
				posts: postParsed 
			});

		} catch (err) {
			return err; 
		}
	}




	onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        formData.append('description', this.state.description);

        const config = {
        	credentials: 'include',

            headers: {
                'content-type': 'multipart/form-data'
            }
        };


        axios.post("http://localhost:9000/api/v1/post", formData ,config)
            .then((response) => {
                // do nothing 
            }).catch((error) => {
            	//alert('error');
        });

        this.setState({
        	description: '', 
        	message: ''
        })

        this.getPost();
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    handleInput = (e) => {
    	this.setState({
    		description: e.target.value
    	});
    }

	render() {
		return ( 
			<div> 
				<form onSubmit={this.onFormSubmit} ref="createPostForm" >
					<input type='file' name="myImage" onChange={this.onChange}/>
					<input type='text' name='description' onChange={this.handleInput} value={this.state.description}/>
					<input type='submit' />
				</form>
				<p> All existing Posts </p>
				<PostList allPosts={this.state.posts} /> 
			</div>
			)
	}
}

export default MainContainer; 