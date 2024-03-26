const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server,{
    cors: {origin: '*'}
});

io.on('connection', (socket) => {
    console.log("🚀se ha conectado un cliente🚀: ");
    socket.broadcast.emit('chat_message', {
            usuario: 'INFO',
            texto: 'Se ha conectado un nuevo cliente'
        });
    socket.on('chat_message', (data) => {
        console.log("🚀 ~ socket.on ~ data:", data)
        io.emit('chat_message', data);
    });
});

server.listen(1000, () => console.log('Listening on port 1000: http://localhost:1000'));
    
