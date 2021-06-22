import {GET_POST, GET_ALL_POSTS} from "../action/postActionTypes" ;


const initialState = {
    posts: [],
}

export default function postReducer(state=initialState, action) {
switch(action.type){
    case GET_POST:
        return {...state, posts: action.payload}

    case GET_ALL_POSTS:
        return {...state, posts: action.payload}

        default: return state
}
}