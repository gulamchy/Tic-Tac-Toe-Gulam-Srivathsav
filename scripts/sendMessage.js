const AWS = require('aws-sdk');
const ses = new AWS.SES();

const sendMessage = async ({ email, message }) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Tic-tac-toe Game Notifications",
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: message,
          Charset: "UTF-8",
        },
        Html: {
          Data: `<p>${message}</p>`,
          Charset: "UTF-8",
        },
      },
    },
    Source: process.env.AWS_SES_SENDER || "gulamsulaman@gmail.com", // Use your SES sender email or a default one
  };

  // Use ses.sendEmail to send the email
  return ses.sendEmail(params).promise();
};

sendMessage({ email: process.env.EMAIL_ADDRESS, message: 'Sending an email from SES!' })
  .then(() => console.log('Sent email successfully'))
  .catch((error) => console.log('Error sending SES: ', error.message));
