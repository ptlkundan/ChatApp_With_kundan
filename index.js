//node server which will handle socket io connection
const io = require('socket.io')(8008);

const user = {};

io.on('connection', socket => {
    //if any new user joins let other ppl now about it

    socket.on('new-user-joined', name => {
        //console.log("new user",name);
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });
    //if someone sends a message, broadcast it to other ppl
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] });
    });
    //if someone left the chat ,let ppl now
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', user[socket.id]);
        delete user[socket.id];
    });
});