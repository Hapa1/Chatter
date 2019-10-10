import React, {useState} from 'react';

import './Splash.css';

import Join from '../Join/Join';
import Create from '../Create/Create';
const Splash = () => {

    const [option, setOption] = useState('');
    const [joinChatButtonDocument, setJoinChatButtonDocument] = useState('');
    const [createChatButtonDocument, setOptionCreateChatButtonDocument] = useState('');

    var display = <div></div>; //= ((option == 'join') ? <Join/> : <Create/>);
    if(option=='join') display = <Join/>
    if(option=='create') display = <Create/>
    var action = 'expand';
    

    const joinChatButton = <button id='joinChatButton' className='joinChatButton' 
        onClick={e=>
            {
                setOption('join');
                joinChatButton.style.animationName = "expand";
            }
        }
        type="submit">JOIN CHAT
    </button>
    //const createChatButton
    
    
    console.log(joinChatButtonDocument);
    //console.log(createChatButtonDocument);

    return(
    <div className="joinOuterContainer">
        
        <div className="joinInnerContainer">
            <h1 className="heading" onClick={(e)=>{setOption('create') }}>Create</h1>
            <div id='optionMenu' className="optionMenu" value="">
                <button id='joinChatButton' className='joinChatButton' 
                    onClick={e=>
                        {
                        setOption('join');
                        //setJoinChatButtonDocument(document.getElementById('joinChatButton'))
                        console.log(document.getElementById('optionMenu'))
                        //setOptionCreateChatButtonDocument(document.getElementById('createChatButton'))
                        joinChatButtonDocument.style.animationName = "expand";
                        }
                    }
                    type="submit">JOIN CHAT
                </button>
                <button style={{backgroundColor:'#8bc34a'}}className={'createChatButton'} onClick={e=>setOption('create')} type="submit">CREATE CHAT</button>
                
            </div>
            {  }
            {  }
            {display}
        </div>
        
    </div>
    )
}

export default Splash;