import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../domain/ievent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http:HttpClient) { }

  public getAllEvents():Observable<IEvent[]>{
    const URL: string = environment.url_base + '/events';
    return this._http.get<IEvent[]>(URL);
   }
}

