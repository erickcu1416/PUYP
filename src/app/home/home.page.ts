import { CATEGORIES } from './../data/categories.data';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseUserModel } from './../models/user.model';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSegment } from '@ionic/angular';
import { Category } from '../models/personaje.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  @ViewChild(IonSegment) segment: IonSegment;
  professions;
  categories: Category[] = [];

  constructor(
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.categories = CATEGORIES.slice(0);
  }

  tryLogout() {
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

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user);
      }
    });
  }

  goToPosts(category) {
    this.router.navigateByUrl('posts/' + category);
  }
}
