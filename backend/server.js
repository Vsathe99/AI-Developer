import 'dotenv/config.js';
import http from 'http';
import app from './app.js';
import {Server} from 'socket.io'

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

io.use((socket,next)=>{
    try {
        
        const token = socket

    } catch (error) {
        next(error)
    }
})

io.on('connection', socket=>{
    console.log('a user connected')
    socket.on('event',data =>{});
    socket.on('disconnect', ()=>{});
});



server.listen(port, ()=>{
    console.log('Server is running on port 3000')
})
