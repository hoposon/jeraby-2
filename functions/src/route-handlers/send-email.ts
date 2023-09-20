import {Request, Response} from 'express';
import { EmailData, SendMailError } from '../utils/sendEmail.js';
import {send as sendEmailUtil} from '../utils/sendEmail.js';

const sendEmail = async (req: Request, res: Response): Promise<void> => {
  if (!req.body || !req.body.contact) {
    res.status(400).json({'status': 'ERROR', 'error': "Missing contact"})
  }
  const emailData = req.body.contact as EmailData;
  console.log('🚀 ~ file: send-email.ts:36 ~ sendEmail ~ body:', emailData)
  
  try {
    await sendEmailUtil(emailData);
    console.log('🚀 ~ file: send-email.ts:41 ~ sendEmail ~ sendEmailUtil:')
    res.json({'status': 'OK'});
  } catch (e) {
    if ((e as SendMailError).status === 'ERROR' && (e as SendMailError).errorCode === 'MISING_EMAIL_FIELDS') {
      res.status(400).json({'status': 'ERROR', 'error': 'Missging email fields'});
    } else {
      console.log('🚀 ~ file: send-email.ts:44 ~ sendEmail ~ e:', e)
      res.status(500).json({'status': 'ERROR', 'error': (e as Error).message});
    }    
  }
};

export {
  sendEmail,
};
