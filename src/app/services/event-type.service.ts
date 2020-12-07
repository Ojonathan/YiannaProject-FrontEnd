import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEventType } from '../domain/ievent-type';


@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  public eventTypeAdded = new BehaviorSubject<boolean>(true);

  constructor(private _http:HttpClient) { }

  public getAllEventTypes():Observable<IEventType[]>{
    const URL: string = environment.url_base + '/event_types';
    return this._http.get<IEventType[]>(URL);
   }

  public addEventType(e: IEventType): Observable<any> {
    const URL: string = environment.url_base + '/event_types';
    return this._http.post(URL, e, {responseType: 'text'});
  }
}
