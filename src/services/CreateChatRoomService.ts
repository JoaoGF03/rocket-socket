import { injectable } from 'tsyringe';
import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
export class CreateChatRoomService {
  public async execute(idUsers: string[]): Promise<ChatRoom> {
    const chatRoom = await ChatRoom.create({ idUsers });

    return chatRoom;
  }
}