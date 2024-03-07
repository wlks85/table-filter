const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const { SECRET_KEY } = require("../config");

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passMatch = bcrypt.compareSync(password, user.password);
      if (passMatch) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          SECRET_KEY,
          {
            expiresIn: "1d", // expires in 365 days
          }
        );
        res.send({
          success: true,
          message: "Login success!",
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          accessToken,
        });
      } else {
        res.status(400).send({
          message: "Wrong Password!",
        });
      }
    } else {
      res.status(400).send({
        message: "This email wasn't registered!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    // const { firstName, lastName, email, password } = req.body;
    // const data = {
    //   firstName: "sdats",
    //   lastName: "sdats",
    //   email: "sdats@gmail.com",
    //   password: "Pw7cmS3p",
    // };

    const { firstName, lastName, email, password } = data;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({
        message: "This email already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send({
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
      message: "New user has been saved successfully! ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.me = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    const accessToken = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1d", // expires in 365 days
      }
    );
    return res.send({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.forgotPassword = (req, res) => {};

exports.resetPassword = (req, res) => {};

exports.refreshToken = (req, res) => {};
