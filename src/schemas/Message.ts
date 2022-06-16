import mongoose, { Document, Schema } from 'mongoose';

export type Message = Document & {
  to: string;
  text: string;
  created_at: Date;
  roomId: string;
};

const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  text: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  roomId: {
    type: String,
    ref: 'ChatRoom',
  },
});

export const Message = mongoose.model<Message>('Messages', MessageSchema);