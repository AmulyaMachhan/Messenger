import http from "http";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (client) => {
  console.log(client);
});

export { io, app, dotenv };
