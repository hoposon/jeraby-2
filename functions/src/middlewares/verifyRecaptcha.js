import axios from 'axios';
const verifyRecaptcha = async (req, res, next) => {
    // console.log('🚀 ~ file: verifyRecaptcha.ts:12 ~ verifyRecaptcha ~ req:', req)
    console.log('🚀 ~ file: verifyRecaptcha.ts:21 ~ verifyRecaptcha ~ verifyRecaptcha:', req.body);
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // test - always valid recaptcha
    // const secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
    console.log('🚀 ~ file: verifyRecaptcha.ts:14 ~ verifyRecaptcha ~ secretKey:', secretKey);
    const token = req.body.token;
    console.log('🚀 ~ file: verifyRecaptcha.ts:18 ~ verifyRecaptcha ~ token:', token);
    const url = `https://www.google.com/recaptcha/api/siteverify`;
    try {
        const captchaParams = {
            params: {
                secret: secretKey,
                response: token
            }
        };
        console.log('🚀 ~ file: verifyRecaptcha.ts:25 ~ verifyRecaptcha ~ captchaParams:', captchaParams);
        const response = (await axios.post(url, {}, captchaParams)).data;
        console.log('🚀 ~ file: verifyRecaptcha.ts:22 ~ verifyRecaptcha ~ response:', response);
        // res.status(200).json({'re sec key >>>>>>': secretKey?.substring(0,4)})
        // const response = await axios.post(url);
        // const googleResponse = response.data;
        if (response.success) {
            console.log('🚀 ~ file: verifyRecaptcha.ts:31 ~ verifyRecaptcha ~ next:');
            next();
        }
        else {
            res.status(401).json({ 'status': 'ERROR', 'error': "Invalid recaptcha" });
        }
        // Call the next middleware or route handler
        // You can use the google_response if required, e.g., to add custom verification checks.
        // res.json({ google_response });
    }
    catch (error) {
        console.log('🚀 ~ file: verifyRecaptcha.ts:36 ~ verifyRecaptcha ~ error:', error);
        res.status(401).json({ 'status': 'ERROR', 'error': error.message }); // Send only the error message for clarity
    }
};
export { verifyRecaptcha, };
