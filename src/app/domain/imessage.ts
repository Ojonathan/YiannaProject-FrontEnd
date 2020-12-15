import { IEvent } from './ievent';

export interface IMessage {
  idMessage?: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp?: Date;
  avatarSender?: string;
}
