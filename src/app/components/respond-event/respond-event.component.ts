import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketClientService } from 'src/app/services/web-socket-client.service';

@Component({
  selector: 'app-respond-event',
  templateUrl: './respond-event.component.html',
  styleUrls: ['./respond-event.component.scss']
})
export class RespondEventComponent implements OnInit {
  form!: FormGroup;
  idEvent: string = '';
  receipterName: string = '';

  constructor(private fb: FormBuilder,
    private _webSocketClientService: WebSocketClientService,
    private _authService : AuthenticationService,
    private dialogRef: MatDialogRef<RespondEventComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.idEvent = data.event;
      this.receipterName = data.author;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  respondEvent(contentMessage:string) {
    const newmessage = {
      senderName: this._authService.getCurrentUsername(),
      recipientName: this.receipterName,
      content: contentMessage
    };

    //check if event exists before sending

    this._webSocketClientService.send(this.idEvent,newmessage);
    // send message to create a conversation
      this.dialogRef.close();
  }
}
