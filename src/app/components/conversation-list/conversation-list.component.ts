import { Component, OnInit } from '@angular/core';
import { concat, forkJoin, onErrorResumeNext } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { IConversation } from 'src/app/domain/iconversation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketClientService } from 'src/app/services/web-socket-client.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  conversations: IConversation[] = [];
  isLoaded: boolean = false;

  constructor(private _chatService: ChatService,
    private _webSocketClientService: WebSocketClientService,
    private _authService: AuthenticationService) { }

  ngOnInit(): void {

    this._webSocketClientService.notificationReceived
      .pipe(
        filter(
          res => {
            return res;
          }
        ),
        mergeMap (
          res => {
            return this._chatService.findUserConversations(this._authService.getCurrentUsername())
              .pipe(
                switchMap(conversations => {
                  this.isLoaded= false;
                  this.conversations = conversations;

                  return forkJoin(conversations
                    .map((conversation: IConversation) => {
                      if (conversation.senderName == this._authService.getCurrentUsername()){
                        conversation.contactName = conversation.recipientName;
                      }else{
                        conversation.contactName = conversation.senderName;
                      }

                      var splitted = conversation.idConversation.split("_");

                      const avatarContact = this._chatService.getUserAvatar(conversation.contactName);
                      const eventTitle = this._chatService.getConversationEventTitle(splitted[0]);

                      return forkJoin([avatarContact, eventTitle]).pipe(
                        map(result =>{
                          conversation.avatarContact = result[0];
                          conversation.eventTittle = result[1];
                          this.isLoaded = true;
                        })
                      )
                    })
                  );
                })
              );
          }
        )
      ).subscribe();

    /*this._webSocketClientService.notificationReceived.subscribe(
      v => {
        if(v){
          this._chatService.findUserConversations(this._authService.getCurrentUsername()).subscribe(
            res => {
              // get idConversation
              this.conversations = res;
              for(let item of this.conversations){
                if (item.senderName == this._authService.getCurrentUsername()){
                  item.contactName = item.recipientName;
                }else{
                  item.contactName = item.senderName;
                }

                this._chatService.getUserAvatar(item.contactName).subscribe(
                  res => {
                    item.avatarContact = res;
                    // get event title
                var splitted = item.idConversation.split("_");
                this._chatService.getConversationEventTitle(splitted[0]).subscribe(
                  res => {
                    item.eventTittle = res;
                    // get avatar contact

                  }
                );
                  }

                );
              }
            }
          );
        }
      }
    );*/

  }
}
