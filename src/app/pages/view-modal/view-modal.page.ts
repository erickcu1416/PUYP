import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.page.html',
  styleUrls: ['./view-modal.page.scss'],
})
export class ViewModalPage implements OnInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;
  img: any;
  sliderOpts = {
    zoom: {
      maxRatio: 3,
    }
  };
  constructor( private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
  }

  zoom( zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if ( zoomIn ) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
