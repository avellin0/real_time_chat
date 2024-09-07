const app = require('express')()
const server = require("http").createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})


const PORT = 3001


io.on('connection', socket => {
    console.log(`user connected sucessfuly ${socket.id}`);

    socket.on('disconnect', reason => {
        console.log(`user disconnected ${socket.id}`);
        
    } )

    socket.on('set_username', username => {
        socket.data.username = username;

        io.emit('userInfo', username)
        console.log("Username enviado para userInfo");
    })

    
    
    socket.on('send_message', text => {

        console.log(`Sending message from ${socket.data.username}`);

        io.emit('mensagem', {
            text,
            authorId: socket.id
        })

        console.log("texto enviado para userInfo");
    })

})

server.listen(PORT, () => {
    console.log("Server is Running...");
})

