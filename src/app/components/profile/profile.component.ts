import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/domain/ievent';
import { IUser } from 'src/app/domain/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventService } from 'src/app/services/event.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myEvents: IEvent[] = [];
  userInfo!: IUser;

  constructor(private _profileService : ProfileService,
    private _authService: AuthenticationService) { }

  ngOnInit(): void {
    //this.userInfo.description = "No description";
    this._profileService.getUserByUsername(localStorage.getItem('currentUserName')).subscribe(
      user => {
        this.userInfo = user;
        this._profileService.getEventsByUser(this._authService.getCurrentUsername()).subscribe(
          events => this.myEvents = events
        )
      }
    );
  }

}
