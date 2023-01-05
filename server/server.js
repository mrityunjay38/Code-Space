const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

/* Start-Enable cors + set static frontend */
app.use(cors());
app.use(express.static(path.join(__dirname, "../app/build")));
/* End-Enable cors + set static frontend */

app.get("/", (req, res) => {
  res.sendFile(__dirname, "../app/build" + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (data) => {
    console.log(data);
    socket.emit("message", { message: "Hello" });
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
