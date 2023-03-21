const express = require('express');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

// const io = require('socket.io')(server, {
//     cors: {
//         origin: "http://localhost:8080",
//         // methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     }
// })

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  // console.log('Hello - app post !!!')
  // console.log(req.body);
  const { roomId, nameChat } = req.body;
  if (!rooms.has()) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
//   res.json(rooms)
  res.send()
});

io.on('connection', (socket) => {
  console.log('socket', socket);
  console.log('user connected', socket.id);
});

server.listen(8080, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log('Сервер запущен!');
});
