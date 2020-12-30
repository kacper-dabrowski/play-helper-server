import { MiddlewareFn } from "../middleware/Middleware";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
export const postAddUser: MiddlewareFn = async (req, res, next) => {
  const { username, fullName, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, fullName });

    await user.save();

    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser: MiddlewareFn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User was not found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials were passed");
    }
    if (!process.env.JWT_KEY) {
      throw new Error(
        "Could not save user because JWT_KEY is missing in environment variables"
      );
    }
    const token = jwt.sign(
      {
        username,
        fullName: user.fullName,
        isAdmin: Boolean(user.isAdmin),
      },
      process.env.JWT_KEY,
      { expiresIn: config.EXPIRES_IN }
    );
    return res
      .status(200)
      .send({
        token,
        userId: user._id,
        expiresIn: config.EXPIRES_IN,
        fullName: user.fullName,
      });
  } catch (error) {
    res
      .status(401)
      .send({ message: "Could not authenticate", details: error.message });
  }
};
