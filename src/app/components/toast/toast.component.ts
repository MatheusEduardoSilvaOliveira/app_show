import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(public toastController: ToastController) { }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: color
    });
    toast.present();
  }

  ngOnInit() {}

}
