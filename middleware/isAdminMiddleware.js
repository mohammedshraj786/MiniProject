const jwt = require('jsonwebtoken');

const secretKey = require('../config/authConfig');

function authenticateToken(req, res, next) 
{
                   const token = req.body.token;

                  if (!token) 
                  {
                              return res.status(401).json({ message: 'No token provided' });
                 }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    });
}
function checkAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
}

module.exports = {
    authenticateToken,
    checkAdmin,
};
