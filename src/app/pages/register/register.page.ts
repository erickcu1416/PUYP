import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
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
    confirmPassword: [
      { type: 'required', message: 'confirmPassword is required' },
      { type: 'mustMatch', message: 'Password is diferent' }
    ],
    userName: [
      { type: 'required', message: 'UserName is required' },
      { type: 'pattern', message: 'Ingresa un username valido' },
    ]
  };
  constructor(public formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router,
              private _userService: UserService ) {

    this.registerForm = this.formBuilder.group(
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
        confirmPassword: new FormControl('', Validators.compose(
          [
            Validators.required,
          ]
        )),
        userName: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.pattern('[a-zA-Z ]*')
          ]
        ))
      }, {
        // validator: MustMatch('password', 'confirmPassowrd'),
        validator: this.checkPasswords
      }
    );

   }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  tryRegister(value) {
    this._authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.createName(value.userName);
      }, err => {
        console.log(err);
      });
  }

  createName(name) {
    this._userService.updateCurrentUser(name).then(
      data => {
        console.log('Nombre Actualizado');
        console.log(data);
        this.router.navigateByUrl('/tabs');
      }, err =>{
        console.log('Error al actualizar el nombre');
        console.log(err);
      }
    );
  }

}
