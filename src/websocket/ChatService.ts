import { io } from '../http';
import { container } from 'tsyringe';

import { CreateUserService } from './../services/CreateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';

io.on('connect', (socket) => {
  socket.on('start', async (data) => {
    const { email, avatar, name } = data
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ email, avatar, name, socket_id: socket.id })
    console.log('🚀 ~ file: ChatService.ts ~ line 12 ~ socket.on ~ user', user)

    socket.broadcast.emit('new_user', user);
  });

  socket.on('get_users', async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);

    const users = await getAllUsersService.execute();

    callback(users)
  });
});