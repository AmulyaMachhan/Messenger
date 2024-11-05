import http from "http";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Object to map userId to SocketId
const userToSocketId = {};

//Function to get receiver socket Id through the receiver's user Id
export const getReceiverSocketId = function (userId) {
  return userToSocketId[userId];
};

//On client connection on the server
io.on("connection", (socket) => {
  console.log("A user has connected " + socket.id);

  //Get userID fro the handshake query parameters from the frontend
  const userId = socket.handshake.query.userId;
  //Map that userId to the socketId
  if (userId) userToSocketId[userId] = socket.id;

  //Emit the online users to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userToSocketId));

  //Listen to when a client listens to disconnect event event
  socket.on("disconnect", () => {
    console.log("A user has disconnected " + socket.id);
    //Delete the use
    delete userToSocketId[userId];
    io.emit("getOnlineUsers", Object.keys(userToSocketId));
  });
});

export { io, app, server };
