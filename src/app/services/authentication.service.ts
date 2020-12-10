import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketClientService } from './web-socket-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    // se envia al backend el username y el password al servidor para registrarse
    // el servidor responde con un token que sera guardado el navegador

    // Angular usara el token para crear una peticion HTTP
    // el servidor respondera si tiene acceso o no

  constructor(private http: HttpClient,
    private _webSocketClientService: WebSocketClientService) { }

  /*login(username: string, password: string) {
    const URL: string = environment.url_base + '/events';
    return this.http.post<any>(URL, { username: username, password: password })
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            localStorage.setItem('currentUser', JSON.stringify({ user: username, token: res.token }));
            //this._webSocketClientService.connect()
          }
        }
      ));
  }*/

  login(username: string, password: string) {
    if (((username === 'user1') || (username === 'user2')) && (password === 'password')) {
      localStorage.setItem('token', 'FAKE TOKEN');
      localStorage.setItem('currentUser', username);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  getCurrentUsername(): string {
    var currentUser : any = localStorage.getItem('currentUser');
    if(currentUser == null){
      return '';
    } else {
      return currentUser;
    }
  }
}
