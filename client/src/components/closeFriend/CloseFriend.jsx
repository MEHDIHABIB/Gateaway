import React from 'react';
import "./closeFriend.css";

const CloseFriend = ({user}) => {
const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
    return (
        <li className="sidebarTraveler">
                        <img className="sidebarTravelerImg" src={PF+user.profilePicture} alt=""/>
                        <span className="sidebarTravelerName">{user.username}</span>
                    </li>

    )
}

export default CloseFriend
