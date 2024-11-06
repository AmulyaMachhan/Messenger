import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.router();

router.route("/send-message").post(authenticate, sendMessage);
router.route("/get-messages").post(authenticate, getMessages);
router.route("/users").post(authenticate, getUsersForSidebar);
export default router;
