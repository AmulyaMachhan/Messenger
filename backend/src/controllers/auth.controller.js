import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = asyncHandler(async (req, res) => {
  // Get required fields from request body
  // validate required fields
  // get email from user model
  // validate if email exists or not
  // hash password
  // create a user database
  // generate token
  // save the user
  // send the response

  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6 or more characters long" });
    }
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Already existing email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    generateToken(newUser._id, res);
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller" + error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const login = asyncHandler(async (req, res) => {
  //Extract fields from request body
  const { email, password } = req.body;

  //Validate fields
  if (email === "" || password === "") {
    return res.status(400).json({ message: "Email and password required" });
  }

  //Find if there is an existing user
  const existingUser = await User.findOne({ email });

  //Throw error if not
  if (!existingUser) {
    return res.status(404).json({ message: "User not registered" });
  }

  //Validate if the password is correct
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  //Throw if incorrect password
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Password Invalid" });
  }

  //Create Token
  generateToken(existingUser._id, res);

  // Return response
  return res.status(200).json({
    _id: existingUser._id,
    email: existingUser.email,
    fullName: existingUser.fullName,
    profilePic: existingUser.profilePic,
  });
});

export const logout = asyncHandler(async (req, res) => {
  //Set jwt cookies age to 0;
  res.cookie("jwt", "", { maxAge: 0 });

  res.status(200).json({ message: "User successfully logged out" });
});

export const updateProfile = asyncHandler(async (req, res) => {
  //Extract picture file from request body
  const { picture } = req.body;

  //Validate if the picture exists
  if (!picture) {
    return res.status(404).json({ message: "Profile picture is required" });
  }

  //Get userId from the req
  const userId = req.user._id;

  //Upload on cloudinary and get a response
  const response = await cloudinary.uploader.upload(picture);
  if (!response) {
    return res
      .status(401)
      .json({ message: "Error uploading profile picture on cloudinary" });
  }

  //Save the response on the user database
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profilePic: response.secure_url,
    },
    {
      new: true,
    }
  ).select("-passoword");
  if (!updatedUser) {
    return res
      .status(401)
      .json({ message: "Error saving profile picture on database" });
  }

  //Return an appropriate response
  return res.status(201).json(updatedUser);
});

export const checkAuth = asyncHandler(async (req, res) => {
  return res.status(201).json(req.user);
});
