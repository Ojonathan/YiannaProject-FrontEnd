import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { environment } from 'src/environments/environment';
import { StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {
  public notificationReceived = new BehaviorSubject<boolean>(true);
  public notificationMessage = new BehaviorSubject<any>({});
  public notification: any;

  private client!: Stomp.Client;
  private subscription!: StompSubscription;

  constructor() {
  }

  //connect and subscribe
  connect() {
    this.client = Stomp.over(new SockJS(environment.url_base + '/ws'));
    console.log('Client trying to connect to chat');
    //connect({}, onConnected, onError);
    this.client.connect(
      {},
      () => {
        // subscribe
        this.onConnected();
      },
      err => {
        this.onError(err); });
  }

  disconnect() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
    if (this.client){
      this.client.disconnect( () => { });
    }
  }

  //subscribe to my user messages
  onConnected() {
    console.log("connected");
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.subscription = this.client.subscribe(
        "/user/" + JSON.parse(currentUser).username + "/queue/messages",
        msg => {
          // send observers that a notifications has arrived
          //this.saveNotification(JSON.parse(msg.body))
          this.notificationMessage.next(JSON.parse(msg.body));
          this.notificationReceived.next(true);
          // send observers the message
          //let notification : INotification = JSON.parse(msg.body);
          //this.onMessageReceived(msg);
        }
      );
    }
  }

  onError(err: any) {
    console.log(err);
  }

  saveNotification(n: any) {
    this.notification = n;
  }

  /*onMessageReceived(msg : any){
    console.log("notification avant JSON " + msg);
    const notification = JSON.parse(msg.body);
    console.log("notification of message received: " + notification);

    // get all my new message using HTTP GET

    notification.senderId;
  };*/

  //send message to backend
  send(eventId: string, payload: any): void {
    this.client.send("/app/chat/" + eventId, {}, JSON.stringify(payload));
  }
}
