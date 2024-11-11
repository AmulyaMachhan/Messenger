import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/users").get(authenticate, getUsersForSidebar);
router.route("/get/:id").get(authenticate, getMessages);
router.route("/send/:id").post(authenticate, sendMessage);

export default router;
