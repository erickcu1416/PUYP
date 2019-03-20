import { UserProfile } from './../models/userProfile.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseFirestore } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {}

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

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.name,
          photoURL: user.photoURL
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

  updateUserFirestore(value: UserProfile) {
    this.itemDoc = this.afs.doc<any>('users/' + value.email);
    this.item = this.itemDoc.valueChanges();
    this.itemDoc.update(value);
  }
}
