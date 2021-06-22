import React, {useEffect, useState} from 'react' ;
import "./rightbar.css" ;
import {Users} from "../../dummyData";
import Online from '../online/Online';
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Add, Remove} from "@material-ui/icons"

const Rightbar = ({user}) => {
    console.log("user4", user)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
    const [friends, setFriends] = useState([])
    console.log("friends", friends)

    const currentUser = useSelector(state => state.authReducer.user)
    const [followed, setFollowed] = useState(false)

    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?.id))
    // }, [currentUser, user.id]);
    


    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/api/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFriends();
      }, [user]);

      const HandleClick = async () => {
          try{

            if(followed){
                await axios.put("api/users/" +user._id+"/follow", {userId: currentUser._id})
            }else{
                await axios.put("api/users/" +user._id+"/unfollow",{userId: currentUser._id})
            }

          }catch(err){
              console.log(err)
          }
          setFollowed(!followed)
      };
    

    const HomeRightbar = () =>{
        return(
            <>
            
               <div className="rightbarAd">
                    <span className="rightbarAdText">Ad</span>
                    <img className="rightbarAdImg" src={`${PF}Ads.jpeg`} alt=""/>
                    </div>



                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                        {Users.map(u => (
                            <Online key={u.id} user={u} />
                        ))}
                        
                    </ul>
            </>

        );
    };

    const ProfileRightbar = () => {
        return (
            <>

               {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={HandleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add /> }
                    
                </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Destination:</span>
                    <span className="rightbarInfoValue">{user.destination}</span>
                
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{user.relationship ===1 ? "Single" : user.relationship ===2 ? "Married" : "-" }</span>
                
                </div>

            </div>

            <h4 className="rightbarTitle">User friends</h4>

            <div className="rightbarFollowings">
                {friends.map((friend) => ( 

               <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
               <div key={friend.id} className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/defaultpic.jpg"} alt=""/>
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
                </Link>
                ))}
                
                
                
            </div>
           



            </>

        )
    }


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
             
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}

export default Rightbar
