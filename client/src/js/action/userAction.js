import {GET_USERS} from "./userActionTypes";
import axios from "axios";


export const getUsers = () =>dispatch=>{
    axios.get("/api/users/getallusers")
    .then(res=>dispatch({type: GET_USERS, payload: res.data}))
    .then(res=>console.log("res1", res))
    .catch(err=>console.log(err))
}

// export const addUser = (newUser) =>dispatch=>{
//     axios.post("/api/users/")
//     .then(res=>dispatch(getUsers())) 
//     .catch(err=>console.log(err))
// }

export const updateUser = (userId, updatedUser) =>dispatch=>{
    axios.put(`/api/users/updateuser/${userId}`, updatedUser)
    .then(res=>dispatch(getUsers())) 
    .catch(err=>console.log(err))
}

export const deleteUser = (userId) =>dispatch=>{
    axios.delete(`/api/users/deleteuser${userId}`)
    .then(res=>dispatch(getUsers())) 
    .catch(err=>console.log(err))
}