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

    const User = await userModel.create({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(201).json({
      message: "User created successfully",
      User,
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
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
    },
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


module.exports = { registerController,loginController,logoutController};