import React, {useEffect, useState} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';

function Sidebar({user}) {

    

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const unsubscribe =  db.collection("rooms").onSnapshot((snapshot) => 
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        // optimization step
        return() => {
            unsubscribe();
        }
    }, [])

    return(
        <div className="sidebar">
            <div className="sidebar__header">
                <IconButton>
                    <Avatar src={user?.photoURL}/> 
                </IconButton>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>  
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon/>
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => {
                    return(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} user = {user} />
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar