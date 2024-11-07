import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/update-profile").post(authenticate, updateProfile);

router.route("/check-auth").get(authenticate, checkAuth);

export default router;
