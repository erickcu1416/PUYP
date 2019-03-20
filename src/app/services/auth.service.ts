import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  doRegister(value) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            console.log('Sucesss');
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  doUser() {
    return new Promise<any>((resolve, reject) => {
      console.log(firebase.auth().currentUser);
    });
  }

  doUserFirestore(value) {
    this.afs
      .collection('users')
      .doc(value.email)
      .set(value)
      .then(
        data => {
          console.log('Exito al crear usuario en la base de datos');
          console.log(data);
        },
        err => {
          console.log(err);
          console.log('No se pudo crear el usuario');
        }
      );
  }
}
