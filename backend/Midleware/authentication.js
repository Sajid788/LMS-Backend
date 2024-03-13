const { JWT_SECRET } = require('../Model/User');
const jwt = require('jsonwebtoken');

const authorization = (allowedRoles) => (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: 'Login first' });
    }

    const token = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Please login first' });
        }

        if (!allowedRoles.includes(decoded.userRole)) {
            return res.status(403).json({ msg: 'Unauthorized!' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = authorization;
