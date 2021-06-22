import React from 'react';
import "./post.css";
import {AllInboxOutlined, MoreVert} from "@material-ui/icons";
import axios from "axios";
import {useState, useEffect} from "react";
import {format} from "timeago.js";
import {Link} from  "react-router-dom";
import {useSelector} from  "react-redux";

const Post = ({post}) => {

    const [like , setLike] = useState(post.likes.length) ;
    const [isLiked, setIsLiked] = useState(false) ;
    const [user, setUser] = useState({});

    const [desc, setDesc] = useState("")
    const [id, setId] = useState(0)
    const [userId, setUserId] = useState(0)
    
    const currentUser = useSelector(state => state.authReducer.user)
    

    
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    const likeHandler = () =>{
        try{
        axios.put("/api/posts/" + post._id + "/like", { userId: currentUser._id })
        }catch(err){

        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked) 
    };

    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

    useEffect(() =>{
        const fetchUser = async () =>{
            const res = await axios.get(`/api/users/getuser?userId=${post.userId}`);
            setUser(res.data)

        };
        
        fetchUser();

    },[post.userId])

    const deletePost =() =>{
        try{
            axios.delete(`/api/posts/deleteposts/${post._id}`)
            window.location.reload()
        }catch (err){

        }
    }    



    return (
        <div>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                           <div className="postTopLeft">
                               <Link to={`profile/${user.username}`}>
                               <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/defaultpic.jpg"} alt=""/>
                               </Link>
                               <span className="postUsername">{user.username}</span>
                            
                               <span className="postDate">{format(post.createdAt)}</span>
                           </div>
                           { post.userId === currentUser._id && 
                           (<div className="postTopRight">
                            <Link to={`/editpost/${post._id}`}> <button className="postButton">Edit</button></Link><button className="postButton" onClick={deletePost}>Delete</button><MoreVert />

                           </div>)}
                           </div>
                    <div className="postCenter">
                        <span className="postText">{post?.desc}</span>
                        <img className="postImg" src={PF+post.img} alt=""/>
                    
                    </div>
                    <div className="postBottom">
                     <div className="postBottomLeft">
                         <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt=""/>
                        
                         <span className="postLikeCounter">{like} people like it</span>
                     </div>
                     <div className="postBottomRight">
                         <span className="postCommentText">{post.comment} comments</span>
                     </div>
                

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
