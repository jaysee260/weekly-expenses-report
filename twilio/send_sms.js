const twilio = require('twilio');
const { 
  accountSid,
  authToken,
  twilioNumber,
  myNumber
} = require('../config').init().twilio;
const client = new twilio(accountSid, authToken);

client.messages.create({
  to: myNumber,  // Text this number
  from: twilioNumber, // From a valid Twilio number
  body: 'Hello from Node'
})
.then((message) => console.log(message.sid));

