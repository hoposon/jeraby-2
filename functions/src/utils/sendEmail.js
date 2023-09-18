// import { createApi } from './axiosAPI'
import Mailjet from 'node-mailjet';
// const api = createApi({
//   // btoa('0f5e3718599c60c28e56826f9c8bdb88:6abac0a099a72a172bb1c8ef75f036a8')
//   authorization: `Basic ${process.env.RECAPTCHA_SECRET_KEY}`,
// });
// const api = createApi({});
const send = async (email) => {
    const tempEmail = {
        from: "lukas.creane@gmail.com",
        subject: "test email",
        message: "Test of email message"
    };
    if (tempEmail && tempEmail.subject && tempEmail.message && tempEmail.from) {
        console.log('🚀 ~ file: sendEmail.ts:80 ~ send ~ tempEmail:', tempEmail);
        try {
            const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC || '', process.env.MJ_APIKEY_PRIVATE || '');
            console.log('🚀 ~ file: sendEmail.ts:83 ~ send ~ process.env.MJ_APIKEY_PUBLIC:', process.env.MJ_APIKEY_PUBLIC);
            console.log('🚀 ~ file: sendEmail.ts:84 ~ send ~ process.env.MJ_APIKEY_PRIVATE:', process.env.MJ_APIKEY_PRIVATE);
            const response = await mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                "Messages": [
                    {
                        "From": {
                            "Email": tempEmail.from,
                            "Name": "Lukas"
                        },
                        "To": [
                            {
                                "Email": "hoposon@gmail.com",
                                "Name": "Lukas"
                            }
                        ],
                        "Subject": tempEmail.subject,
                        "TextPart": "My first Mailjet email",
                        "HTMLPart": tempEmail.message,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            });
            console.log('🚀 ~ file: sendEmail.ts:110 ~ send ~ response:', response.body);
        }
        catch (e) {
            console.log("send email exteption >>", e);
        }
    }
    // const message: EmailMessage = {
    //   'From': {
    //     'Email': 'houf.crane@gmail.com',
    //     'Name': 'Lukas',
    //   },
    //   'To': [
    //     {
    //       'Email': 'houf.crane@gmail.com',
    //       'Name': 'Lukas',
    //     },
    //   ],
    //   'Subject': email.subject,
    //   'HTMLPart': email.message,
    // };
    // api.post('https://api.mailjet.com/v3.1/send', {
    //   'Messages': [message],
    // });
    // console.log(message);
};
export { send, };
