import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  type: 'LOGIN' | 'REGISTRATION' = 'LOGIN';

  registrationForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registrationForm.valueChanges.subscribe(_ => this.errorMessage = '');
    this.loginForm.valueChanges.subscribe(_ => this.errorMessage = '');
  }

  login(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value)
      .subscribe(_ => { this.continueToWhether() }
      ,({ error }) => this.errorMessage = error.errorMessage);
  }

  register(): void {
    if (this.registrationForm.invalid) return;

    this.authService.registration(this.registrationForm.value)
      .subscribe(_ => {
        //I thought the right thing to do after registration is to navigate to the weather, As the user is logged in
        //but I navgated user to login as written in assignment Description.
        //this.continueToWhether();

        this.type = 'LOGIN';
      },({ error }) => this.errorMessage = error.errorMessage);
  }

  continueToWhether(): void {
    this.authService.setUser();
    this.router.navigate(['/weather']);
  }
}
