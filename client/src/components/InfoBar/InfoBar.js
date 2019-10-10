import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import axios from 'axios';

import './InfoBar.css';

const InfoBar = ( {room} ) => {

    const [recipient, setRecipient] = useState('');

    return(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <input type="text" onChange={(event) => { console.log(event.target.value); setRecipient(event.target.value)}}>
                
            </input>
            
                    <button type="submit" onClick={ e => {
                        //(!recipient) ? e.preventDefault() : null
                        e.preventDefault()
                        axios.get(`http://localhost:5000/send`, {
                            params: {
                                recipient: recipient,
                                room: room,
                            }
                        })
                    }    
                    } action={`/send/${recipient}`}>>Submit</button>
            
            <a href="/"><img src={closeIcon} alt="close icon" /></a>
        </div>
    </div>
)}

export default InfoBar;