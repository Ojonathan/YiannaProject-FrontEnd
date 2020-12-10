import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../domain/ievent';
import { IUser } from '../domain/iuser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http:HttpClient) { }

  public getEventsByUser(username: string):Observable<IEvent[]>{
    const URL: string = environment.url_base + `/events/user/${username}`;
    return this._http.get<IEvent[]>(URL);
  }

  public getUserByUsername(username: string | null): Observable<IUser>{
    const URL: string = environment.url_base + `/user/${username}`;
    return this._http.get<IUser>(URL);
  }
}
