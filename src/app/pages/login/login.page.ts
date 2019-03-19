import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  error_messages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'minLength', mesaage: 'Email is low caracteres' },
      { type: 'maxLength', message: 'Email is hight caracteres' },
      { type: 'pattern', message: 'Ingresa un email valido' },
    ],
    password: [
      { type: 'required', message: 'Pass is required' },
      { type: 'minLength', mesaage: 'Pass is low caracteres' },
      { type: 'maxLength', message: 'Pass is hight caracteres' },
      { type: 'pattern', message: 'Ingresa un pass valido' },
    ],
  };

  constructor(public formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router,
              ) {
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          ]
        )),
        email: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          ]
        )),
      },
    );
               }

  ngOnInit() {
  }

  tryLogin(value) {
    this._authService.doLogin(value)
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('/tabs');
      }, err => {
        console.log(err);
      });
  }

}
