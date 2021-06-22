import {useEffect, useState} from "react" ;
import {useDispatch, useSelector} from "react-redux" ;
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom" ;
import AppNavBar from './components/AppNavBar';
import {getAuthUser} from "./js/action/authAction" ;

import Dashboard from "./components/pages/Dashboard" ;
import Home from "./page/home/Home";
import Profile from "./page/profile/Profile";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import RegisterModal from "./components/auth/Register";
import LoginModal from "./components/auth/Login";
import Home1 from "./components/pages/Home1";
import PrivateRoute from "./components/route/PrivateRoute";
import {getUsers} from "./js/action/userAction";
import {getAllPosts} from "./js/action/postAction";
import AdminDashboard from "./components/pages/AdminDashboard";
import EditPost from "./components/EditPost";
import axios from "axios";






function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  console.log("user", user)

  
  const getUser = ()=> dispatch(getAuthUser())
  useEffect(() => {
    getUser()
  }, [])

  // const users = useSelector(state => state.userReducer.users)
  // console.log("users", users)

  // const posts = useSelector(state => state.postReducer.posts)
  // console.log("posts", posts)



  
  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(getAllPosts())

  // },[dispatch])

  

  return (
    
     

<BrowserRouter>


    <AppNavBar/> 
    <Switch>
    <Route exact path="/">
     { user ? <Dashboard /> : <Home1 /> }
    
    </Route>
    <PrivateRoute  path="/homepage" component={Dashboard} /> 
    
    <Route path="/admin">
      { user ? <AdminDashboard /> : <Home1 /> }
    </Route>
    <Route path="/profile/:username">
    { user ? <Profile /> : <Redirect to="/" /> }
    </Route>

    <Route path="/editPost/:postId" component= {EditPost} />
    
    

    </Switch>
    
    </BrowserRouter> 

    
  );
}

export default App;








































