import functions from 'firebase-functions';
import express, {Request, Response} from 'express';
import cors  from 'cors';
import bodyParser from 'body-parser';

const appi = express();
appi.use(bodyParser.json());
appi.use(cors())

import {verifyRecaptcha} from './src/middlewares/verifyRecaptcha.js';
import {sendEmail} from './src/route-handlers/send-email.js';


appi.get('/', (req: Request, res: Response) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

appi.post('/send-email', verifyRecaptcha, sendEmail);
// appi.post('/send-email', sendEmail);
// appi.post('/send-email', (req, res) => {
//   console.log('🚀 ~ file: index.ts:22 ~ appi.post ~ req:', req.body)
//   res.send('OK')
// })

// const port: number = parseInt(process.env.PORT as string) || 5002;
// const port = 5001;

// appi.listen(port, () => {
//   console.log(`helloworld: listening on port ${port}`);
// });

export const app = functions.https.onRequest(appi);
