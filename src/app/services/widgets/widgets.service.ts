import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  public alertOk = false;
  public alertCancel = false;
  private alert: any;

  constructor(
    public alertController: AlertController,
    private toastController: ToastController
  ) {}

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToastWithOptions(message, button, position) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: position,
      closeButtonText: button,
      animated: true,
      translucent: true
    });
    toast.present();
  }

  async presentToast(message, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async presentAlertConfirm(header, message, buttonCancel, buttonOk) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: buttonCancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            this.alertOk = false;
            this.alertCancel = true;
            console.log('Confirm Cancel: blah');
            console.log('Alert Ok = ', this.alertOk);
            console.log('Alert Cancel = ', this.alertCancel);
          }
        },
        {
          text: buttonOk,
          handler: () => {
            console.log('Confirm Okay');
            this.alertOk = true;
            this.alertCancel = false;
            console.log('Alert Ok = ', this.alertOk);
            console.log('Alert Cancel = ', this.alertCancel);
          }
        }
      ]
    });

    await alert.present();
  }
}
