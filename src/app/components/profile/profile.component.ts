import { LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { concat, forkJoin } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IEvent } from 'src/app/domain/ievent';
import { IUser } from 'src/app/domain/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventService } from 'src/app/services/event.service';
import { ProfileService } from 'src/app/services/profile.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  myEvents: IEvent[] = [];
  userInfo!: IUser;
  username: string ='';
  private sub: any;
  activated : boolean =false;

  constructor(private _profileService : ProfileService,
    private _eventService: EventService,
    private _router : ActivatedRoute,
    private dialog: MatDialog,
    private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.sub = this._router.paramMap
      .pipe(
        switchMap((params: Params) => {
          this.username = params.get('username');
          this.activated = this.username == this._authService.getCurrentUsername();

          return forkJoin([
            this._profileService.profileUpdated
            .pipe(
              filter(
                v => {
                  return v;
                }
              ),
              switchMap(
                v => {
                  return this._profileService.getUserByUsername(this.username)
                  .pipe(
                    map(
                      user => this.userInfo = user
                    )
                  );
                }
              )
            )
            ,
            this._eventService.eventAdded
            .pipe(
              filter(
                v => {
                  return v;
                }
              ),
              switchMap(
                v => {
                  return this._profileService.getEventsByUser(this.username)
                  .pipe(
                    map(
                      events => this.myEvents = events
                    )
                  );
                }
              )
            )
            ]);

          /*return this._profileService.getUserByUsername(this.username)
            .pipe(
              switchMap(
                res => {
                  this.userInfo =  res;
                  return this._eventService.eventAdded
                    .pipe(
                      filter(
                        v => {
                          return v;
                        }
                      ),
                      switchMap(
                        v => {
                          return this._profileService.getEventsByUser(this.username)
                          .pipe(
                            map(
                              events => this.myEvents = events
                            )
                          );
                        }
                      )
                    );
                }
              )
            );*/
        })
      ).subscribe();
  }

  ngOnDestroy() {
    console.log("unsubscribe profile");
    this.sub.unsubscribe();
  }

  openEditProfileDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = this.userInfo;

    this.dialog.open(EditProfileComponent,dialogConfig);
  }

}
