import { User } from "../../models/User";
import config from "../../config";
import jwt from "jsonwebtoken";

const signUser = (user: User) => {
  if (!process.env.JWT_KEY) {
    throw new Error("There was some error with JWT");
  }

  const { userId, fullName } = user;

  const token = jwt.sign(
    { userId, fullName, expiresIn: config.EXPIRES_IN },
    process.env.JWT_KEY,
    { expiresIn: config.EXPIRES_IN }
  );

  return token;
};

export default signUser;
