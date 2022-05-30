import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketClientService } from 'src/app/services/socket-client.service';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSocketClientService } from 'src/app/services/web-socket-client.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { EventService } from 'src/app/services/event.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { IMessage } from 'src/app/domain/imessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  data: IMessage[] = [];
  //public message!: IMessage;

  public senderName: string = '';
  public currentrecipientName: string = 'user1';
  public currentEventId!: string | null;
  // private topicSubscription: Subscription = new Subscription;

  // constructor(private rxStompService: RxStompService) {}
  constructor(private _webSocketClientService: WebSocketClientService,
              private _authService: AuthenticationService,
              private _chatService: ChatService,
              private _router: ActivatedRoute) {}

  ngOnInit(){
    // get all my chat messages
    /*this._chatService.findChatMessagesByConversation(
      "7", this.currentrecipientName, this._authService.getCurrentUsername()).subscribe(
      messages => {
        this.data = messages;
        // notifiy to observer bagde to remove messages already read
        this._webSocketClientService.notificationReceived.next(true);
      }
    );*/

    /*this._webSocketClientService.notificationMessage.subscribe(
      notif => {
        //if(notif){// verify if not null
        this._chatService.findChatMessage(notif.idChatNotif).subscribe(
          message => {
            //this.message = message;
            this.currentrecipientName = notif.senderName;
            console.log("receptor: " + this.currentrecipientName);
            this.data.push(message);
          }
        );
        //}
      }
    );*/


    /*this._router.paramMap.subscribe(
      res => {
        if(res.has('idEvent')){
          this.currentEventId = res.get('idEvent');
          if(this.currentEventId){
            console.log("I came from event: " + this.currentEventId);
          }
        }
      });*/
  }

  onSendMessage(contentMessage: string) {
    const newMessage = {
      senderName: this._authService.getCurrentUsername(),
      recipientName: this.currentrecipientName,
      content: contentMessage
    };

    //modify eventId
    this._webSocketClientService.send("7", newMessage);
  }

  /*ngOnInit() {
    this.topicSubscription = this.rxStompService
      .watch('/topic/greetings')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    const message = `Message generated at ${new Date()}`;
    this.rxStompService.publish({ destination: '/app/hello', body: message });
  }*/
}
