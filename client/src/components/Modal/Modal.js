import React, {useState} from 'react';

import './Modal.css'

const Modal = () => {

    const [input, setInput] = useState('');
    const [emails, setEmails] = useState([]);

    const validateEmail = (email) => {
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    return (
    <div>
        <center><h3>Hello!</h3></center>
        <textarea rows="10" cols="50" className="modalInput" 
            onChange={(e) => { validateEmail(e.target.value); 
            console.log(e.key)
            setInput(e.target.value)}}
            
            onKeyPress={e => {console.log(e.key);if(e.key=='Enter' || e.key=='p'){
                setInput(input.slice(0, -1));
                console.log(input)
                if(validateEmail(input)){
                    console.log('true')
                    console.log(validateEmail(input))
                }
                else {
                    console.log('false')
                }
            }}}
                
                //event.key === 'Enter' ? sendMessage(event) : null}
        >
        </textarea>
        <button className={'submitButton'} type="submit">Invite</button>
    </div>
         
    )
}

export default Modal;