import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.connection";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../utils/cloudinary.js";

export const sendMessage = asyncHandler(async (req, res) => {
  //Extract senderId from middleware
  const senderId = req.user._id;

  //Extract text and image from request body
  const { text, image } = req.body;

  //Get receiver id from request parameters
  const { id: receiverId } = req.params;

  let imageUrl;
  if (image) {
    //Upload image on cloudinary
    const response = await cloudinary.uploader.upload(image);
    imageUrl = response.secure_url;
  }

  //Create a message
  const message = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  //Save the message
  await message.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", message);
  }
  return res.status(201).json(message);
});
