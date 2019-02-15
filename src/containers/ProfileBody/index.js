import React from 'react'; 

import { Image, Grid } from 'semantic-ui-react'
import './index.css';

const ProfileBody = (props) =>{


    const posts = props.allPosts.slice(0).reverse().map((item) => { // each item is a post 
        console.log(props.allPosts)
        return (
                <div key={item._id}> <img className="profile-posts" src={`${process.env.REACT_APP_API}/` + item.picture} /> </div>

            )

    });
    return(
        <div className="flex"> 
            
                    {posts}
                
        </div>
    );
}

export default ProfileBody;