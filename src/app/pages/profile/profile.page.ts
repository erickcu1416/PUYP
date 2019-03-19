import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseUserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  loader = true;
  public profile_segment: string;

  constructor(private route: ActivatedRoute, private router: Router, private _authService: AuthService) {}

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
}
