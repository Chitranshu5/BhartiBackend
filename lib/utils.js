import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "365d",
  });

res.cookie("jwt", token, {
  httpOnly: true,
  secure: true,        // REQUIRED on Railway (HTTPS)
  sameSite: "none",    // REQUIRED for Netlify → Railway
  maxAge: 365 * 24 * 60 * 60 * 1000,
});


  return token;
};
