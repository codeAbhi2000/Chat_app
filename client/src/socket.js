import io from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
  socket = io("https://chatapp-production-23a8.up.railway.app", {
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
