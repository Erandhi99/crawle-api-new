import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json("Email already exists");
    // }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      enrolledCourses: req.body.enrolledCourses
    });

    await newUser.save();
    res.status(200).json("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Incorrect password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isTeacher: user.isTeacher },
      process.env.JWT
    );

    const { password, isAdmin, isTeacher,...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails, isAdmin, isTeacher });
  } catch (err) {
    next(err);
  }
};
