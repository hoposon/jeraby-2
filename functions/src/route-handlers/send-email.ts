// // const axios = require('axios').default;
// const { sendEmail: send} = require('../utils/sendEmail')

// const sendEmail = async (req, res) => {

//   if (req.body && req.body.subject && req.body.message) {
//     try {
//       await send(req.body)
//       res.json({"email-sent": "OK"})
//     } catch(e) {
//       res.status(500).json({"error": JSON.stringify(e, Object.getOwnPropertyNames(e))})
//     }
//   } else {
//     res.status(400).end()
//   }
// }

// module.exports = {
//   sendEmail
// }


import {Request, Response} from 'express';
import {send as sendEmailUtil} from '../utils/sendEmail.js';

interface EmailBody {
  subject: string;
  message: string;
  [key: string]: any; // To allow for other potential properties without TypeScript errors.
}

const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as EmailBody;

  if (body && body.subject && body.message) {
    try {
      await sendEmailUtil(body);
      res.json({'email-sent': 'OK'});
    } catch (e) {
      res.status(500).json({'error': JSON.stringify(e, Object.getOwnPropertyNames(e))});
    }
  } else {
    console.log('🚀 ~ file: send-email.ts:43 ~ sendEmail ~ else:');
    // res.status(401).json({error: 'Unauthorized'});
    res.status(400).json({error: 'Missging fields'});
  }
};

export {
  sendEmail,
};
