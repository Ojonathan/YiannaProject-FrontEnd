import { Component, OnInit } from '@angular/core';
import { IConversation } from 'src/app/domain/iconversation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  conversations: IConversation[] = [];

  constructor(private _chatService: ChatService,
    private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this._chatService.findUserConversations(this._authService.getCurrentUsername()).subscribe(
      res => {
        this.conversations = res;
      }
    );
  }
}
