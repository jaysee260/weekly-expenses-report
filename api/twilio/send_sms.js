const twilio = require('twilio');
const { 
  accountSid,
  authToken,
  twilioNumber,
  myNumber
} = require('../../config').init().twilio;
const client = new twilio(accountSid, authToken);

function send_sms(msg) {
  client.messages.create({
    to: myNumber,  // Text this number
    from: twilioNumber, // From a valid Twilio number
    body: msg
  })
  .then((message) => 
    console.log(message.sid));
}

// send a text after X milliseconds
module.exports = (msg, ms) => {
  setTimeout(() => send_sms(msg), ms);
}

