const asynchancler = require("express-async-handler");
const User = require("../models/userModel");
const { use } = require("../routes/userRoutes");
const generateToken = require("../utils/generateToken");
const registerUser = asynchancler(async (req, res) => {
  const { name, email, password, pic, isAdmin } = req.body;
  const userExit = await User.findOne({ email });
  if (userExit) {
    res.send({
      message: "User Already Exist",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
    isAdmin,
  });
  if (user) {
  res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isdAdmin: user.isdAdmin,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.send({
      message: "Error Accured",
    });
  }
});
const authuser = asynchancler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isdAdmin: user.isdAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email and Password");
  }
});

const updateUserProfile = asynchancler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, authuser, updateUserProfile };
