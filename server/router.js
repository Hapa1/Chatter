const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { sendGridAPI } = require('../config.js');

router.get('/', (req,res) => {
    res.send('server is up')
});

router.get('/send', (req,res) => {
    let recipient = req.query.recipient
    console.log("que",req.query.room);
    //if(!recipient){
    //    return res.status(400).send({error:true,message:'Please provide an email'})
    //}
    //console.log("body",req.body)
    console.log("Sending mail to",recipient)
    sgMail.setApiKey(sendGridAPI);
    const msg = {
    to: recipient,
    from: 'noreply@hapachat.com',
    subject: 'You have received an invite',
    html: `<center>
    <p>
      Greetings from the Hapachat team,
    </p>
    <p>
      You have been invited to join this chatroom
    </p>
    <a href="http://localhost:3000/chat?name=${req.query.recipient}&room=${req.query.room}">
    <button style="color: #fff!important;background-color:#2979ff;text-transform: uppercase;text-decoration: none;width: 20%;border-radius: 5px;border: none;padding: 20px;">
    Join Chat
    </button>
    </a>
    </center>`,
    };
    sgMail.send(msg).then(() => {
      //Celebrate
    }).catch(error => {

      //Log friendly error
      console.error(error.toString());
  
      //Extract error msg
      const {message, code, response} = error;
  
      //Extract response msg
      const {headers, body} = response;
    });

    
});

module.exports = router;