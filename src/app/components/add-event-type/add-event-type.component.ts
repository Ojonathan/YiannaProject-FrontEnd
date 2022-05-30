import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventTypeService } from 'src/app/services/event-type.service';

@Component({
  selector: 'app-add-event-type',
  templateUrl: './add-event-type.component.html',
  styleUrls: ['./add-event-type.component.scss']
})
export class AddEventTypeComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private _eventTypeService: EventTypeService,
              private dialogRef: MatDialogRef<AddEventTypeComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }


  publishEventType() {
    this._eventTypeService
      .addEventType(this.form.value)
      .subscribe(
        () => {
        this._eventTypeService.eventTypeAdded.next(true);
        console.log("Ajout avec succès d'un type d'événement");
        },
        error => {
          this._eventTypeService.eventTypeAdded.next(false);
          console.log ('ATTENTION, There is an error: ' + error);
        });
      this.dialogRef.close();
  }

}
