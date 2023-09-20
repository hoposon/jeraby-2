import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
        user: "postmaster@sandbox233f364ae9ff4877a2eb5132bb86a113.mailgun.org",
        pass: process.env.MAILGUN_PASSWORD,
    },
});
const wrapedSendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailgun.org",
            port: 587,
            secure: false,
            auth: {
                user: "postmaster@sandbox233f364ae9ff4877a2eb5132bb86a113.mailgun.org",
                pass: process.env.MAILGUN_PASSWORD,
            },
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error); // or use rejcet(false) but then you will have to handle errors
            }
            else {
                resolve(true);
            }
        });
    });
};
const send = async (emailData) => {
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
            };
            try {
                await wrapedSendMail(mailOptions);
            }
            catch (e) {
                throw e;
            }
        }
        else {
            throw { 'status': 'ERROR', 'error': 'Missing email fields', 'errorCode': 'MISING_EMAIL_FIELDS' };
        }
    }
    catch (e) {
        throw e;
    }
};
export { send, };
