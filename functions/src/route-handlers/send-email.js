// // const axios = require('axios').default;
// const { sendEmail: send} = require('../utils/sendEmail')
import { send as sendEmailUtil } from '../utils/sendEmail.js';
// interface EmailBody {
//   subject: string;
//   message: string;
//   from: string;
//   [key: string]: any; // To allow for other potential properties without TypeScript errors.
// }
const sendEmail = async (req, res) => {
    console.log('🚀 ~ file: send-email.ts:54 ~ sendEmail ~ sendEmail:');
    console.log('🚀 ~ file: send-email.ts:36 ~ sendEmail ~ req:', req.body);
    const email = req.body.contact;
    console.log('🚀 ~ file: send-email.ts:36 ~ sendEmail ~ body:', email);
    if (email && email['id-name'] && email['id-surname'] && email['id-email'] && email['id-phone'] && email['id-message']) {
        try {
            await sendEmailUtil(email);
            console.log('🚀 ~ file: send-email.ts:41 ~ sendEmail ~ sendEmailUtil:');
            res.json({ 'status': 'OK' });
        }
        catch (e) {
            console.log('🚀 ~ file: send-email.ts:44 ~ sendEmail ~ e:', e);
            res.status(500).json({ 'status': 'ERROR', 'error': JSON.stringify(e, Object.getOwnPropertyNames(e)) });
        }
    }
    else {
        console.log('🚀 ~ file: send-email.ts:43 ~ sendEmail ~ else:');
        // res.status(401).json({error: 'Unauthorized'});
        res.status(400).json({ 'status': 'ERROR', 'error': 'Missging fields' });
    }
};
export { sendEmail, };
