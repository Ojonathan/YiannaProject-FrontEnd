import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/domain/ievent';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  data :IEvent[] = [];;

  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
    this._eventService.getAllEvents().subscribe(
      resp => this.data = resp,
      error => console.log('something wrong occurred: ' + error)
    );
  }

}
