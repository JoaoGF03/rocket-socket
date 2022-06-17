import { GetChatRoomByUsersService } from './../services/GetChatRoomByUsersService';
import { CreateChatRoomService } from './../services/CreateChatRoomService';
import { io } from '../http';
import { container } from 'tsyringe';

import { CreateUserService } from './../services/CreateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';
import { GetUserBySocketIdService } from '../services/GetUserBySocketIdService';
import { CreateMessageService } from '../services/CreateMessageService';
import { GetMessagesByIdChatRoomService } from '../services/GetMessagesByIdChatRoomService';
import { GetChatRoomByIdService } from '../services/GetChatRoomByIdService';

io.on('connect', (socket) => {
  socket.on('start', async (data) => {
    const { email, avatar, name } = data
    console.log('🚀 ~ file: ChatService.ts ~ line 12 ~', name, 'connected')
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ email, avatar, name, socket_id: socket.id })

    socket.broadcast.emit('new_user', user);
  });

  socket.on('get_users', async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);

    const users = await getAllUsersService.execute();

    callback(users)
  });

  socket.on('start_chat', async (data, callback) => {
    const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
    const getChatRoomByUsersService = container.resolve(GetChatRoomByUsersService);
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getMessagesByIdChatRoomService = container.resolve(GetMessagesByIdChatRoomService);

    const user = await getUserBySocketIdService.execute(socket.id);

    let room = await getChatRoomByUsersService.execute([data.idUser, user.id]);

    if (!room) {
      room = await createChatRoomService.execute([data.idUser, user.id]);
    }

    socket.join(room.idChatRoom);

    const messages = await getMessagesByIdChatRoomService.execute(room.idChatRoom);

    callback({ room, messages })
  });

  socket.on('message', async (data) => {
    const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
    const createMessageService = container.resolve(CreateMessageService);
    const getChatRoomByIdService = container.resolve(GetChatRoomByIdService);

    const user = await getUserBySocketIdService.execute(socket.id);

    const message = await createMessageService.execute({
      to: user.id,
      roomId: data.idChatRoom,
      text: data.message,
    });

    io.to(data.idChatRoom).emit('message', { message, user });

    const room = await getChatRoomByIdService.execute(data.idChatRoom);

    const toUser = room.idUsers.find(idUser => idUser.id !== user.id);

    io.to(toUser.socket_id).emit('notification', { roomId: room.idChatRoom, from: user });
  });
});