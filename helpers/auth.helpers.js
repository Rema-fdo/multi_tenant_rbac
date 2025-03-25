const jwt = require("jsonwebtoken");

const generateToken = (signingSecret, payload, expiresAfter) => {
    return jwt.sign(
      payload,
      signingSecret,
      { expiresIn: expiresAfter }
    );
};

const decodeToken = (token, signingSecret) =>{
    jwt.verify(token, signingSecret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            console.error('Error: JWT has expired at', err.expiredAt);
          } else if (err.name === 'JsonWebTokenError') {
            console.error('Error: Invalid JWT', err.message);
          } else if (err.name === 'NotBeforeError') {
            console.error('Error: JWT not active yet', err.date);
          } else {
            console.error('Error: JWT verification failed', err);
          }
        } else {
            console.log('JWT verified successfully:', decoded);
            return decoded
          }
        });
    };