import { WidgetsService } from './../../services/widgets/widgets.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-mapamodal',
  templateUrl: './mapamodal.page.html',
  styleUrls: ['./mapamodal.page.scss']
})
export class MapamodalPage implements OnInit {
  lat = 0;
  lng = 0;
  mylat = 0;
  mylng = 0;
  map;
  markers = [];
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private geolocation: Geolocation,
    private _widgets: WidgetsService,
  ) {}

  ngOnInit() {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    console.log(this.lat, this.lng);
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: 16
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      const marker = new google.maps.Marker({
        position: {
          lat: this.lat,
          lng: this.lng
        },
        map: this.map,
        title: 'Hello World!'
      });
    });
  }

  cleanMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: {
        lat: this.lat,
        lng: this.lng
      },
      zoom: 16
    });
  }

  directions() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.cleanMap();
        this.mylat = resp.coords.latitude;
        this.mylng = resp.coords.longitude;
        directionsDisplay.setMap(this.map);
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
      })
      .catch(error => {
        this._widgets.presentAlert('Ops!', 'Al parecer ocurrió un error al obtener tu ubicación');
        console.log('Error getting location', error);

      });
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route(
      {
        origin: { lat: this.mylat, lng: this.mylng },
        destination: { lat: this.lat, lng: this.lng },
        travelMode: 'DRIVING'
      },
      function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          this._widgets.presentAlert('Ops!', 'No pudimos encontrar una ruta para ti');
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
