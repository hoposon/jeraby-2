import nodemailer from 'nodemailer';

export interface SendMailError {
  status: 'ERROR',
  errorCode: 'MISING_EMAIL_FIELDS',
  errorMessage: string
}
interface EmailDataItem {
  value: string, 
  isValid: boolean
}
export interface EmailData {
  'id-name': EmailDataItem,
  'id-surname': EmailDataItem,
  'id-email': EmailDataItem,
  'id-phone': EmailDataItem,
  'id-message': EmailDataItem,
  'subject': EmailDataItem
}
interface MailOptions {
  from: string,
  to: string,
  subject: string,
  text: string
}

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "postmaster@sandbox233f364ae9ff4877a2eb5132bb86a113.mailgun.org",
    pass: process.env.MAILGUN_PASSWORD,
  },
});

const wrapedSendMail = (mailOptions: MailOptions) => {
  return new Promise((resolve,reject)=>{
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "postmaster@sandbox233f364ae9ff4877a2eb5132bb86a113.mailgun.org",
        pass: process.env.MAILGUN_PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error); // or use rejcet(false) but then you will have to handle errors
      } else {
        resolve(true);
      }
    });
  })
 }

const send = async (emailData: EmailData): Promise<void> => {
  
  try {
    if (emailData && emailData['id-name'] && emailData['id-surname'] && emailData['id-email'] && emailData['id-phone'] && emailData['id-message'] && emailData['subject']) {

      const mailOptions = {
        from: emailData['id-email'].value,
        to: 'hoposon@gmail.com',
        subject: emailData['subject'].value,
        text: `
          first name: ${emailData['id-name'].value}
          last name: ${emailData['id-surname'].value}
          email: ${emailData['id-email'].value}
          phone: ${emailData['id-phone'].value}
          subject: ${emailData['subject'].value}
          message: ${emailData['id-message'].value}
        `
      }

      try {
        await wrapedSendMail(mailOptions)
      } catch (e) {
        throw e
      }
      
    } else {
      throw {'status': 'ERROR', 'error': 'Missing email fields', 'errorCode': 'MISING_EMAIL_FIELDS'}
    }

  } catch(e) {
    throw e
  }
};

export {
  send,
};


