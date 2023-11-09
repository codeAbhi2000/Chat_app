const app = require("./app");
require("dotenv").config();
const { Server } = require("socket.io");

const http = require("http");
const User = require("./models/user");
const FriendRequests = require("./models/friendRequest");
const Chating = require('./models/chatting')

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
    
    User.updateSocketIdAndStatus(user_id, socket_id, 1,(err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  //socket event listeners

  socket.on("friend_request", async (data) => {
    console.log(data);

    await User.findById(data.to, (err, res) => {
      // console.log(res);
      if (err) {
        console.log(err);
      }
      console.log(res);
      const to_user = res[0];
      io.to(to_user?.socket_id).emit("new_friend_request", {
        message: "New Friend request is recieved",
      });
    });
    await User.findById(data.from, (err, res) => {
      // console.log(res);
      if (err) {
        console.log(err);
      }
      console.log(res);
      const from_user = res[0];
      io.to(from_user?.socket_id).emit("request_sent", {
        message: "Request sent successfully",
      });
    });

    await FriendRequests.create(data.from, data.to, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  });

  socket.on("accept_request", (data) => {
    console.log(data);

    FriendRequests.findById(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      const request_doc = result[0];
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
          }
          console.log(result);
        }
      );
    });

    FriendRequests.findById(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      const request_doc = result[0];

      User.findById(request_doc.sender, (err, result) => {
        if (err) {
          console.log(err);
        }
        io.to(result[0]?.socket_id).emit("request_accepted", {
          message: "Friend Request Accepted",
        });
      });
      User.findById(request_doc.recipient, (err, result) => {
        if (err) {
          console.log(err);
        }
        io.to(result[0]?.socket_id).emit("request_accepted", {
          message: "Friend Request Accepted",
        });
      });
    });
    FriendRequests.deleteRequest(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  });

  socket.on("get_direct_conversations",({user_id},callback)=>{
      console.log(user_id);
      Chating.getChatParticipants(user_id,(err,result)=>{
        if(err){
          console.log(err);
        }
        // console.log(result);
        callback(null,result)
      })
  })

  socket.on("start_conversation",(data)=>{
    console.log(data);
    Chating.checkForExistingChat(data.from,data.to,(err,result)=>{
      console.log(result);
      if(err){
        console.log(err);
      }
      else if (result[0]?.chat_id === null){
          Chating.createChat(data.to,data.from,(err,{chat_id,user2Details})=>{
            if(err){
              console.log(err);
            }
            console.log(chat_id);
            socket.emit("start_chat",{...user2Details,chat_id})
          })
      }
      else{
        socket.emit("start_chat",result)
      }
    })
  })

  socket.on("get_messages",({user_id,chat_id},callback)=>{
    console.log(user_id,chat_id);
    Chating.getConversation(user_id,chat_id,(err,result)=>{
      if(err){
        console.log(err);
      }
      // console.log(result);
      callback(null,result)
    })
  })

  socket.on("text_message" ,(data)=>{
    console.log(data);

    const {to,from,chat_id,type,message} = data;

    Chating.sendMessage(chat_id,from,to,type,message,(err,result)=>{
      if(err){
        console.log(err);
      }
      User.findById(from, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result[0].socket_id);
        io.to(result[0]?.socket_id).emit("new_message", {
         data,
          message: "New Message",
        });
      });
      User.findById(to, (err, result) => {
        if (err) {
          console.log(err);
        }
        io.to(result[0]?.socket_id).emit("new_message", {
          data,
          message: "New message",
        });
      });
    })
  })

  socket.on("end", ({user_id}) => {
    console.log(user_id);
    if(user_id){
      User.updateStatus(user_id,0,(err,result)=>{
        if(err){
          console.log(err);
        }
        console.log(result);
      })
    }
    console.log("Closing connection");
    socket.disconnect(0);
  });
});
