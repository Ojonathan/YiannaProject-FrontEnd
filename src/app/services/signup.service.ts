import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../domain/iuser';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _http:HttpClient) { }

  public addUser(e: IUser): Observable<any> {
    const URL: string = environment.url_base + '/register';
    return this._http.post(URL, e, {responseType: 'text'});
  }
}
