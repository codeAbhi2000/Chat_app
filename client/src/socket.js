import io from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
  socket = io("http://13.126.35.197:5000", {
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
