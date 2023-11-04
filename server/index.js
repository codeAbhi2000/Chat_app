const app = require("./app");
require("dotenv").config();
const { Server } = require("socket.io");

const http = require("http");
const User = require("./models/user");
const FriendRequests = require("./models/friendRequest");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`App listening on ${port}`);
});

io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];

  const socket_id = socket.id;

  console.log(`User connected ${socket_id}`);

  if (Boolean(user_id)) {
    User.updateSocketId(user_id, socket_id, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  //socket event listeners

  socket.on("friend_request", async (data) => {
    console.log(data);
    const to_user = null;
    const from_user = null;

    User.findById(data.to, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
      to_user = res.socket_id;
    });
    User.findById(data.to, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
      from_user = res.socket_id;
    });

    FriendRequests.create(data.from, data.to, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });

    io.to(to_user.socket_id).emit("new_friend_request", {
      message: "New Friend request is recieved",
    });

    io.to(from_user.socket_id).emit("request_sent", {
      message: "Request sent successfully",
    });
  });

  socket.on("accept_request", (data) => {
    console.log(data);

    const request_doc = null;
    FriendRequests.findById(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      request_doc = result;
    });
    User.updateFriendList(
      request_doc.sender.toString(),
      request_doc.recipient,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      }
    );
    User.updateFriendList(
      request_doc.recipient.toString(),
      request_doc.sender,
      (err, result) => {
        if (err) {
          console.log(err);
          console.log(result);
        }
      }
    );

    FriendRequests.deleteRequest(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });

    User.findById(request_doc.sender, (err, result) => {
      if (err) {
        console.log(err);
      }
      io.to(result.socket_id).emit("request_accepted", {
        message: "Friend Request Accepted",
      });
    });
    User.findById(request_doc.recipient, (err, result) => {
      if (err) {
        console.log(err);
      }
      io.to(result.socket_id).emit("request_accepted", {
        message: "Friend Request Accepted",
      });
    });
  });

  socket.on("end", () => {
    console.log("Closing connection");
    socket.disconnect(0);
  });
});
