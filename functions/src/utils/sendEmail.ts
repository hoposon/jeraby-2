// const { createApi } = require('./axiosAPI')

// const api = createApi({
//   //btoa('0f5e3718599c60c28e56826f9c8bdb88:6abac0a099a72a172bb1c8ef75f036a8')
//   authorization: `Basic ${process.env.RECAPTCHA_SECRET_KEY}`
// })

// //MAILGUN_API_CRED

// const send = (email) => {
//   api.post('https://api.mailjet.com/v3.1/send', {
//     "Messages":[
//       {
//         "From": {
//           "Email": "houf.crane@gmail.com",
//           "Name": "Lukas"
//         },
//         "To": [
//           {
//             "Email": "houf.crane@gmail.com",
//             "Name": "Lukas"
//           }
//         ],
//         "Subject": email.subject,
//         "HTMLPart": email.message
//       }
//     ]
//   })
// }

// module.exports = {
//   send
// }


// import {createApi} from './axiosAPI.js';

interface EmailData {
  subject: string;
  message: string;
}

interface EmailMessage {
  From: {
    Email: string;
    Name: string;
  };
  To: {
    Email: string;
    Name: string;
  }[];
  Subject: string;
  HTMLPart: string;
}

// const api = createApi({
//   // btoa('0f5e3718599c60c28e56826f9c8bdb88:6abac0a099a72a172bb1c8ef75f036a8')
//   authorization: `Basic ${process.env.RECAPTCHA_SECRET_KEY}`,
// });

const send = (email: EmailData): void => {
  const message: EmailMessage = {
    'From': {
      'Email': 'houf.crane@gmail.com',
      'Name': 'Lukas',
    },
    'To': [
      {
        'Email': 'houf.crane@gmail.com',
        'Name': 'Lukas',
      },
    ],
    'Subject': email.subject,
    'HTMLPart': email.message,
  };

  // api.post('https://api.mailjet.com/v3.1/send', {
  //   'Messages': [message],
  // });
  console.log(message);
};

export {
  send,
};


