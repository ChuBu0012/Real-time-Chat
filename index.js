const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat_message", (value) => {
    console.log("msg : " + value);
    // ที่นี่ควรใช้ io.emit() เพื่อส่งข้อมูลไปยังทุกคนที่เชื่อมต่อ
    io.emit("chat_message", value);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
