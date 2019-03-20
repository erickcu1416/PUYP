import { EditprofilePage } from './../editprofile/editprofile.page';
import { UserProfile } from './../../models/userProfile.model';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseUserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profile: UserProfile;
  loader = true;
  profileDoc: AngularFirestoreDocument<UserProfile>;
  public profile_segment: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private afs: AngularFirestore,
    private modalCtrl: ModalController
  ) {
    this._authService.doUser();
  }

  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'grid';
  }

  ngOnInit() {
    this.user = null;
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.loader = false;
        this.user = data;
        // console.log(this.user);
      }
    });
    this.getUser();
  }

  trylogOut() {
    this._authService.doLogout().then(
      res => {
        console.log('Correctamente');
        console.log(res);
        this.router.navigateByUrl('/login');
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  getUser() {
    this.profile = {
      age: 0,
      description: '',
      email: '',
      name: '',
      photo: '',
      slogan: ''
    };
    this.profileDoc = this.afs.collection('users').doc(this.user.email);
    this.profileDoc.valueChanges().subscribe((data: UserProfile) => {
      this.profile = data;
      console.log(this.profile);
      this.loader = false;
    });
  }

  goToEdit() {
    this.modalCtrl
      .create({
        component: EditprofilePage,
        componentProps: {
          profile: this.profile,
        }
      })
      .then(modal => modal.present());
  }
}
