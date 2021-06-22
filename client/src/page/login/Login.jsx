import React, { useRef } from 'react';
import "./login.css";

const Login = () => {

    const email = useRef() ;
    const password = useRef();


    const handleClick = (e) =>{
        e.preventDefault() ;
        console.log(email.current.value)
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    
                    <h3 className="loginLogo">GateAway</h3>
                    <span className="logoDesc">Social Media for Travellers</span>
                    
                
                </div>
                <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                    <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}/>
                    <button className="loginButton">Log In</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">Create a New Account</button>
                    
                </form>
                </div>
            </div>
            
        </div>
    )
}

export default Login
