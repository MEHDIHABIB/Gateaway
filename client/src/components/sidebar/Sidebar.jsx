import React from 'react';
import "./sidebar.css";
import {RssFeed, Info, Event, LocalMall, Chat, People, HelpOutline} from "@material-ui/icons";
import {Users} from "../../dummyData";
import CloseFriend from '../closeFriend/CloseFriend';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>

                    </li>


                    <li className="sidebarListItem">
                        <Info className="sidebarIcon"/>
                        <span className="sidebarListItemText">Info</span>

                    </li>

                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chat</span>

                    </li>

                    <li className="sidebarListItem">
                        <People className="sidebarIcon"/>
                        <span className="sidebarListItemText">Group</span>

                    </li>

                    <li className="sidebarListItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>

                    </li>

                    <li className="sidebarListItem">
                        <LocalMall className="sidebarIcon"/>
                        <span className="sidebarListItemText">Shop</span>

                    </li>

                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>

                    </li>

                    


                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarTravelerList">
                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                    
                </ul>
            </div>
            
        </div>
    )
}

export default Sidebar
