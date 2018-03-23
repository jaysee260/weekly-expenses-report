'use strict'

//////////////////////////////////////////////
/////   process incoming sms messages   /////
////////////////////////////////////////////

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const sms = (router) => {
  router.post('/', (req, res, next) => {
    console.log('response triggered');
    const twiml = new MessagingResponse();
  
    const msg = twiml.message('Greetings from Master Server');
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    next();
  });
}

module.exports = sms;
