import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import FollowerComponent from '../../components/FollowerComponent';
import Cookies from 'universal-cookie';

class Followers extends Component{
	constructor(){
		super();

		this.state = {
			posts: [],
			comments: []
		};
	}

	componentDidMount(){
		this.getPostAndComment();
	}

	getCurrentUser = async (userId) =>{
		console.log("User id from getCurrentUser: ", userId);
		try {

			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/user/`+userId, {
				credentials: 'include'

			});

			if (!response.ok) {
				throw Error(response.statusText);
			}
			const userParsed = await response.json(); 

			if(userParsed._id){	
				console.log("User parsed from getCurrentUser: ", userParsed);
				return userParsed;
			}
			// this.setState({
				
			// 	posts: postParsed,
				
			// });

		} catch (err) {
			return err; 
		}

	}

	filterPosts = async(parsedPostResponse, userId) => {
		console.log("parsedPostResponse from filterPosts: ", parsedPostResponse);
		console.log("User id: ", userId);
		const currentUser = await this.getCurrentUser(userId);
		console.log("Current User from filterPosts: ", currentUser);

		const followerPostArray = [];
		for(let i=0 ; i<parsedPostResponse.length; i++){
			let roundEnd = false;
			for(let j=0; (j<currentUser.usersFollowing.length) && !roundEnd; j++){
				if(currentUser.usersFollowing[j] === parsedPostResponse[i].owner){
					followerPostArray.push(parsedPostResponse[i]);
					roundEnd = true;
				}
			}
		}

		console.log("Follower post array from filterPosts: ", followerPostArray);
		this.setState({
			posts: followerPostArray
		});
		console.log("Updated state from filterPosts: ", this.state.posts);
	}

	getPostAndComment = async () => {
		try {

			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/post`, {
				credentials: 'include'

			});

			if (!response.ok) {
				throw Error(response.statusText);
			}
			const postParsed = await response.json(); 
			console.log("Posts parsed from Followers Container: ", postParsed);

			const cookies = new Cookies();
    		const userId = cookies.get('userId');
			await this.filterPosts(postParsed, userId);

			// this.getComment();

		} catch (err) {
			return err; 
		}
	}
	

	getComment = async (postId) =>{
		try{
			const followedPosts = this.state.posts;
			console.log("Followed posts from getComment: ", followedPosts);
			const commentsFollowedPosts = [];

			for(let i=0; i<followedPosts.length; i++){
				const response = await fetch(`${process.env.REACT_APP_API}/api/v1/comment/post/` + postId, {
							credentials: 'include'
			
						});
			
						if (!response.ok) {
							throw Error(response.statusText);
						}
						// else{
							const commentParsed = await response.json(); 
							console.log("Comments parsed from getComment: ", commentParsed);
							// As long as there are comments in the following posts, display them
							// if(commentParsed.length !== 0){
							// 	commentsFollowedPosts.push

							return commentParsed;
							// }
						// }
					}



		}

		catch(err){
			return err;
		}
	}
	

	
	render(){
		return(
			<div>
				<Header/>
				<Navbar/>
				<FollowerComponent followingPosts={this.state.posts} getComment={this.getComment}/>
				<Footer/>
			</div>
		);
	}
}

export default Followers;