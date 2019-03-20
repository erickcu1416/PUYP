import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProfile } from './../../models/userProfile.model';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-editsprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss']
})
export class EditprofilePage implements OnInit {
  profile: any;
  file: File;
  username: any;
  age: number;
  description: string;
  slogan: string;
  photo: string;
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private userService: UserService,
    private afs: AngularFirestore
  ) {

  }

  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
  }
  ngOnInit() {
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
    this.itemDoc = this.afs.doc<UserProfile>(`users/${this.profile.email}`);
    this.item = this.itemDoc.valueChanges();
    console.log('Item: ', this.item);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  updateProfile() {
    const obj = {
      username: this.username
    };

    const user: UserProfile = {
      email: this.profile.email,
      age: this.age,
      description: this.description,
      name: this.username,
      photo: 'Hola',
      slogan: this.slogan
    };

    this.userService.updateUser(obj).then(data => {
      this.itemDoc.update(user);
    });
  }
}
