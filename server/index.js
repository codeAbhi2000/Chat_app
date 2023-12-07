const app = require("./app");
require("dotenv").config();
const { Server } = require("socket.io");
const AWS = require("aws-sdk");
const http = require("http");
const User = require("./models/user");
const FriendRequests = require("./models/friendRequest");
const Chating = require("./models/chatting");
const Groups = require("./models/groupChating");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://pingpluse.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  // console.log(socket.rooms);
  const user_id = socket.handshake.query["user_id"];

  const socket_id = socket.id;

  console.log(`User connected ${socket_id}`);

  if (Boolean(user_id)) {
    User.updateSocketIdAndStatus(user_id, socket_id, 1, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  //socket event listeners

  socket.on("friend_request", async (data) => {
    // console.log(data);

    await User.findById(data.to, (err, res) => {
      // console.log(res);
      if (err) {
        console.log(err);
      }
      // console.log(res);
      const to_user = res[0];
      io.to(to_user.socket_id).emit("new_friend_request", {
        message: "New Friend request is recieved",
      });
    });
    await User.findById(data.from, (err, res) => {
      // console.log(res);
      if (err) {
        console.log(err);
      }
      // console.log(res);
      const from_user = res[0];
      io.to(from_user.socket_id).emit("request_sent", {
        message: "Request sent successfully",
      });
    });

    await FriendRequests.create(data.from, data.to, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
    });
  });

  socket.on("accept_request", (data) => {
    console.log(data);

    FriendRequests.findById(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      const request_doc = result[0];
      User.updateFriendList(
        request_doc.sender.toString(),
        request_doc.recipient,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result);
        }
      );
      User.updateFriendList(
        request_doc.recipient.toString(),
        request_doc.sender,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result);
        }
      );
    });

    FriendRequests.findById(data.request_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
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

  socket.on("get_direct_conversations", ({ user_id }, callback) => {
    // console.log(user_id);
    Chating.getChatParticipants(user_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      callback(null, result);
    });
  });

  socket.on("start_conversation", (data) => {
    // console.log(data);
    Chating.checkForExistingChat(data.from, data.to, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else if (result[0].chat_id === null) {
        Chating.createChat(
          data.to,
          data.from,
          (err, { chat_id, user2Details }) => {
            if (err) {
              console.log(err);
            }
            // console.log(chat_id);
            socket.emit("start_chat", { ...user2Details, chat_id });
          }
        );
      } else {
        socket.emit("start_chat", result);
      }
    });
  });

  socket.on("get_messages", ({ user_id, chat_id }, callback) => {
    // console.log(user_id, chat_id);
    Chating.getConversation(user_id, chat_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      callback(null, result);
    });
  });

  socket.on("text_message", (data) => {
    // console.log(data);

    const { to, from, chat_id, type, message } = data;

    Chating.sendMessage(chat_id, from, to, type, message, (err, result) => {
      if (err) {
        console.log(err);
      }
      User.findById(from, (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log(result[0].socket_id);
        io.to(result[0]?.socket_id).emit("new_message", {
          data: { ...data, imageUrl: null, docUrl: null },
          message: "Message sent",
        });
      });
      User.findById(to, (err, result) => {
        if (err) {
          console.log(err);
        }
        io.to(result[0]?.socket_id).emit("new_message", {
          data: { ...data, imageUrl: null, docUrl: null },
          message: "New message",
        });
      });
    });
  });

  socket.on("media_messages", async (data) => {
    // console.log(data);
    // console.log(data.file);

    if (data.type === "Img") {
      // console.log("Image file");
      const fileName = `media${
        data.chat_id
      }/${new Date().getTime()}.${data.doctype?.slice(6)}`;
      const fileUrl = await uploadToS3(data.file, fileName, data.doctype);
      // console.log(fileUrl);
      Chating.sendImageMessage(
        data.chat_id,
        data.from,
        data.to,
        fileUrl,
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          User.findById(data?.from, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            // console.log(result[0].socket_id);
            io.to(result[0]?.socket_id).emit("new_message", {
              data: { ...data, imageUrl: fileUrl, message: null, docUrl: null },
              message: "Message sent",
            });
          });
          User.findById(data?.to, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            io.to(result[0]?.socket_id).emit("new_message", {
              data: { ...data, imageUrl: fileUrl, message: null, docUrl: null },
              message: "New message",
            });
          });
        }
      );
    } else {
      // console.log("Doc type");
      const fileName = `media${
        data.chat_id
      }/${new Date().getTime()}.${data.doctype?.slice(12)}`;
      const fileUrl = await uploadToS3(data.file, fileName, "application/pdf");
      // console.log(fileUrl);
      Chating.sendDocMessage(
        data.chat_id,
        data.from,
        data.to,
        fileUrl,
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          User.findById(data?.from, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            // console.log(result[0].socket_id);
            io.to(result[0]?.socket_id).emit("new_message", {
              data: { ...data, imageUrl: null, message: null, docUrl: fileUrl },
              message: "Message sent",
            });
          });
          User.findById(data?.to, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            io.to(result[0]?.socket_id).emit("new_message", {
              data: { ...data, imageUrl: null, message: null, docUrl: fileUrl },
              message: "New message",
            });
          });
        }
      );
    }
  });

  //group related events and listeners

  socket.on("create_group_room", (data) => {
    // console.log(data);
    // Create a room with the group ID
    socket.join(data.groupId);

    // Notify the user who created the group
    User.addGroupsId(data.groupId, data.user_id, (err, reuslt) => {
      if (err) {
        return console.log(err);
      }
      User.findById(data.user_id, (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log(result[0].socket_id);
        console.log("emitting the event");
        io.to(result[0].socket_id).emit("group_room_created", {
          group_id: data.groupId,
          message: "Group Created Successfully",
        });
      });
    });

    // console.log("emiting the participants");
    Groups.getParticipants(data.groupId, (err, result) => {
      if (err) {
        return console.log(err);
      }
      result?.forEach((el) => {
        if (el.user_id !== data.user_id) {
          User.addGroupsId(data.groupId, el.user_id, (err, result) => {
            if (err) {
              return console.log(err);
            }
            User.findById(el.user_id, (err, res) => {
              if (err) {
                return console.log(err);
              }
              // console.log(res);
              io.to(res[0].socket_id).emit("added_to_group", {
                message: "Your added to some group",
              });
            });
          });
        }
      });
    });
  });

  socket.on("join_to_group", async ({ user_id, group_ids }) => {
    // console.log(user_id, group_ids);
    group_ids?.forEach(async (group_id) => {
      // Check if the user is a member of the group
      // console.log(group_id);
      const isMember = await userIsMemberOfGroup(user_id, parseInt(group_id));
      if (isMember) {
        // Join the user to the group's room
        console.log("joining the group room");
        socket.join(`group:${parseInt(group_id)}`);
      }
    });
  });

  socket.on("add_participants", ({ adminId, user_ids, group_id }) => {
    Groups.addParticipant(group_id, user_ids, (err, result) => {
      if (err) {
        return console.log(err);
      }
      // console.log(result);
      User.findById(adminId, (err, result) => {
        if (err) {
          return console.log(err);
        }
        io.to(result[0].socket_id).emit("participant_added", {
          message: "participant added successfully",
        });
      });
      user_ids?.forEach((user) => {
        User.addGroupsId(group_id, user, (err, result) => {
          if (err) {
            return console.log(err);
          }
          User.findById(user, (err, result) => {
            if (err) {
              return console.log(err);
            }
            io.to(result[0].socket_id).emit("added_to_group", {
              message: "participant added successfully",
            });
          });
        });
      });
    });
  });

  socket.on("get_group_list", ({ user_id }, callback) => {
    // console.log(user_id);
    Groups.getGroupList(user_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      callback(null, result);
    });
  });

  socket.on("get_group_messages", ({ group_id }, callback) => {
    // console.log(group_id);
    Groups.getGroupMessages(group_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      callback(null, result);
    });
  });

  socket.on("group_message", (data) => {
    // console.log(data);

    const { group_id, message, from_user_id, type } = data;

    Groups.addGroupMessages(
      group_id,
      from_user_id,
      type,
      message,
      (err, result) => {
        if (err) {
          return console.log(err);
        }
        // console.log(result);
        User.findById(from_user_id, (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result[0].socket_id);
          socket.to(`group:${group_id}`).emit("new_group_message", {
            ...data,
            from_user_name: result[0].name,
          });
        });
      }
    );
  });

  socket.on("group_media_message", async (data) => {
    // console.log(data);
    if (data.type === "Img") {
      // console.log("Image file");
      const fileName = `group_media${
        data.group_id
      }/${new Date().getTime()}.${data.doctype?.slice(6)}`;
      const fileUrl = await uploadToS3(data.file, fileName, data.doctype);
      // console.log(fileUrl);
      Groups.addGroupImageMessages(data.group_id, data.from_user_id, data.type, fileUrl, (err,result)=>{
        if(err){
          console.log(err);
          return;
        }
        User.findById(data.from_user_id, (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result[0].socket_id);
          socket.to(`group:${data.group_id}`).emit("new_group_message", {
            data:{...data,from_user_name: result[0]?.name,imageUrl : fileUrl,docUrl : null},
            
          });
        });
      })
    }
    else{
      // console.log("Doc type");
      const fileName = `group_media${
        data.group_id
      }/${new Date().getTime()}.${data.doctype?.slice(12)}`;
      const fileUrl = await uploadToS3(data.file, fileName, "application/pdf");
      // console.log(fileUrl);
      Groups.addGroupDocMessages(data.group_id, data.from_user_id, data.type, fileUrl, (err,result)=>{
        if(err){
          console.log(err);
          return;
        }
        User.findById(data.from_user_id, (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result[0].socket_id);
          socket.to(`group:${data.group_id}`).emit("new_group_message", {
            data:{...data,from_user_name: result[0]?.name,imageUrl : null,docUrl : fileUrl},
          });
        });
      })
    }
  });

  socket.on("end", ({ user_id }) => {
    console.log(user_id);
    if (user_id) {
      User.updateStatus(user_id, 0, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    }
    console.log("Closing connection");
    socket.disconnect(0);
  });
});

async function userIsMemberOfGroup(user_id, group_id) {
  return new Promise((resolve, reject) => {
    Groups.getParticipants(group_id, (err, data) => {
      if (err) {
        return reject(err);
      }

      const isMember = data.some((el) => el.user_id === user_id);
      resolve(isMember);
    });
  });
}

const uploadToS3 = async (data, fileName, ftype) => {
  // console.log(data);
  const blob = new Blob([data], { type: ftype });
  const buffer = await blob.arrayBuffer();
  const bufferData = Buffer.from(buffer);

  AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: "pingplusechatapp",
    Key: fileName,
    Body: bufferData,
    ContentType: ftype,
    ACL: "public-read",
  };

  return new Promise(async (resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("S3 upload error", err);
        reject(err);
      } else {
        //   console.log('File uploaded to S3:', data.Location);
        resolve(data.Location);
        // You can access the S3 URL in the data.Location property
      }
    });
  });
};

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`App listening on ${port}`);
});
