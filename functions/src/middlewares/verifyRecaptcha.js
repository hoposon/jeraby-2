import axios from 'axios';
const verifyRecaptcha = async (req, res, next) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // test - always valid recaptcha
    // const secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
    if (!req.body || !req.body.token) {
        res.status(400).json({ 'status': 'ERROR', 'error': "Missing recaptcha response token" });
    }
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify`;
    try {
        const captchaParams = {
            params: {
                secret: secretKey,
                response: token
            }
        };
        const response = (await axios.post(url, {}, captchaParams)).data;
        if (response.success) {
            next();
        }
        else {
            res.status(401).json({ 'status': 'ERROR', 'error': "reCaptcha not passed" });
        }
    }
    catch (error) {
        res.status(500).json({ 'status': 'ERROR', 'error': error.message }); // Send only the error message for clarity
    }
};
export { verifyRecaptcha, };
