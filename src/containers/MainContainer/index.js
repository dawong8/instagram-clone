import React, {Component} from 'react'; 
import PostList from '../../components/ShowAllPost';

const axios = require("axios");


class MainContainer extends Component {
	constructor() {
		super(); 
		this.state = {
			posts: [], 

			myPost: {
				file: null, 
				description: '',
			},
			 

			currentUser: '' // should be a username
		}
		//this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
	}

	componentDidMount () {
		this.getPost();
		this.getCurrentUser();
	}
	getPost = async (arg) => {
		try {

			const response = await fetch('http://localhost:9000/api/v1/post');

			if (!response.ok) {
				throw Error(response.statusText);
			}
			const postParsed = await response.json(); 

			this.setState({
				
				posts:  postParsed
				
			});

		} catch (err) {
			return err; 
		}
	}

	getCurrentUser = async (arg) => {
		try {
			const response = await fetch('http://localhost:9000/api/v1/auth'); 
			if (!response.ok) {
				throw Error(response.statusText);
			}
			const userParsed = await response.json(); 

			this.setState({
				currentUser: userParsed.username 
			});

		} catch (err) {
			return err; 
		}
	}



	onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.myPost.file);
        formData.append('description', this.state.myPost.description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let tempObj; 

        const res = await axios.post("http://localhost:9000/api/v1/post", formData ,config)
            .then(  (response) => {
                // do nothing 
                //parsedJson = response.json();
                console.log('it worked', response.data.newPost); 

                tempObj =  response.data.newPost;
            }).catch((error) => {
            	//alert('error');
            	console.log('err', error);
        });
        console.log('at this point, what is tempObj', tempObj);

        this.setState({
        	posts: [...this.state.posts, tempObj],

        	myPost: { 
					description: '', 
					file: null
				}
        }); 

    }
    onChange(e) {
        this.setState({
        	myPost : {
        		...this.state.myPost, 
        		file: e.target.files[0]

        	}
        });
    }

    handleInput = (e) => {
    	this.setState({
    		myPost : {
    			...this.state.myPost, 
    			description: e.target.value
    		}
    	});
    }

	render() {
		console.log('this.state', this.state);
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