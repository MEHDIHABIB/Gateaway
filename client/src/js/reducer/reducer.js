import {combineReducers} from "redux" ;
import authReducer from "./authReducer" ;
import postReducer from "./postReducer";
import userReducer from "./userReducer";


export default combineReducers({
    authReducer, 
    postReducer, 
    userReducer
})