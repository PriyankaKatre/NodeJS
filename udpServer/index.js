import dgarm from 'node:dgram';

const socket = dgarm.createSocket("udp4");

socket.on("message", (message, remoteAddress) => {
    console.log(message.toString());
    console.log(remoteAddress);
    socket.send("Message Received Successfully on server", remoteAddress.port, remoteAddress.address)
})

socket.bind(4000, () => {
   const address = (socket.address());
    console.log(`listening on ${address.port}`)
})
