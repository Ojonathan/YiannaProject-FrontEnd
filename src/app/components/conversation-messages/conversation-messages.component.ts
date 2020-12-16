import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IMessage } from 'src/app/domain/imessage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketClientService } from 'src/app/services/web-socket-client.service';

@Component({
  selector: 'app-conversation-messages',
  templateUrl: './conversation-messages.component.html',
  styleUrls: ['./conversation-messages.component.scss']
})
export class ConversationMessagesComponent implements OnInit, OnDestroy {

  messages: IMessage[] = [];
  x: number[] = [];
  currentIdEvent: string = '';
  currentNotif: any;
  currentIdConversation: string = '';
  currentRecipientName: string = '';
  currentSenderName: string = '';
  private sub: any;
  reset: boolean = false;
  activated: boolean = false;
  isLoaded: boolean = false;

  constructor(private _chatService: ChatService,
    private _webSocketClientService: WebSocketClientService,
    private _authService: AuthenticationService,
    private _router: ActivatedRoute) { }

  ngOnInit(): void {

    for (var i=1;i<=50;i++) {
      this.x.push(i);
    }

    this.sub = this._router.paramMap
      .pipe(
        filter((params: Params) => {
          this.activated=false;
          return params.has('idConversation');
        }),
        switchMap((params: Params) => {
          this.isLoaded = false;
          this.activated=true;
          this.reset = false;
          this.setMessageFields(params.get('idConversation'));
          // get chat messages using idConversation, and recipientName (used to mark messages as DELIVERED)
          return this._chatService.findChatMessages(this.currentIdConversation, this._authService.getCurrentUsername())
            .pipe(
              switchMap(
                resp => {
                  this._webSocketClientService.notificationReceived.next(true);
                  this.messages = resp;
                  for(let item of this.messages){
                    this._chatService.getUserAvatar(item.senderName).subscribe(
                      res => item.avatarSender = res
                    );
                  }

                  this.isLoaded = true;
                  var container = document.getElementById("messages");
                  if(container){
                    container.scrollTop = container.scrollHeight;
                  }

                  return this._webSocketClientService.notificationMessage
                    .pipe(
                      filter(
                        notif => {
                          if (notif.idConversation == this.currentIdConversation){
                            if(this.reset){
                              return true;
                            }
                          }
                          this.reset = true;
                          return false;
                        }
                      ),
                      switchMap(
                        notif => {
                          console.log("" + notif.idConversation + " --- " + this.currentIdConversation);
                          return this._chatService.findChatMessage(notif.idChatNotif).pipe(
                            map(
                              message => {
                                console.log("Before Push");
                                this._chatService.getUserAvatar(message.senderName).subscribe(
                                  res => {
                                    message.avatarSender = res;
                                    this.messages.push(message);
                                    this._webSocketClientService.notificationReceived.next(true);
                                  }
                                );
                              }
                            )
                          );
                        }
                      )
                    );
                }
              )
            );
        })
      ).subscribe();
  }

  ngAfterViewInit() {
    var container = document.getElementById("messages");
    if(container){
      container.scrollTop = container.scrollHeight;
    }
  }

  ngOnDestroy() {
    console.log("unsubscribe conversation Messages");
    this.sub.unsubscribe();
  }

  setMessageFields(idConversation: string) {
    this.currentIdConversation = idConversation;

    var splitted = idConversation.split("_");

    this.currentSenderName = this._authService.getCurrentUsername();
    this.currentIdEvent = splitted[0];

    if (splitted[1] == this.currentSenderName) {
      this.currentRecipientName = splitted[2];
    } else {
      this.currentRecipientName = splitted[1];
    }
  }

  onSendMessage(contentMesage: string) {

    const messageToSend: IMessage = {
      senderName: this.currentSenderName,
      recipientName: this.currentRecipientName,
      content: contentMesage
    };


    //modify eventId
    this._webSocketClientService.send(this.currentIdEvent, messageToSend);
    this._chatService.getUserAvatar(messageToSend.senderName).subscribe(
      res => {
        messageToSend.avatarSender = res;
        this.messages.push(messageToSend);
      }
    );
  }
}
