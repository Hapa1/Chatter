import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; //helps retrieve data from url
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState(''); //first param: variable, second param: setter function.. passing in an empty string as init val
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    //const ENDPOINT = 'https://hapachat.herokuapp.com/';
    useEffect(() => { //runs when component renders 
        //const data = queryString.parse(location.search);
        const { name, room } = queryString.parse(location.search); //location is from reactrouter, location.search is a url i.e. ?name=1&room=1

        socket = io(ENDPOINT); //create instance of a socket 

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            console.log("Name:",name)
            console.log("Room",room)
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search] ); //ensures that useeffect ocurs only once if ENDPOINT and location change

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

        return () => {
            socket.emit('disconnect');
      
            socket.off();
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault(); //prevents default behaviour of whole page refreshing?

        if(message) {
            socket.emit('sendMessage', message, () => setMessage('')); //callback clears message
        }
    }

    console.log("Users",users)


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat