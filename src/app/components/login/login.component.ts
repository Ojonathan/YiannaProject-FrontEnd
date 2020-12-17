import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IUserAuth } from 'src/app/domain/iuser-auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WebSocketClientService } from 'src/app/services/web-socket-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  returnUrl: string = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private _webSocketClientService: WebSocketClientService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
    this._authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() { return this.form.controls; }

  login(user: IUserAuth) {
    this.loading = true;
    console.log("Antes de hacer el login");
    //this._authenticationService.login(c.username, c.password);
    this._authenticationService.login(user.username, user.password)
        .pipe(first())
        .subscribe(
            data => {
              if(this._authenticationService.isLoggedIn()){
                // start connection
                this._webSocketClientService.connect();
                // start verification of notfifications
                this._webSocketClientService.notificationReceived.next(true);
                // is logged
                this._authenticationService.isLogged.next(true);
                // go to main page
                this.router.navigate([this.returnUrl]);
              }
                //this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });

    // If success, a token will be added to the localstorage
    //connect websocket

  }
}
