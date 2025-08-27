import socket from "../socket";

socket.on("message", (msg) => {
  console.log("New message:", msg);
});
