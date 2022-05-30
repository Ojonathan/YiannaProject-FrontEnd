import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketClientService } from './web-socket-client.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    // se envia al backend el username y el password al servidor para registrarse
    // el servidor responde con un token que sera guardado el navegador

    // Angular usara el token para crear una peticion HTTP
    // el servidor respondera si tiene acceso o no

  public isLogged = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }

  login(myUsername: string, myPassword: string) {
    const URL: string = environment.url_base + '/login';
    return this.http.post<any>(URL, { username: myUsername, password: myPassword })
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            localStorage.setItem('currentUser', JSON.stringify({ myUsername, token: res.token }));
          }
        }
      ));
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser')){
      return true;
    }
    return false;
  }

  getJwtSubjet(): string {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const helper = new JwtHelperService();
      return helper.decodeToken(JSON.parse(stored).token).sub;
    }
    return '';
  }

  getCurrentUsername(): string {
    const currentUser: any = localStorage.getItem('currentUser');
    if (currentUser){
      return JSON.parse(currentUser).username;
    }
    return '';
  }
}
