import React, {useEffect, useState} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from './firebase';
import firbase  from 'firebase'


function Chat({user}) {

    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([])



    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => 
                doc.data()))
            )

        };

        Math.floor(
            setSeed(Math.floor(Math.random()*5000))
        )
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms')
        .doc(roomId)
        .collection("messages")
        .add({
            message: input,
            name: user.displayName,
            timestamp: firbase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => alert(error))

        console.log(input)

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <IconButton>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                </IconButton>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName ? 'chat__receiver' : ''}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        { new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
