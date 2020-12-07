import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IEventType } from 'src/app/domain/ievent-type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventTypeService } from 'src/app/services/event-type.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  form!: FormGroup;
  types: IEventType[] = [];
  filteredOptions!: Observable<IEventType[]>;

  constructor(private fb: FormBuilder,
    private _eventService: EventService,
    private _eventTypeService: EventTypeService,
    private _authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<AddEventComponent>) {
  }

  ngOnInit(): void {
    this._eventTypeService.getAllEventTypes().subscribe(
      resp => {
        this.types = resp;
        this.filteredOptions = this.form.controls['type'].valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      },
      error => console.log('something wrong occurred: ' + error)
    );

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      carAvailable: [false],
      type: [Validators.required]
    });
  }

  private _filter(value: string): IEventType[] {
    console.log(value);
    var filterValue: string = '';
    if (typeof value === 'string') {
      console.log('es string');
      filterValue = value.toLowerCase();
    }
    return this.types.filter(option => option.type.toLowerCase().includes(filterValue));
  }

  close() {
    this.dialogRef.close();
  }

  getOptionText(option: IEventType) {
    return option.type;
  }

  publishEvent() {
    this._eventService
      .addEvent(this._authenticationService.getCurrentUsername(),
                this.form.value)
      .subscribe(
        () => {
          this._eventService.eventAdded.next(true);
          console.log("Success adding event");
        },
        error => {
          this._eventService.eventAdded.next(false);
          console.log('ATTENTION, There is an error: ' + error);
        });
    this.dialogRef.close();
  }
}
