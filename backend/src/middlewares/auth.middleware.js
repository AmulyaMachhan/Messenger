import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  //Extract token from cookies using request
  //Verify if that token is of a user
  //Extract user data from the verified jwt
  //Find if that user exists
  //Verify that user
  //Embed that user in req
  //Use next flag for middleware

  let token = req.cookies?.jwt;

  if (!token) {
    return res.status(400).json({ message: "Unauthorized Access" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
});
