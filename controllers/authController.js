const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPass,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
      });
    }

    const isCorrect = bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "wrong password or username",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
    });
  }
};
