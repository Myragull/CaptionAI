const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");

async function registerController(req, res, next) {
  try {
    const { firstname, lastname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      email,
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "Usernanme already exists",
      });
    }

    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
  httpOnly: true,       // secure from JS access
  sameSite: "lax",      // allow sending in cross-site requests
  secure: false,        // true if using HTTPS
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});

    res.status(201).json({
      message: "User created successfully",
      user: {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  }
    });
  } catch (error) {
    next(new apiError(500, "Internal server error", error.message));
  }
}

async function loginController(req, res,next) {
  try {
    const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
  httpOnly: true,       // secure from JS access
  sameSite: "lax",      // allow sending in cross-site requests
  secure: false,        // true if using HTTPS
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});

  res.status(200).json({
    message: "User logged in successfully",
   user: {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  }
  });
  } catch (error) {
    next (new apiError(500,"Internal server error",error.message));
  }
  
}

async function logoutController(req,res,next) {
  try {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(new apiError(500,"Internal server error",error.message) )
  }
}

async function sessionController(req, res, next) {
  try {
     res.status(200).json({ 
      user: { 
        id: req.user._id,
        email: req.user.email
       } 
      });
  } catch (error) {
    next(new apiError(401, "Unauthorized", error.message));
  }
}

async function meController(req,res,next) {
   try {
      res.status(200).json({ 
        user: {
           id: req.user._id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          email: req.user.email
        }
       });
  } catch (error) {
    next(new apiError(401, "Unauthorized", error.message));
  }
}

module.exports = { registerController, loginController, logoutController,sessionController ,meController};


