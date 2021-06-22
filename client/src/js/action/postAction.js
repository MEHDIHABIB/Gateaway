import {GET_POST, GET_ALL_POSTS} from "./postActionTypes";
import axios from "axios";

// export const getPost = (postId) =>dispatch=>{
//     axios.get(`/api/posts/getpost/${postId}`)
//     .then(res=>dispatch({type: GET_POST, payload: res.data}))
//     .then(res=>console.log("response", res))
//     .catch(err=>console.log(err))
// }

export const getPost = postId => async dispatch => {
	try {
		
		const res = await axios.get(`/api/posts/getpost/${postId}`);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		console.log('getProducts api error: ', err);
	}
};

export const getAllPosts = () =>dispatch=>{
    axios.get("/api/posts/getallposts")
    .then(res=>dispatch({type: GET_ALL_POSTS, payload: res.data}))
    .then(res=>console.log("res", res))
    .catch(err=>console.log(err))
}



export const createPost = (newPost) =>dispatch=>{
    axios.post("/api/posts/addpost", newPost)
    .then(res=>dispatch(getPost())) 
    .catch(err=>console.log(err))
}

export const updatePost = (postId, updatedPost) =>dispatch=>{
    axios.put(`/api/posts/updatepost/${postId}`, updatedPost)
    .then(res=>dispatch(getPost())) 
    .catch(err=>console.log(err))
}

export const deletePost = (postId) =>dispatch=>{
    axios.delete(`/api/posts/deletepost/${postId}`)
    .then(res=>dispatch(getPost())) 
    .catch(err=>console.log(err))
}