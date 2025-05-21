require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
    try {
        // Validate input
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        // OptLess API request configuration
        const options = {
            method: 'POST',
            headers: {
                clientId: process.env.OTPLESS_CLIENT_ID,
                clientSecret: process.env.OTPLESS_SECERT_ID,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        };

        // Make API request
        const response = await fetch('https://user-auth.otpless.app/auth/v1/validate/token', options);
        const data = await response.json();

        // Check response status
        if (data.status !== 'SUCCESS') {
            return res.status(401).json({ 
                error: 'Invalid token',
                details: data.message || 'Token validation failed'
            });
        }

        // Store validated data and proceed
        req.otplessData = data;
        next();

    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(500).json({ 
            error: 'Token verification failed',
            message: error.message
        });
    }
};

module.exports.generateTocken = async (req, res, next) => {
    try {
        const {sessionInfo} = req.body;     
        let sessionToken = sessionInfo.sessionToken;
        const data = req.otplessData;
        let userId = data.identities[0].identityValue;
        console.log(sessionToken);
 
        const options = {
            method: 'POST',
            headers: {
              clientId: process.env.OTPLESS_CLIENT_ID,
              clientSecret: process.env.OTPLESS_SECERT_ID,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({sessionToken : sessionToken})
          };
        
        const response = await fetch('https://user-auth.otpless.app/v1/sessions/get-session-details', options)
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.sessionId) {
            console.log("sucess");

            // gnerate JWT 
            const jwtSign = jwt.sign(
                {   userId: userId,
                    sessionToken: sessionToken
                },
                process.env.JWT_SECRET,
                {expiresIn: '7d'}
            )
            res.cookie('JWTSessionToken', jwtSign, {
                httpOnly: true, 
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                path: '/' 
            });
        }

        next();
    } catch (error) {
        // Clear any partially set cookie
        res.clearCookie('JWTSessionToken');
        res.status(500).json({ error: 'Token generation failed' })
        next(error);
    }
}

module.exports.validateUser = async (req, res, next) => {
    try {
        const token = req.cookies.JWTSessionToken;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoadedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoadedToken;
        next();
    } catch (error) {
        console.error('User validation error:', error);
        return res.status(500).json({ error: 'User validation failed' });
    }
}


module.exports.validateOwner =  async (req, res, next) => {
    try {
        const token = req.cookies.JWTSessionToken;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decoadedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoadedToken;       
        next();
    } catch (error) {
        console.error('User validation error:', error);
        return res.status(500).json({ error: 'User validation failed' });
    }
}
