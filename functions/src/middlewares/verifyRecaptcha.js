const verifyRecaptcha = async (req, res, next) => {
    console.log('🚀 ~ file: verifyRecaptcha.ts:21 ~ verifyRecaptcha ~ verifyRecaptcha:');
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // const token = req.body.token;
    // const url = `https://www.google.com/recaptcha/api/siteverify`;
    try {
        // await axios.post(url, {
        //   secret: secretKey,
        //   response: token
        // });
        console.log('re sec key >>>>>>', secretKey?.substring(0, 4));
        // const response = await axios.post(url);
        // const googleResponse = response.data;
        next(); // Call the next middleware or route handler
        // You can use the google_response if required, e.g., to add custom verification checks.
        // res.json({ google_response });
    }
    catch (error) {
        res.status(401).json({ error: error.message }); // Send only the error message for clarity
    }
};
export { verifyRecaptcha, };
