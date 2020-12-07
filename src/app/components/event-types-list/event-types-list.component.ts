import { Component, OnInit } from '@angular/core';
import { IEventType } from 'src/app/domain/ievent-type';
import { EventTypeService } from 'src/app/services/event-type.service';

@Component({
  selector: 'app-event-types-list',
  templateUrl: './event-types-list.component.html',
  styleUrls: ['./event-types-list.component.scss']
})
export class EventTypesListComponent implements OnInit {
  types: IEventType[] = [];


  constructor(private _eventTypeService: EventTypeService) { }

  ngOnInit(): void {
    this.initEventTypeAddedSubscription();

    //this._eventTypeService.getAllEventTypes().subscribe(
    //  resp => this.types = resp,
    //  error => console.log('something wrong occurred: ' + error)
    //);
  }

  public initEventTypeAddedSubscription() {
    this._eventTypeService.eventTypeAdded.subscribe(
      (v: boolean) => {
      if(v) {
        this._eventTypeService.getAllEventTypes().subscribe(
          resp => this.types = resp,
          error => console.log('something wrong occurred: ' + error)
        );
        }
      });
    }


}
