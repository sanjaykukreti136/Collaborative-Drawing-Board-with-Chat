const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

// Configuration
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

// Start server
const server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log("Listening on localhost:" + PORT));

// Initiatlize SocketIO
const io = socketIO(server);
users = {};
io.on("connection", function (socket) {

    socket.on("join", function (room) {

        socket.join(room);
        socket.on('user-joined', name => {
            users[socket.id] = name;
            console.log(users);

            socket.broadcast.to(room).emit("joinedi", name)
        })

        socket.on('msg', obj => {
            console.log("opu");
            socket.broadcast.to(room).emit('sendx', obj);
            console.log("dn");
        })
        socket.on('draw', obj => {
            socket.broadcast.to(room).emit('drawkaro', obj)
        })

        socket.on('start', obj => {
            socket.broadcast.to(room).emit('startkaro', obj)
        })

        socket.on('clear', obj => {
            socket.broadcast.to(room).emit('clearkaro', obj)
        })

        socket.on('undoo', obj => {
            console.log("undo");
            socket.broadcast.to(room).emit('undokaro', obj)
        })
        socket.on('lelo', obj => {
            socket.broadcast.to(room).emit('lele', obj);
        })
        socket.on('stop', obj => {
            socket.broadcast.to(room).emit('stopkaro', obj)
        })


    })
})
