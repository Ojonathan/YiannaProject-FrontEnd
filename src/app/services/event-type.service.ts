import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEventType } from '../domain/ievent-type';


@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(private _http:HttpClient) { }

  public getAllEventTypes():Observable<IEventType[]>{
    const URL: string = environment.url_base + '/event_types';
    return this._http.get<IEventType[]>(URL);
   }
}
