import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../domain/ievent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public eventAdded = new BehaviorSubject<boolean>(true);

  constructor(private _http:HttpClient) {
  }

  public getAllEvents():Observable<IEvent[]>{
    const URL: string = environment.url_base + '/events';
    return this._http.get<IEvent[]>(URL);
  }

  public addEvent(username: string, e: IEvent): Observable<any> {
    const URL: string = environment.url_base + `/events/${username}`;
    return this._http.post(URL, e, {responseType: 'text'});
  }

  public getEventsForAEvenType(idEvenType: string):Observable<IEvent[]>{
    const URL: string = environment.url_base + `/event_types/${idEvenType}/events`;
    return this._http.get<IEvent[]>(URL);
  }

  public getEventAuthor(idEvent:number): Observable<string>{
    const URL: string = environment.url_base + `/events/${idEvent}/author`;
    return this._http.get(URL, {responseType: 'text'});
  }
}

