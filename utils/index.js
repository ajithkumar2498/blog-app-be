import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"

dotenv.config()

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const decodeToken = async (token) => {
  return await jwt.decode(token);
};

export const createJWT = ( userId, email ) => {
    const token = jwt.sign({userId, email}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });


  return token;
};

export const setTokenCookie = (res, token) => {
  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", //prevent CSRF attack
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });

};
