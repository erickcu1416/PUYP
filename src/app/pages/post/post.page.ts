import { Userpost } from './../../models/userPost.model';
import { FirebaseUserModel } from './../../models/user.model';
import { MapamodalPage } from './../mapamodal/mapamodal.page';
import { ModalController } from '@ionic/angular';
import { Post } from './../../models/post.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage implements OnInit {
  postId = '';
  category = '';
  post: Post;
  oculto = 150;
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };
  userPostData: Userpost = {
    category: '',
    id: '',
    potsId: '',
    sol: false,
    univerty: ''
  };
  loader1 = true;
  loader2 = true;
  user: FirebaseUserModel = new FirebaseUserModel();
  itemDoc: AngularFirestoreDocument<Post>;
  userPostDataDocument: AngularFirestoreDocument<any>;
  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private modalCtrl: ModalController,
    private _requestService: RequestsService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user);
      }
    });
    this.postId = this.route.snapshot.paramMap.get('id');
    this.category = this.route.snapshot.paramMap.get('category');
    this.getPost();
    this.getUserPostData();
  }

  getPost() {
    this.post = {
      id: '',
      admissionTest: '',
      bannerURL: '',
      content: '',
      createdAt: '',
      photoURL: '',
      subtitle: '',
      university: '',
      lat: 0,
      lng: 0,
      email: ''
    };
    this.itemDoc = this.afs
      .collection('categories')
      .doc(this.category)
      .collection('posts')
      .doc(this.postId);
    this.itemDoc.valueChanges().subscribe((data: Post) => {
      this.post = data;
      this.loader1 = false;
      console.log(this.post);
    });
  }

  getUserPostData() {
    this.userPostDataDocument = this.afs
      .collection('userReq')
      .doc(this.user.email)
      .collection('myreq')
      .doc(this.postId);
    this.userPostDataDocument.valueChanges().subscribe((data: Userpost) => {
      if (data) {
        this.userPostData = data;
      }
      this.loader2 = false;
    });
  }

  openMap(lat, lng) {
    this.modalCtrl
      .create({
        component: MapamodalPage,
        componentProps: {
          lat: lat,
          lng: lng
        }
      })
      .then(modal => modal.present());
  }

  async sendSol() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro?',
      message: 'Una vez enviada tu solicitud podras reir :D',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Si, estoy seguro.',
          handler: () => {
            const id = this.afs.createId();
            const sol = {
              id: id,
              postId: this.post.id,
              name: this.user.name,
              email: this.user.email,
              date: new Date().toLocaleString(),
              category: this.category,
              universtiyEmail: this.post.email,
              universityName: this.post.university
            };
            this._requestService.addExam(this.post.email, id, sol);
          }
        }
      ]
    });

    await alert.present();
  }
}
