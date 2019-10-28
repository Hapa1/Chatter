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
    
   
    const activateModal = (e) => {
        setModalActive(true);
        const myModal = document.getElementById('modalContainer');
        const myModalBackground = document.getElementById('modalBackground');
        myModal.style.visibility = "visible"
        myModal.style.animation = "fadein .5s";
        myModalBackground.style.visibility = "visible";
        myModalBackground.style.animation = "backgroundfadein .5s";
    }; 

    const deactivateModal = (e) => {
        setModalActive(false);
        const myModal = document.getElementById('modalContainer');
        const myModalBackground = document.getElementById('modalBackground');
        myModal.style.visibility = "hidden";
        myModal.style.animation = "";
        myModalBackground.style.visibility = "hidden";
        myModalBackground.style.animation = "";
    };

    const print = () => {
        console.log("Hi")
    }

    return(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            
            <div style={{color:'white'}} onClick={ e => {activateModal()}}>INVITE USERS</div>
            <div id='modalBackground' onClick={e=>{deactivateModal()}}
            className='modalBackground'>
            </div>
            <div id='modalContainer' className='modalContainer'>
                <Modal deactivateModal={deactivateModal} room={room}/>
            </div>     

            <a href="/"><img src={closeIcon} alt="close icon" /></a>
        </div>
    </div>
)}

export default InfoBar;