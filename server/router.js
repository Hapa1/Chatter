const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', (req,res) => {
    res.send('server is up')
});

router.get('/send', (req,res) => {
    console.log("Sending mail")
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ryanmyankees@gmail.com',
          pass: 'youareout'
        }
    });
    var mailOptions = {
        from: 'ryanmyankees@gmail.com',
        to: 'ryanmyankees@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send("error")
        } else {
          console.log('Email sent: ' + info.response);
          res.send("success")
        }
    });
});

module.exports = router;