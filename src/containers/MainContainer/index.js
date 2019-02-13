import React, {Component} from 'react'; 
import PostList from '../../components/ShowAllPost';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Cookies from 'universal-cookie';

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


			addComment: false, // press button to add comment 

			editPost: false, 
			currentPostId: '',
			currentUser: ''

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


	onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.myPost.file);
        formData.append('description', this.state.myPost.description);

        const config = {
        	withCredentials: true,
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


    deletePost = async (id) => {
    	try {
    		
    		const response = await fetch('http://localhost:9000/api/v1/post/' + id, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw Error(response.statusText);
			}

			//const parsedDeletedMovie = await response.json(); 
			this.setState({
				posts: this.state.posts.filter( post => post._id !== id)

			});


    	} catch (err) {
    		return err; 
    	}
    }

    addlike = async (post) => {
    	try {
    		console.log('sent over post', post);
    		const temp = {
    			...post, 
    			likes: post.likes + 1
    		}
    		console.log('added like', temp);
    		const response = await fetch('http://localhost:9000/api/v1/post/' + post._id, {
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


			const tempArray = this.state.posts.map((item) => {
					if (item._id === post._id) {
						item = editParsed;
					} 
					return item; 
					
				});


			this.setState({
				posts: tempArray
			});


    	} catch (err) {
    		return err; 
    	}
    }

    addComment = (id) => {
    	this.setState({
    		addComment: !this.state.addComment,
    		currentPostId: id
    	});
    }
    editPost = (id) => {
    	this.setState({
    		editPost: !this.state.editPost, 
    		currentPostId: id
    	})
    }

    editingPost = async (post) => {
    	try {
			const response = await fetch('http://localhost:9000/api/v1/post/' + post._id, {
				method: 'PUT',
				body: JSON.stringify(post), 
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if(!response.ok) {
				return Error(response.statusText);
			}

			const editParsed = await response.json(); 

			console.log('edited parsed', editParsed);


			const tempArray = this.state.posts.map((item) => {
					if (item._id === post._id) {
						item = editParsed;
					} 
					return item; 
					
				});


			this.setState({
				posts: tempArray
			});

			} catch (err) {
    			return err;
    	}
    }

    getCurrentUser = async () =>{
    	// Currently just prints the id of the current user that is logged in

    	try{
    		const cookies = new Cookies();
	    	// Get current user id
	    	const currentUserId = cookies.get('userId');
	    	// Find name of user with current id by making request to server
	    	const response = await fetch("http://localhost:9000/api/v1/user/"+currentUserId,{
	    		credentials: 'include'
	    	}); 

	    	if(!response.ok) {
					return Error(response.statusText);
			}

			const foundUserParsed = await response.json(); 

			console.log('Parsed found User: ', foundUserParsed.username);

			this.setState({
				currentUser: foundUserParsed.username
			});

			// console.log("State currentUser: ", this.state.currentUser);
	    }

    	catch(err){
    		console.log(err);
    	}
    	//console.log("Current state: ", this.state);
    	//console.log("Current Target Owner: ",e.currentTarget.closest('.completePost').querySelector(".postOwner").innerText);
    }
/*
    followButtonClicked = async () => {
    	const check = false;
    	try{
    		const cookies = new Cookies();
	    	// Get current user id
	    	const currentUserId = cookies.get('userId');
	    	// Find name of user with current id by making request to server
	    	const response = await fetch("http://localhost:9000/api/v1/user/"+currentUserId,{
	    		credentials: 'include'
	    	}); 

	    	if(!response.ok) {
					return Error(response.statusText);
			}

			const foundUserParsed = await response.json(); 

			console.log('Parsed found User: ', foundUserParsed);
	    }

    	catch(err){
    		console.log(err);
    	}

    	console.log("Check value: ", check);
    	return check;
    }
    */



	render() {
		console.log('this.state', this.state);
		return ( 
			<div> 
				<Header/>
				<Navbar/>
				<form onSubmit={this.onFormSubmit} ref="createPostForm" >
					<input type='file' name="myImage" onChange={this.onChange}/>
					<input type='text' name='description' onChange={this.handleInput} value={this.state.description}/>
					<input type='submit' />
				</form>
				<p> All existing Posts </p>
				<PostList allPosts={this.state.posts} currentUserName = {this.state.currentUser} editPost={this.editPost} canEdit={this.state.editPost} editingPost={this.editingPost} deletePost={this.deletePost} addlike={this.addlike} addComment={this.addComment} canComment={this.state.addComment} currentPostId={this.state.currentPostId} /> 
				<Footer/>

			</div>
			)
	}
}

export default MainContainer; 