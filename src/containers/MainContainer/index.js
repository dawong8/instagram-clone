import React, {Component} from 'react'; 
import PostList from '../../components/ShowAllPost';
import Cookies from 'universal-cookie';
import { Form, TextArea } from 'semantic-ui-react'
import './index.css';

const axios = require("axios");


class MainContainer extends Component {     // this is technically post container for all posts 
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
            currentUser: '',
            currentUserFollowingArray: [],
            liked: false
        }
        //this.onFormSubmit = this.onFormSubmit.bind(this);
        //this.onChange = this.onChange.bind(this);
    }
    componentDidMount () {
        this.getPost();
        this.getCurrentUser();
    }
    
    getPost = async (arg) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/post`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const postParsed = await response.json(); 
            this.setState({
                
                posts: postParsed,
                
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
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/post`, formData ,config)
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
    onChange = (e) => {
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
            
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/post/` + id, {
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
    addlike = async (post, remove, userId) => { // remove arg, true: add like, false: remove like
        try {
            
            let temp = null; 
            if (remove) {
                temp = {
                    ...post, 
                    likes: post.likes + 1, 
                    whoLiked: [...post.whoLiked, userId]
                }
            } else {
                temp = {
                    ...post, 
                    likes: post.likes - 1, 
                    whoLiked: post.whoLiked.filter( item => item !== userId)
                }
            }
            console.log('temp is ', temp);
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/post/` + post._id, {
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
            if (post._id == this.state.currentPostId) { // same key pressed for the same post 
                this.setState({
                    posts: tempArray, 
                    liked: !this.state.liked, 
                    currentPostId: post._id
                })
            } else { //if a different one is pressed 
                this.setState({
                    posts: tempArray, 
                    liked: true, 
                    currentPostId: post._id
                })
            }
        } catch (err) {
            return err; 
        }
    }
    addComment = (id) => {
        if (id == this.state.currentPostId) { // same key pressed for the same post 
            this.setState({
                addComment: !this.state.addComment, 
                currentPostId: id
            })
        } else { //if a different one is pressed 
            this.setState({
                addComment: true, 
                currentPostId: id
            })
        }
    }
    editPost = (id) => {
        if (id == this.state.currentPostId) { // same key pressed for the same post 
            this.setState({
                editPost: !this.state.editPost, 
                currentPostId: id
            })
        } else { //if a different one is pressed 
            this.setState({
                editPost: true, 
                currentPostId: id
            })
        }
    }
    editingPost = async (post) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/post/` + post._id, {
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
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/user/`+currentUserId,{
                credentials: 'include'
            }); 
            if(!response.ok) {
                    return Error(response.statusText);
            }
            const foundUserParsed = await response.json(); 
            console.log('Parsed found User: ', foundUserParsed);
            this.setState({
                currentUser: foundUserParsed.username,
                currentUserFollowingArray: foundUserParsed.usersFollowing
            });
            // console.log("State currentUser: ", this.state.currentUser);
        }
        catch(err){
            console.log(err);
        }
        //console.log("Current state: ", this.state);
        //console.log("Current Target Owner: ",e.currentTarget.closest('.completePost').querySelector(".postOwner").innerText);
    }
    savedDataIntoDatabase = async (followingArray) =>{
        // console.log("Data being saved");
        console.log("Following Array: ", followingArray);
        const cookies = new Cookies();
        // Get current user id
        const currentUserId = cookies.get('userId');
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/user/`+currentUserId,{
            credentials: 'include'
        });
        if(!response.ok){
            return Error(response.statusText);
        }
        const foundUserParsed = await response.json(); 
        console.log('Parsed found User IN DATABASE FUNCTION: ', foundUserParsed);
        // equating the two objects make them reference to each other and changes the value of foundUserParsed
        // when you change the value of updatedUser
        const updatedUser = {...foundUserParsed};
        updatedUser.usersFollowing = followingArray;
        console.log("UPDATED USER IN DATABASE FUNCTION: ", updatedUser);
        // update the databse with the new results
        //throwing error here
        const modifiedResponse = await fetch(`${process.env.REACT_APP_API}/api/v1/user/` + currentUserId, {
                method: 'PUT',
                body: JSON.stringify(updatedUser), 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok) {
                return Error(response.statusText);
            }
            const modifiedParsed = await modifiedResponse.json(); 
            // console.log('MODIFIED RESPONSE PARSED:', modifiedParsed);
    }
    followButtonClicked =  (personYouWantToFollow) => {
        console.log("Follow button clicked. The person you want to follow is: ", personYouWantToFollow);
        // If user follows someone, the user that they followed must be added to their database as long as that person doesn't exist in the database.
        const peopleFollowing = this.state.currentUserFollowingArray;
        // console.log("People following array: ", peopleFollowing);
        // If the person is not following anyone, you must just push it into the following array and save it in the db
        if(peopleFollowing.length === 0){
            peopleFollowing.push(personYouWantToFollow);
            this.setState({
                currentUserFollowingArray: peopleFollowing
            });
            // Save the entry into the database: NEED TO DO THIS
            console.log("State Array: ", this.state.currentUserFollowingArray);
            this.savedDataIntoDatabase(this.state.currentUserFollowingArray);
        }
        else
        {
            // If the person is following someone, check his array to make sure that the person he is following has not been added to it already
            let arrayEnd = false;
            for(let i=0; (i<peopleFollowing.length && !arrayEnd); i++){
                    if(peopleFollowing[i] === personYouWantToFollow){
                        // console.log("You already follow this person");
                        arrayEnd = true;
                    }
            }
            if(!arrayEnd){
                peopleFollowing.push(personYouWantToFollow);
                this.setState({
                    currentUserFollowingArray: peopleFollowing
                });
                // Save the entry into the database: NEED TO DO THIS
                console.log("State Array: ", this.state.currentUserFollowingArray);
                this.savedDataIntoDatabase(this.state.currentUserFollowingArray);
            }
            else{
                console.log("You already follow this person");
            }
         }
        
        // The user that got followed must have no of followers increased by 1 for every new user that followed this person
    }
    checkUserExistsInArray = (user) =>{
        let check = false;
        const userArray = this.state.currentUserFollowingArray;
        console.log("User array in checkUserExistsInArray:", userArray);
        for(let i=0; (i<userArray.length && !check); i++){
            if(user === userArray[i]){
                check = true;
            }
        }
        console.log(user," checking in array: ", check);
        return check;
    }
    render() {
        console.log('this.state', this.state);
        return ( 
            <div> 
                <Form className="create-post" onSubmit={this.onFormSubmit} ref="createPostForm" >
                    <input type='file' name="myImage" onChange={this.onChange}/> 
                    <TextArea placeholder='share to the world' type='text' name='description' onChange={this.handleInput} value={this.state.description}/>
                    <input id='submit' type='submit' value='Create Post' />
                </Form>

                <PostList postLiked={this.state.liked} getUser={this.getCurrentUser} allPosts={this.state.posts} checkUserExistsInArray={this.checkUserExistsInArray} followButtonClicked={this.followButtonClicked} currentUserName={this.state.currentUser} editPost={this.editPost} canEdit={this.state.editPost} editingPost={this.editingPost} deletePost={this.deletePost} addlike={this.addlike} addComment={this.addComment} canComment={this.state.addComment} currentPostId={this.state.currentPostId} /> 
            </div>
            )
    }
}
export default MainContainer;