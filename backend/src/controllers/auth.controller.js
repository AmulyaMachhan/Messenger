import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  // Get required fields from request body
  // validate required fields
  // get email from user model
  // validate if email exists or not
  // hash password
  // create a user database
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
  } catch (error) {
    console.error("Error in signup controller" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async((req, res) => {});

export const updateProfile = async((req, res) => {});

export const checkAuth = async((req, res) => {});
