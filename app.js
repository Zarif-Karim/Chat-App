const PORT = 5000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

//serving public files
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    console.log(req.url);
    res.end();
});

io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('disconnect', ()=> console.log('a user disconnected'));

    socket.on('chat message', (msg)=>{
        console.log('message: ' + msg);
        socket.broadcast.emit('new message', msg);
    });
});

server.listen(PORT, ()=>console.log(`Server started: http://localhost:${PORT}`));