import { io } from '../http';

io.on('connect', (socket) => {
  socket.emit('chat_init', {
    message: 'Welcome to the chat'
  });
});