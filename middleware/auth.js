const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
         if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });}
      
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' });
    }
    
     req.user = user;
    next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}