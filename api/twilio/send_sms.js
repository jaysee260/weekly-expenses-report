const twilio = require('twilio');
const { 
  accountSid,
  authToken,
  twilioNumber,
  myNumber
} = require('../../config').init().twilio;
const client = new twilio(accountSid, authToken);

// Ideally this would also receive the user's phone number
function send_sms(msg) {
  client.messages.create({
    to: myNumber,  // Text this number
    from: twilioNumber, // From a valid Twilio number
    body: msg
  })
  .then(message => {
    let msg = 'SMS sent';
    console.log(msg + '\n' + message.sid);
  }).catch(err => {
    let msg = 'Error sending SMS';
    console.log(msg + '\n' + err);
  })

}

module.exports = send_sms;

