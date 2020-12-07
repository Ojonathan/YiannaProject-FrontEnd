import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/domain/ievent';
import { EventService } from 'src/app/services/event.service';
import { RespondEventComponent } from '../respond-event/respond-event.component';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  data :IEvent[] = [];

  constructor(private _eventService: EventService,
    private _router : ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initEventAddedSubscription();
  }

  public initEventAddedSubscription() {
    this._eventService.eventAdded.subscribe(
      (v: boolean) => {
      if(v) {
        this._router.paramMap.subscribe(
          res => {
            if(res.has('idEvent')){
              const localid = res.get('idEvent');
              if(typeof localid === 'string'){
                this._eventService.getEventsForAEvenType(localid).subscribe(
                resp => {
                  this.data = resp;
                  for(let event of this.data){
                    this._eventService.getEventAuthor(event.idEvent).subscribe(
                      res => event.author = res
                    )
                  }
                }
              );
              }
            } else {
              this._eventService.getAllEvents().subscribe(
                resp => {
                  this.data = resp;
                  for(let event of this.data){
                    this._eventService.getEventAuthor(event.idEvent).subscribe(
                      res => event.author = res
                    )
                  }
                });
            }
          },
          error => console.log('something wrong occurred: ' + error)
        );

        /*this._eventService.getAllEvents().subscribe(
          resp => {
            this.data = resp;
            for(let event of this.data){
              this._eventService.getEventAuthor(event.idEvent).subscribe(
                res => event.author = res
              )
            }
          },
          error => console.log('something wrong occurred: ' + error)
        );*/
        }
      });
    }

    openRespondEventDialog(idEvent: number, author:string) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        'event' : idEvent,
        'author': author
      };

      this.dialog.open(RespondEventComponent, dialogConfig);
    }
}
