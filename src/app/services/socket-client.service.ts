import { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, filter, switchMap } from 'rxjs/operators';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { environment } from 'src/environments/environment';
import { SocketClientState } from '../domain/socket-client-state.enum';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService implements OnDestroy {
  private client: Stomp.Client;
  private state: BehaviorSubject<SocketClientState>;

  //connection
  constructor() {
    this.client = Stomp.over(new SockJS(environment.url_base + '/ws'));
    console.log('Client trying to connect to chat');
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    //connect({}, onConnected, onError);
    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
      console.log('Client connected to chat');
    });
  }

  //check connection
  private connect(): Observable<Stomp.Client> {
    return new Observable<Stomp.Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }

  ngOnDestroy() {
    this.connect().pipe(first()).subscribe(client => client.disconnect(
      () => {
      //alert("See you next time!");
      }));
  }

  //receiving data from backend
  onMessage(topic: string): Observable<any> {
    return this.connect().pipe(first(), switchMap(client => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = client.subscribe(topic, message => {
          observer.next(message);
        });
        return () => client.unsubscribe(subscription.id);
      });
    }));
  }

  //send message to backend
  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(client => client.send(topic, {}, JSON.stringify(payload)));
  }
}
