import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { WebSocketClientService } from './services/web-socket-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  title = 'YiannaProject-FrontEnd';

  constructor(private _webSocketService : WebSocketClientService,
    private _auth : AuthenticationService) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){
      this._webSocketService.connect();
    }
  }

}
