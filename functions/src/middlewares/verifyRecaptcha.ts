import axios from 'axios';
import {Request, Response, NextFunction} from 'express';

interface CaptchaResponse {
  "success": true|false,
  "challenge_ts": string,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
  "error-codes": [string]        // optional
}

const verifyRecaptcha = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  // test - always valid recaptcha
  // const secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
  if (!req.body || !req.body.token) {
    res.status(400).json({'status': 'ERROR', 'error': "Missing recaptcha response token"})
  }
  const token = req.body.token;
  const url = `https://www.google.com/recaptcha/api/siteverify`;

  try {
    const captchaParams = {
      params: {
        secret: secretKey,
        response: token
      }
    }
    const response: CaptchaResponse = (await axios.post(url, {}, captchaParams)).data
    
    if (response.success) {
      next()
    } else {
      res.status(401).json({'status': 'ERROR', 'error': "reCaptcha not passed"});
    }
  } catch (error) {
    res.status(500).json({'status': 'ERROR', 'error': (error as Error).message}); // Send only the error message for clarity
  }
};

export {
  verifyRecaptcha,
};
