import React from 'react'; 
import CommentContainer from '../../containers/CommentContainer';
import EditPost from '../EditPost';
// import { Icon } from 'semantic-ui-react';

import Cookies from 'universal-cookie';
import { Card, Icon, Image, Button, Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom'; 
import './index.css';

const PostList = (props) =>{

    const cookie = new Cookies();

    // const currentUser = props.getCurrentUser();
    // console.log("Current user: ", currentUser);
    console.log("Props user name: ", props.currentUserName);


    const posts = props.allPosts.slice(0).reverse().map((item) => { // each item is a post 
        return (
                typeof item === 'undefined' ? null : // may not need?
                <Card className="card" key={item._id}> 
                    <Image className="image card-image" src={`${process.env.REACT_APP_API}/` + item.picture} /> 
                    <Card.Content>
                        <Card.Header> <h2> <Link to={"/profile/" +  item.userId} >{item.owner}</Link> </h2> 
                            { props.currentUserName !== item.owner ? ( props.checkUserExistsInArray(item.owner) ? <span className="followingComponent"> <i className="exceptionAgain fas fa-check-circle"></i> Following </span>: <button className="followUser" onClick={props.followButtonClicked.bind(this, item.owner)}> <i className=" exception fas fa-user-plus"></i> Follow </button>) : null} 

                        </Card.Header>

                            { typeof item.whoLiked.find((i) => {return i===cookie.get('userId')}) === 'undefined' 
                                ? <span> <button id="like" onClick={props.addlike.bind(null, item, true, cookie.get('userId'))} > ❤ </button> {item.likes} </span>
                                : <span> <button id="unlike" onClick={props.addlike.bind(null, item, false, cookie.get('userId'))} > ❤ </button> {item.likes} </span>
                            } 
                            <button onClick={props.addComment.bind(null, item._id)}> 💬</button> 


                            { cookie.get('userId') == item.userId 
                                ? <span> <button onClick={props.editPost.bind(null, item._id)}> ✏️ </button> <button onClick={props.deletePost.bind(null, item._id)}> X </button>  </span>
                                : null 
                            }

                        <Card.Description> 
                        
                            { props.canEdit && props.currentPostId == item._id ? <EditPost post={item} edit={props.editingPost} editPost={props.editPost} /> : <h2> {item.description}</h2> }
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                        <CommentContainer userId={item.userId} thePost={item._id} canComment={props.canComment} currentPostId={props.currentPostId} /> 
                    </Card.Content>
                </Card>
            )

    });
    return(
        <div className="main"> 
            
                    {posts}
                
        </div>
    );
}

export default PostList;