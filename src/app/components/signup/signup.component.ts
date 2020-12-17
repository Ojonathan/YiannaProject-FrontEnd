import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/domain/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  returnUrl: string = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _signupService: SignupService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  get f() { return this.form.controls; }

  signup(c: IUser) {
    this._signupService.addUser(c)
    .subscribe(
      () => {
      console.log("Ajout avec succès d'un nouveu utilisateur");
      this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log ('ATTENTION, There is an error: ' + error);
      });
  }
}
