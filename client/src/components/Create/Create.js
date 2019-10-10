import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Create.css';

const Create = () => {

    const [name, setName] = useState(''); //first param: variable, second param: setter function.. passing in an empty string as init val
    const [room, setRoom] = useState('');
    const [option, setOption] = useState('join'); 

    return (
        <div className="createMenu">   
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => { console.log(event.target.value);setName(event.target.value) }} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => { console.log(event.target.value); setRoom(event.target.value)}} />
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'createButton mt-20'} type="submit">Create</button>
                </Link>
  
        </div>
    )
}

export default Create