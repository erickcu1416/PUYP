import { RequestsService } from 'src/app/services/requests/requests.service';
import { WidgetsService } from './../../services/widgets/widgets.service';
import { MyReq } from './../../models/usermyreq.model';
import { FirebaseUserModel } from './../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss']
})
export class RecordPage implements OnInit {
  @ViewChild('list') list: IonList;
  user: FirebaseUserModel = new FirebaseUserModel();
  userRes: MyReq[] = [];
  loader = true;
  none = false;
  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private _widgetsCtrl: WidgetsService,
    private router: Router,
    private alertController: AlertController,
    private reqService: RequestsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user);
      }
    });
    this.getReq();
  }

  getReq() {
    this.afs
      .collection('userReq')
      .doc(this.user.email)
      .collection('myreq')
      .valueChanges()
      .subscribe((data: MyReq[]) => {
        this.userRes = data;
        if (this.userRes.toString() === '')  {
          this.none = true;
        } else {
          this.userRes.sort((a, b) => {
            const dateA: any = new Date(a.date),
              dateB: any = new Date(b.date);
            const res = dateA - dateB;
            return res;
          });
          const aa = this.userRes;
          console.log('a:', aa);
          this.loader = false;
        }
        this.loader = false;

      });
  }

  help() {
    this._widgetsCtrl.presentToastWithOptions(
      'Deslizar hacia la izquierda para eliminar y a la derecha para ir a la publicación',
      'Entendido',
      'middle'
    );
  }

  async delete(item) {
    console.log(item);
    this.list.closeSlidingItems();
    const alert = await this.alertController.create({
      message: '¿Estas seguro que deseas eliminar tu solicitud?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: 'Si, estoy seguro',
          handler: () => {
            this.reqService
              .promise(
                this.user.email,
                item.universityEmail,
                item.id,
                item.postId
              )
              .then(
                data => {
                  this._widgetsCtrl.presentAlert(
                    'Exito',
                    'Eliminado con exito'
                  );
                },
                err => {
                  this._widgetsCtrl.presentAlert(
                    'Ops!',
                    'Al parecer ocurrió un error al eliminar, intenta más tarde'
                  );
                }
              )
              .catch(err => {
                this._widgetsCtrl.presentAlert(
                  'Ops!',
                  'Al parecer ocurrió un error al eliminar, intenta más tarde'
                );
              });
          }
        }
      ]
    });

    await alert.present();
  }

  goToPost(item) {
    console.log(item);
    this.list.closeSlidingItems();
    this.router.navigateByUrl('post/' + item.category + '/' + item.postId);
  }

  reload() {
    this.loader = true;
    this.none = false;
    this.ngOnInit();
  }
}
