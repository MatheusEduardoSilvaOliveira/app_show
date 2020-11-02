import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Post } from 'src/app/services/post';
import { LoadComponent } from 'src/app/components/load/load.component';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
  const { PushNotifications } = Plugins;

@Component({
  selector: 'app-couvert',
  templateUrl: './couvert.page.html',
  styleUrls: ['./couvert.page.scss'],
})
export class CouvertPage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;

  sliderConfigCouvert= {
    spaceBetween: -10,
    centeredSlides: false,
    slidesPerView: 1.2
  }

  couverts = []
  couvert_info_dia = []
  estabe_cods = []

  constructor(private router: Router, private provider: Post, private load: LoadComponent) { }

  capturarDataHora() { //capturar data do celular do usuário
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    //var data_servidor = ano + ("0" + mes).slice(-2) + ("0" + dia).slice(-2);
    var data_servidor = ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    //var data_serv_int = parseInt(data_servidor);
    //this.data_atual = data_servidor;
    localStorage.setItem('data_atual', data_servidor)
    //console.log("data_cell" + data_servidor)
  }

  slidesDidLoad(slides: IonSlides) { // iniciar o play automatico do slide apenas quando preenchida tabela
    if (this.couvert_info_dia.length > 1) {
      slides.startAutoplay();
    }
  }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  couvertDetalhado(estabe_id) { // clicar sobre o cantor do ion-card COUVERT e abrir programação
    localStorage.setItem("estabe_id", estabe_id);
    this.router.navigate(['/detalhado-couvert']);
  }

  carregarCouvertDoDiaInfo() { //COUVERTS do dia para carregar preview (cards)
    this.load.present();
    this.capturarDataHora();
    return new Promise(resolve => {
      this.couvert_info_dia = [];
      let dados = {
        requisicao: 'couvert_info_dia',
        data: localStorage.getItem('data_atual')
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.couvert_info_dia.push(i);
          }
          console.log(this.couvert_info_dia);
        }
        this.estabeComApres();
        resolve(true);
      });
    });

  }

  carregarCouvert() { //COUVERTS com datas futuras
    this.capturarDataHora();
    return new Promise(resolve => {
      this.couverts = [];
      let dados = {
        requisicao: 'couverts',
        data: localStorage.getItem('data_atual')
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.couverts.push(i);
          }
          console.log(this.couverts);
        }
        resolve(true);
        this.load.dismiss();
      });
    });
  }

  verificaToken(token) { //verificar se já está cadastrado, caso não cadastra no db
    return new Promise(resolve => {

      let dados = {
        requisicao: 'token',
        token: token
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        localStorage.setItem('token_id', data['result'][0]);
        alert(data['result'][0])
        resolve(true);
      });
    });
  }

  estabeComApres(){ //palcos com apresentação do dia
    var aux = []
    for (let i = 0; i < this.couvert_info_dia.length; i++) {
      const element = this.couvert_info_dia[i]["estabe_id"]
      aux.push(element)
    }

    this.estabe_cods = [ ...new Set( aux ) ];
    console.log("EstabeComApres " + this.estabe_cods);
  }

  ngOnInit() {
    this.carregarCouvertDoDiaInfo();
    this.carregarCouvert();

    //funções para o push notification
    console.log('Initializing HomePage');
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        //token.value;
        this.verificaToken(token.value);
        //alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        JSON.stringify(error)
        //alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        JSON.stringify(notification)
        //alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        JSON.stringify(notification)
        //alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

}
