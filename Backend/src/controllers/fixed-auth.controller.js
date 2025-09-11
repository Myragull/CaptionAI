const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError");

// Helper function to set secure cookies with proper options for production
const setAuthCookie = (res, token, expiresIn) => {
  // For production environments (Render)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: expiresIn * 1000, // Convert to milliseconds
    path: "/",
  });
};

async function registerController(req, res, next) {
  try {
    const { firstname, lastname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      email,
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // Token expiration time in seconds (1 day)
    const expiresIn = 60 * 60 * 24;

    // Create JWT with expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    // Set secure cookie
    setAuthCookie(res, token, expiresIn);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    next(new apiError(500, "Internal server error", error.message));
  }
}

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new apiError(401, "Invalid credentials"));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new apiError(401, "Invalid credentials"));
    }

    // Token expiration time in seconds (1 day)
    const expiresIn = 60 * 60 * 24;

    // Create JWT with expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    // Set secure cookie
    setAuthCookie(res, token, expiresIn);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    next(new apiError(500, "Internal server error", error.message));
  }
}

async function logoutController(req, res, next) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(new apiError(500, "Internal server error", error.message));
  }
}

async function sessionController(req, res, next) {
  try {
    res.status(200).json({
      user: {
        id: req.user._id,
        email: req.user.email,
      },
    });
  } catch (error) {
    next(new apiError(401, "Unauthorized", error.message));
  }
}

async function meController(req, res, next) {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return next(new apiError(404, "User not found"));
    }

    res.status(200).json({
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    next(new apiError(500, "Internal server error", error.message));
  }
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  sessionController,
  meController,
};
