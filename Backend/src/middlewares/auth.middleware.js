const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const apiError = require("../utils/apiError");


async function authMiddleware(req, res,next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await userModel.findById(decoded.id).select("-password");
req.user=user;
  next()

    }catch(error) {
            next(new apiError(401, "Unauthorized", error.message));
    }
}

module.exports = authMiddleware

// this middel ware only cheacks and did not console any thing like user it fetch the user an did not return 