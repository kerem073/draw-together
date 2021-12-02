//Express initialization
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sockets.io initialization
const { Server } = require("socket.io");
const io = new Server({});


// Starting Express server and feed it to socket.io
const server = app.listen(port);
io.listen(server);


app.use(express.static('public'));
console.log(`server listing on port ${port}`);


io.on("connection", (socket) => {
    console.log(socket);

    socket.on('mouse', (data) => {
        console.log(data);
        socket.broadcast.emit('mouse', data);
    });


});
