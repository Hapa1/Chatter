import React, {useCallback, useState} from 'react';
import { Link } from 'react-router-dom';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import Modal from '../Modal/Modal';
import axios from 'axios';

import './InfoBar.css';

const InfoBar = ( {room} ) => {

    const [recipient, setRecipient] = useState('');
    const [modalActive, setModalActive] = useState(false);
    
   
    const activateModal = () => {
        setModalActive(true);
        const myModal = document.getElementById('modalContainer');
        const myModalBackground = document.getElementById('modalBackground');
        myModal.style.visibility = "visible"
        myModal.style.animation = "fadein .5s";
        myModalBackground.style.visibility = "visible";
        myModalBackground.style.animation = "backgroundfadein .5s";
    }; 

    const deactivateModal = () => {
        setModalActive(false);
        const myModal = document.getElementById('modalContainer');
        const myModalBackground = document.getElementById('modalBackground');
        myModal.style.visibility = "hidden";
        myModal.style.animation = "";
        myModalBackground.style.visibility = "hidden";
        myModalBackground.style.animation = "";
    };

    return(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            
            <button onClick={ e => {activateModal()}}>Clickme</button>
            <input type="text" onChange={(event) => { console.log(event.target.value); setRecipient(event.target.value)}}/>
            
            
            <div id='modalBackground' onClick={e=>{deactivateModal()}}
            className='modalBackground'>
            
            </div>
            <div id='modalContainer' className='modalContainer'>
                <Modal/>
            </div>     
            
            
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