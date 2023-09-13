import functions from 'firebase-functions';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

const appi = express();
appi.use(bodyParser.json());

import {verifyRecaptcha} from './src/middlewares/verifyRecaptcha.js';
import {sendEmail} from './src/route-handlers/send-email.js';


appi.get('/', (req: Request, res: Response) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

appi.get('/send-email', verifyRecaptcha, sendEmail);
// appi.post('/send-email', sendEmail);

// const port: number = parseInt(process.env.PORT as string) || 5002;
// const port = 5001;

// appi.listen(port, () => {
//   console.log(`helloworld: listening on port ${port}`);
// });


// exports.appi = functions.https.onRequest(appi);
export const app = functions.https.onRequest(appi);
