import dgarm from "node:dgram";

const socket = dgarm.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
});
socket.send("Hi from lap", 4000, "192.168.0.162");
