import React, {Component} from 'react'; 
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProfileBody from '../ProfileBody';
import './index.css';


class ProfileContainer extends Component {
	constructor() {
		super(); 
		this.state = {
			user: {
				username: '', 
				followers: 0, 
				following: 0,
			}, 
			posts: []
		}
	}

	componentDidMount() {
		this.getUser();
		this.getPosts();


	}


	getUser = async () => {
		try {

			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/user/`+this.props.match.params.handle,{
	            credentials: 'include'
	        });
	        if(!response.ok){
	            return Error(response.statusText);
	        }
	        const foundUserParsed = await response.json(); 

	        console.log(foundUserParsed)
	        this.setState({
	        	user: {
	        		...this.state.user, 
	        		username: foundUserParsed.username, 
	        		followers: foundUserParsed.followers, 
	        		following: foundUserParsed.usersFollowing.length
	        	}
	        });


		} catch (err) {
			return err; 
		}
	}

	getPosts = async () => {
		try {

			const response = await fetch(`${process.env.REACT_APP_API}/api/v1/user/`+this.props.match.params.handle+"/posts",{
	            credentials: 'include'
	        });
			if(!response.ok){
	            return Error(response.statusText);
	        }
	        const foundPosts = await response.json(); 

	        console.log('foundPosts is', foundPosts)
	        this.setState({
	        	posts: foundPosts
	        })
		} catch (err) {
			return err; 
		}
	}

	render() {
		console.log('this.state.posts', this.props.match.params.handle)
		return ( 
			<div className='container'> 
				<Header/>
				<Navbar/>

				<div className="side"> 

					<h1> {this.state.user.username} </h1>

					<section>
						<span> POSTS </span>
						<div> {this.state.posts.length} </div>
					</section> 
					<section>
						<span> FOLLOWING </span>
						<div> {this.state.user.following} </div>
					</section> 
					<section>
						<span> FOLLOWERS </span>
						<div> {this.state.user.followers} </div>
					</section> 
				</div>

				<aside>
					<ProfileBody allPosts={this.state.posts} />
				</aside>
					

					
			</div>
			)
	}
}

export default ProfileContainer; 