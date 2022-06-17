import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { User } from './User';

export type ChatRoom = Document & {
  idUsers: User[];
  idChatRoom: string;
};

const ChatRoomSchema = new Schema({
  idUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  idChatRoom: {
    type: String,
    default: uuid,
  },
});

export const ChatRoom = mongoose.model<ChatRoom>('ChatRooms', ChatRoomSchema);