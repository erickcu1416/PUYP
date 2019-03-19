import { UserService } from './../services/user/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  loginForm: FormGroup;
  error_messages = {
    username: [
      { type: 'required', message: 'El Nombre de usuario es necesario' },
      { type: 'minLength', mesaage: 'El Nombre de usuario no cumple con los caracteres' },
      { type: 'maxLength', message: 'El Nombre de usuario tiene muchos caracteres' },
    ],
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'La contraseña tiene bajos caracteres' },
      {
        type: 'maxLength',
        message: 'La contraseña a pasado el limite de los caracteres'
      },
      { type: 'pattern', message: 'Ingresa una contraseña valida' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Es necesario este campo' },
      { type: 'mustMatch', message: 'Contraseñas diferentes' }
    ]
  };
  // tslint:disable-next-line:max-line-length
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _userService: UserService
  ) {
    this.authService.doUser();
    this.loginForm = this.formBuilder.group(
      {
        username: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30)
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
            )
          ])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required])
        )
      },
      {
        validator: this.checkPasswords
      }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  tryRegister(value) {
    this.authService.doRegister(value).then(
      res => {
        this.createName(value.username);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}

  createName(name) {
    this._userService.updateCurrentUser(name).then(
      data => {
        console.log('Nombre Actualizado');
        console.log(data);
        this.router.navigateByUrl('/tabs');
      },
      err => {
        console.log('Error al actualizar el nombre');
        console.log(err);
      }
    );
  }
}
