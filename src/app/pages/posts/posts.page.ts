import { ViewModalPage } from './../view-modal/view-modal.page';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from './../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})
export class PostsPage implements OnInit {
  category = '';
  load = true;
  posts: Post[] = [];
  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };
  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.getPosts();
  }

  getPosts() {
    this.afs
      .collection('categories')
      .doc(this.category)
      .collection('posts')
      .valueChanges()
      .subscribe((data: Post[]) => {
        this.posts = data;
        this.load = false;
        console.log(this.posts);
      });
  }

  goToPost(category, id) {
    this.router.navigateByUrl('post/' + category + '/' + id);
    console.log('post/' + category + '/' + id);
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(
      `linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`
    );
  }

  openPreview(image) {
    this.modalCtrl.create({
      component: ViewModalPage,
      componentProps: {
        img: image
      }
    }).then(
      modal => modal.present()
    );
  }
}
