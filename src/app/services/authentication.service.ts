import { Injectable } from '@angular/core';
import { WebSocketClientService } from './web-socket-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    // se envia al backend el username y el password al servidor para registrarse
    // el servidor responde con un token que sera guardado el navegador

    // Angular usara el token para crear una peticion HTTP
    // el servidor respondera si tiene acceso o no

  constructor(private _webSocketClientService: WebSocketClientService) { }

  login(username: string, password: string) {
    if (((username === 'user1') || (username === 'user2')) && (password === 'password')) {
      localStorage.setItem('token', 'FAKE TOKEN');
      localStorage.setItem('currentUserName', username);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserName');
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')){
      //this._webSocketClientService.connect()
      return true;
    }
    return false;
  }

  getCurrentUsername(): string {
    var username : any = localStorage.getItem('currentUserName');
    if(username == null){
      return '';
    } else {
      return username;
    }
  }
}
