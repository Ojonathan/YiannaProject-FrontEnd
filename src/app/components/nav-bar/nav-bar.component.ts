import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketClientService } from 'src/app/services/web-socket-client.service';
import { AddEventTypeComponent } from '../add-event-type/add-event-type.component';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  countMessages: number = 0;
  username : string = '';
  avatar: string = '';

  constructor(private _authService: AuthenticationService,
    private _webSocketClientService: WebSocketClientService,
    private _chatService: ChatService,
    private _router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    // change message notification bagde
    this.username = this._authService.getCurrentUsername();

    this._chatService.getUserAvatar(this.username)
    .pipe(
      switchMap(res => {
        this.avatar = res;
        return this._webSocketClientService.notificationReceived
        .pipe(
          filter(v => {
            if(res && this._authService.isLoggedIn()){
              return true
            }
            return false;
          }),
          switchMap(res => {
              return this._chatService.countNewMessagesTotal(this._authService.getCurrentUsername())
              .pipe(
                map(res => {
                  this.countMessages = res;
                })
              );
          })
        );
      })
    ).subscribe();
  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  getJwtSubjet(): string {
    return this._authService.getJwtSubjet();
  }

  logout() {
    this._authService.logout();

    //disconnect websocket
    this._webSocketClientService.disconnect();
    this._router.navigate(['/']);
  }

  openAddEventDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(AddEventComponent, dialogConfig);
  }

  openAddEventTypeDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(AddEventTypeComponent, dialogConfig);
  }

}
