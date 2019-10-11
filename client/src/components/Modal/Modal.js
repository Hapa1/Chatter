import React, {useState} from 'react';
import axios from 'axios';
import closeIcon from '../../icons/closeIcon.png';

import './Modal.css'

const Modal = ( {room} ) => {

    const [input, setInput] = useState('');
    const [emails, setEmails] = useState([]);

    const validateEmail = (input) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.replace(/(\r\n|\n|\r)/gm, ""));
    }

    const removeEmail = (email) => {
        const element = document.getElementById(email);
        element.parentElement.removeChild(element);
        emails.splice(emails.indexOf(email),1);
    }

    const emailList = emails.map( email => {
        return(
        <span id={email} key={email} className="email">{email} <img onClick={e=>{removeEmail(email)}}src={closeIcon} alt="close icon" /></span>
        )
    });

    return (
    <div id="modalBox">
        <center><h3>Invite Friends</h3></center>
        <textarea id="modalInput" rows="1" cols="50" className="modalInput" placeholder="Type an email..." type='text'
            onKeyPress={e => {if(e.key=='Enter' || e.key==' '){ 
                const modalInput = document.getElementById('modalInput')
                if(validateEmail(input)){
                    modalInput.value = "";
                    modalInput.scrollLeft = 0;
                    emails.push(input);
                }
            }}}
            onChange={(e) => { validateEmail(e.target.value); 
                setInput(e.target.value);
                const modalInput = document.getElementById('modalInput');
                modalInput.value = modalInput.value.replace(/(\r\n|\n|\r)/gm, "");
            }}
                
            
                
                //event.key === 'Enter' ? sendMessage(event) : null}
        >
        </textarea>
        <div className="emailList">
            {emailList}
        </div>
        <button className={'submitButton'} type="submit" onClick={ e => {
                        //(!recipient) ? e.preventDefault() : null
                        e.preventDefault()
                        for (const recipient of emails) {
                            axios.get(`http://localhost:5000/send`, {
                            params: {
                                recipient,
                                room,
                            }
                            })
                        }
                        
                    }    
        }>Invite</button>
    </div>
         
    )
}

export default Modal;