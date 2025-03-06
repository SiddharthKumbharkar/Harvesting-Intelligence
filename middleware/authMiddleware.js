// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Middleware to verify JWT token
// const authenticateUser = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Access Denied' });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified; // Attach user data to request object
//         next();
//     } catch (error) {
//         res.status(400).json({ error: 'Invalid Token' });
//     }
// };

// module.exports = { authenticateUser };
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        console.log("No token provided.");
        return res.status(401).json({ error: 'Access Denied' });
    }

    try {
        const tokenValue = token.split(" ")[1]; // Remove 'Bearer'
        console.log("Received Token:", tokenValue);
        
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log("Decoded Token:", verified);
        
        req.user = verified;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = { authenticateUser };
