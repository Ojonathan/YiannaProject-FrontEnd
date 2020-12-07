import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IMessage } from 'src/app/domain/imessage';
import { INotification } from 'src/app/domain/inotification';
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
  currentIdEvent: string = '';
  currentNotif: any;
  currentIdConversation: string = '';
  currentRecipientName: string = '';
  currentSenderName: string = '';
  private sub: any;
  reset: boolean = false;

  constructor(private _chatService: ChatService,
    private _webSocketClientService: WebSocketClientService,
    private _authService: AuthenticationService,
    private _router: ActivatedRoute) { }

  ngOnInit(): void {
    /*this.sub = this._router.paramMap.subscribe(
      res => {
        if (res.has('idConversation')) {
          var localIdConversation = res.get('idConversation');
          console.log("current Conversation: " + localIdConversation);

          if (typeof localIdConversation === 'string') {
            this._chatService.findChatMessages(localIdConversation, this._authService.getCurrentUsername()).subscribe(
              resp => {
                if (typeof localIdConversation === 'string') {
                  this.messages = resp;
                  this.setMessageFields(localIdConversation);
                  // update bagde
                  this._webSocketClientService.notificationReceived.next(true);
                }
              });

            this._webSocketClientService.notificationMessage.pipe(
              filter(notif => {
                console.log("" + notif.idConversation + " --- " + localIdConversation);
                return notif.idConversation == localIdConversation;
                }),
                switchMap(
                  notif => {
                    console.log("retornar observador si el filtro se cumple");
                    return this._chatService.findChatMessage(notif.idChatNotif);
                  }
                )).subscribe(
                  message => {
                    console.log("Before Push");
                    this.messages.push(message);
                    this._webSocketClientService.notificationReceived.next(true);
                  }
                );
          }
        }
      },
      error => console.log('something wrong occurred: ' + error)
    );*/

    this.sub = this._router.paramMap
      .pipe(
        switchMap((params: Params) => {
          this.reset = false;
          this.setMessageFields(params.get('idConversation'));
          return this._chatService.findChatMessages(this.currentIdConversation, this._authService.getCurrentUsername())
            .pipe(
              switchMap(
                resp => {
                  this.messages = resp;
                  // update bagde
                  this._webSocketClientService.notificationReceived.next(true);
                  /*return this._webSocketClientService.notificationReceived
                  .pipe(
                  filter(res => {
                    if(res){
                      console.log("TRUE");
                      this.currentNotif = this._webSocketClientService.notification;
                      return true;
                    }else{
                      console.log("FALSE");
                      this.currentNotif = null;
                      return false;
                    }
                  }),
                  switchMap(
                    res => {
                      console.log("" + this.currentNotif.idConversation + " --- " + this.currentIdConversation);
                      return this._chatService.findChatMessage(this.currentNotif.idChatNotif).pipe(
                        map(
                          message => {
                            console.log("Before Push");
                            this.messages.push(message);
                          }
                        )
                      );
                    }
                  )
                  );*/
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

                          //console.log(notif.idConversation);
                          //return (notif.idConversation == this.currentIdConversation) && this.reset;
                        }
                      ),
                      switchMap(
                        notif => {
                          console.log("" + notif.idConversation + " --- " + this.currentIdConversation);
                          return this._chatService.findChatMessage(notif.idChatNotif).pipe(
                            map(
                              message => {
                                console.log("Before Push");
                                this.messages.push(message);
                                this._webSocketClientService.notificationReceived.next(true);
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

            /*this._webSocketClientService.notificationMessage.pipe(
              filter(notif => {
                console.log("" + notif.idConversation + " --- " + localIdConversation);
                return notif.idConversation == localIdConversation;
                }),
                switchMap(
                  notif => {
                    console.log("retornar observador si el filtro se cumple");
                    return this._chatService.findChatMessage(notif.idChatNotif);
                  }
                )).subscribe(
                  message => {

                  }
                );*/
  }

  ngOnDestroy() {
    console.log("unsubscribe");
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
    this.messages.push(messageToSend);
  }
}
