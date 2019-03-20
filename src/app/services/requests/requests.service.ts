import { WidgetsService } from './../widgets/widgets.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private requestsCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private widgetsCtrl: WidgetsService) { }

  addExam(email, id, sol) {
    this.afs.collection('requests').doc(email).collection('request').doc(id).set(sol).then(
      data => {
        console.log('Exito en request');
        const obj = {
          id: id,
          date: sol.date,
          postId: sol.postId,
          universityEmail: sol.universtiyEmail,
          universityName: sol.universityName,
          sol: true,
          category: sol.category,
        };
        this.afs
          .collection('userReq')
          .doc(sol.email)
          .collection('myreq')
          .doc(sol.postId)
          .set(obj)
          .then(
            data2 => {
              console.log(data2);
              console.log('Exito en user');
            },
            err => {
              console.log(err);
            }
          );
      }, err => {
        console.log(err);
      }
    );
  }

  deleteExam (email, universityEmail, id) {
    this.afs.collection('requests').doc(universityEmail).collection('request').doc(id).delete().then(
      data => {
        this.afs.collection('userReq').doc(email).collection('myreq').doc(id).delete();
      }
   );
  }

  promise(email, universityEmail, id, postId) {
    return new Promise ((resolve, reject) => {
      this.afs.collection('requests').doc(universityEmail).collection('request').doc(id).delete().then(
        data => {
          this.afs
            .collection('userReq')
            .doc(email)
            .collection('myreq')
            .doc(postId)
            .delete()
            .then(
              data2 => {
                resolve(true);
              },
              err => {
                this.widgetsCtrl.presentAlert('Error', 'Error al eliminarlo');
                reject(false);
              }
            );
        }, err => {
          this.widgetsCtrl.presentAlert('Error', 'Error al eliminarlo');
          reject(false);
        }
      );
    });
  }
}
