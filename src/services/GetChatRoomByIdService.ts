import { injectable } from 'tsyringe';
import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
export class GetChatRoomByIdService {
  public async execute(idChatRoom: string): Promise<ChatRoom> {
    const room = await ChatRoom.findOne({
      idChatRoom
    }).populate('idUsers').exec();


    return room;
  }
}

