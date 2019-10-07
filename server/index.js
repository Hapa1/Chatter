const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsers, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a connection');

    socket.on('join', ( {name, room}, callback ) => {
        const { error, user } = addUser({ id: socket.id, name, room});
        console.log(user)
        if(error) return callback(error)

        socket.emit('message', {user: 'admin', text: `Welcome ${user.name}!`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`});

        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

        callback();

        getUsers()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', { user: user.name, text: message})
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
        const users = getUsersInRoom(user.room)
        console.log("users",users)
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('User has left');
        if(user){
            io.to(user.room).emit('message', { user:'admin',text:`${user.name} has left`})
        }
    })
});



app.use(router);

server.listen(PORT, () => console.log('Server started'))