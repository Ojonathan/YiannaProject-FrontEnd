import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { IMessage } from '../domain/imessage';
import { IConversation } from '../domain/iconversation';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private _http:HttpClient) { }

  findChatMessage(idMessage:number): Observable<IMessage>{
    const URL: string = environment.url_base + '/messages/' + idMessage;
    return this._http.get<IMessage>(URL);
  }

  findChatMessages(idConversation: string, recipientName:string): Observable<IMessage[]>{
    let Params = new HttpParams();
    Params = Params.append('recipientName', recipientName);
    const URL: string = environment.url_base + '/conversations/' + idConversation + '/messages';
    return this._http.get<IMessage[]>(URL, {params: Params});
  }

  /*countNewMessagesByConversation(idConversation: string): Observable<number>{
    const URL: string = environment.url_base + '/conversations/' + idConversation + '/count';
    return this._http.get<number>(URL);
  }*/

  /*countNewMessagesChat(senderName: string, recipientName: string ): Observable<number>{
    const URL: string = environment.url_base + '/messages/' + senderName + '/' + recipientName + '/count';
    return this._http.get<number>(URL);
  }*/

  countNewMessagesTotal(recipientId: string):Observable<number>{
    const URL: string = environment.url_base + '/messages/user/' + recipientId + '/count';
    return this._http.get<number>(URL);
  }

  findUserConversations(userName:string): Observable<IConversation[]>{
    const URL: string = environment.url_base + '/conversations/user/' + userName;
    return this._http.get<IConversation[]>(URL);
  }

  getConversationEventTitle(idEvent: string): Observable<string> {
    const URL: string = environment.url_base + `/conversations/event/${idEvent}`;
    return this._http.get(URL, {responseType: 'text'});
  }

  getUserAvatar(username: string): Observable<string> {
    const URL: string = environment.url_base + `/user/${username}/avatar`;
    return this._http.get(URL, {responseType: 'text'});
  }
}

