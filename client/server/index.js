
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.224:5173",
    methods: ["GET", "POST"],
  },
});
// let seats = [
//   '', 'a2', 'a3', 'a4',
//   'b1', 'b2', 'b3', 'b4',
//   'c1', 'c2', 'c3', 'c4',
//   'd1', 'd2', 'd3', 'd4',
//   'e1', 'd2', 'd3', 'd4',
//   'f1','d2', 'd3', 'd4',
// ];
// let bookedSeats = [];

io.on('connection', (socket) => {
console.log(socket);

});
app.get('/',(data) => {
    log
})
server.listen(3003, () => {
  console.log("SERVER IS MOVIE TICKET RUNNING");
});