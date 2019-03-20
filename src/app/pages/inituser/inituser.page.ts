import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inituser',
  templateUrl: './inituser.page.html',
  styleUrls: ['./inituser.page.scss']
})
export class InituserPage implements OnInit {
  ocultar = '';
  slideOpts = {
    effect: 'cube',
    direction: 'horizontal',
  };
  slides: { id: number; img: string; titulo: string; desc: string }[] = [
    {
      id: 1,
      img: '/assets/slides/photos.svg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      id: 2,
      img: '/assets/slides/music-player-2.svg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      id: 3,
      img: '/assets/slides/calendar.svg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      id: 4,
      img: '/assets/slides/placeholder-1.svg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  onClick() {
    this.ocultar = 'animated fadeOut fast';
    this.navCtrl.navigateBack('/');
  }
}
