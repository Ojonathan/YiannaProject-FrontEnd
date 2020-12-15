import { IAuthorEvent } from './iauthor-event';

export interface IEvent {
  idEvent: number;
  name: string;
  description: string;
  place: string;
  picture: string;
  carAvailable: boolean;
  author: IAuthorEvent;
}
