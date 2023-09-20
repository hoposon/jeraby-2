import functions from 'firebase-functions';
import express from 'express';
import cors, {CorsOptions} from 'cors';
import bodyParser from 'body-parser';

const appi = express();
appi.use(bodyParser.json());

const whitelist = ['https://michaelahouf.cz', 'https://jeraby-84a7e.web.app']
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error|null, origin?: boolean | string | RegExp | (boolean | string | RegExp)[]) => void) {
    if (whitelist.indexOf(origin || '') !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

appi.use(cors(corsOptions))

import {verifyRecaptcha} from './src/middlewares/verifyRecaptcha.js';
import {sendEmail} from './src/route-handlers/send-email.js';


// appi.get('/', (req: Request, res: Response) => {
//   const name = process.env.NAME || 'World';
//   res.send(`Hello ${name}!`);
// });

appi.options('/send-email');
appi.post('/send-email', verifyRecaptcha, sendEmail);

// const port = 5001;

// appi.listen(port, () => {
//   console.log(`helloworld: listening on port ${port}`);
// });

export const app = functions.https.onRequest(appi);
