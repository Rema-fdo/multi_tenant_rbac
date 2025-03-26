const jwt = require("jsonwebtoken");

const generateToken = async (signingSecret, payload, expiresAfter) => {
    return jwt.sign(
      payload,
      signingSecret,
      { expiresIn: expiresAfter }
    );
};

const decodeToken = async (token, signingSecret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, signingSecret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    reject(new Error('JWT has expired'));
                } else if (err.name === 'JsonWebTokenError') {
                    reject(new Error('Invalid JWT'));
                } else {
                    reject(err);
                }
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = {
    generateToken,
    decodeToken
};
