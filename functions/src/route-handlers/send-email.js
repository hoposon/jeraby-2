// // const axios = require('axios').default;
// const { sendEmail: send} = require('../utils/sendEmail')
import { send as sendEmailUtil } from '../utils/sendEmail.js';
const sendEmail = async (req, res) => {
    const body = req.body;
    if (body && body.subject && body.message) {
        try {
            await sendEmailUtil(body);
            res.json({ 'email-sent': 'OK' });
        }
        catch (e) {
            res.status(500).json({ 'error': JSON.stringify(e, Object.getOwnPropertyNames(e)) });
        }
    }
    else {
        console.log('🚀 ~ file: send-email.ts:43 ~ sendEmail ~ else:');
        // res.status(401).json({error: 'Unauthorized'});
        res.status(400).json({ error: 'Missging fields' });
    }
};
export { sendEmail, };
