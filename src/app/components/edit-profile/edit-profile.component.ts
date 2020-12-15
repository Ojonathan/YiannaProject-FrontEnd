import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IUser } from 'src/app/domain/iuser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser,
    private _profileService: ProfileService,
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<EditProfileComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      idUser : [this.data.idUser],
      username: [this.data.username],
      firstname: [this.data.firstname, Validators.required],
      lastname: [this.data.lastname, Validators.required],
      email: [this.data.email],
      description: [this.data.description, Validators.required],
      avatar: [this.data.avatar],
      age: [this.data.age],
      enabled: [this.data.enabled]
    });
  }

  close() {
    this.dialogRef.close();
  }

  saveProfile() {
    //update profile observer
    this._profileService
      .saveProfile(this.form.value)
      .subscribe(
        () => {
          this._profileService.profileUpdated.next(true);
          console.log("Success updating profile");
        },
        error => {
          this._profileService.profileUpdated.next(false);
          console.log('ATTENTION, There is an error: ' + error);
        });
    this.dialogRef.close();
  }

}
