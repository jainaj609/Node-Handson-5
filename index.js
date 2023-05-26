const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')

const app = express()

app.get('/', (req, res) => {
  res.send("It's working")
})
const server = http.createServer(app);
const io = socketio(server,{
      cors: {
        origin: '*',
      },
    })
// const io = require('socket.io')({
//     cors: {
//       origin: '*',
//     },
//   });

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat', (data) => {
    console.log(`message received: ${data.message}`);
    io.emit('message', {
      username: data.username,
      message: data.message,
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = 5000;
server.listen(port,()=>{
  console.log(`Server listening on port ${port}`);
});
