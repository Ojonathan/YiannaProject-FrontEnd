import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/domain/iuser';
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
    private authenticationService: AuthenticationService,
    private _webSocketClientService: WebSocketClientService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login(c: IUser) {
    this.loading = true;
    this.authenticationService.login(c.username, c.password);

    // If success, a token will be added to the localstorage
    //connect websocket
    if(this.authenticationService.isLoggedIn()){
      this._webSocketClientService.connect();
      this._webSocketClientService.notificationReceived.next(true);
      this.router.navigate([this.returnUrl]);
    }
  }
}
