import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseFirestore } from '@angular/fire';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private afs: FirebaseFirestore) {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("User service", user);
          resolve(user);
        } else {
          console.log("User service", user);
          reject("No user logged in");
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value
        })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  updateUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.username
        })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
  updateUserFirestore(value) {
    this.afs
      .collection("users")
      .doc(value.email).update(
        value
      ).then(
        data => {
          console.log(data);
          console.log('Exito');
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
  }
}
