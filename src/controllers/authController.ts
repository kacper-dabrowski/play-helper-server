import { MiddlewareFn } from "../middleware/Middleware";
import User from "../models/User";
import bcrypt from "bcryptjs";
import config from "../config";
import signUser from "../utils/auth/signUser";
import * as errorTypes from "../utils/errors/errorTypes";
export const postAddUser: MiddlewareFn = async (req, res, next) => {
  try {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
      throw new Error(errorTypes.CREDENTIALS_INVALID);
    }

    const isExistingUser = await User.findOne({ username });

    if (isExistingUser) {
      throw new Error(errorTypes.USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, fullName });
    const savedUser = await user.save();
    const token = signUser(savedUser);

    return res.status(201).send({
      message: "User created successfully",
      token,
      userId: savedUser._id,
      expiresIn: config.EXPIRES_IN,
    });
  } catch (error) {
    next(error.message);
  }
};

export const loginUser: MiddlewareFn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(errorTypes.CREDENTIALS_INVALID);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error(errorTypes.CREDENTIALS_INVALID);
    }

    const token = signUser(user);

    return res.status(200).send({
      token,
      userId: user._id,
      fullName: user.fullName,
      expiresIn: config.EXPIRES_IN,
    });
  } catch (error) {
    next(error.message);
  }
};
