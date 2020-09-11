import { Component, ViewChild } from '@angular/core';
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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('mySlider') slider: IonSlides;

  sliderConfigCategoria= {
    spaceBetween: -10,
    centeredSlides: false,
    slidesPerView: 1.2
  }

  sliderConfigCantor= {
    spaceBetween: -10,
    centeredSlides: false,
    slidesPerView: 1.6
  }

  sliderConfigCouvert= {
    spaceBetween: -10,
    centeredSlides: false,
    slidesPerView: 1.2
  }

  palco_dia = [] //palcos com apresentação do dia

  data_atual;
  cantores = []
  //couverts_dia = []
  palcos = []
  cantores_consulta = []
  couverts = []
  couvert_info_dia = []
  estabe_cods = []
  segment = 0

  sit_couvert = '0' //validar se a imagem de "NENHUM RESULTADO ENCONTRADO" será exibida
  sit_show = '0' //validar se a imagem de "NENHUM RESULTADO ENCONTRADO" será exibida

  constructor(private router: Router, private provider: Post, private load: LoadComponent) { }

  couvert(){
    this.segment = 0;
  }

  show(){
    this.segment = 1;
  }

  eventoDetalhado(palco_id) { // clicar sobre o cantor do ion-card EVENTO e abrir programação
    localStorage.setItem("palco_id", palco_id);
    this.router.navigate(['/detalhado-evento']);
  }

  couvertDetalhado(estabe_id) { // clicar sobre o cantor do ion-card COUVERT e abrir programação
    localStorage.setItem("estabe_id", estabe_id);
    this.router.navigate(['/detalhado-couvert']);
  }

  slidesDidLoad(slides: IonSlides) { // iniciar o play automatico do slide apenas quando preenchida tabela
    if (this.couvert_info_dia.length != 0) {
      slides.startAutoplay();
    }
  }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  capturarDataHora() { //capturar data do celular do usuário
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    //var data_servidor = ano + ("0" + mes).slice(-2) + ("0" + dia).slice(-2);
    var data_servidor = ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    //var data_serv_int = parseInt(data_servidor);
    this.data_atual = data_servidor;
    localStorage.setItem('data_atual', this.data_atual)
    console.log("data_cell" + data_servidor)
  }

  carregarCouvertDoDiaInfo() { //COUVERTS do dia para carregar preview (cards)
    this.load.present();
    this.capturarDataHora();
    //this.estabeComApres();
    //this.load.present();
    return new Promise(resolve => {
      this.couvert_info_dia = [];
      let dados = {
        requisicao: 'couvert_info_dia',
        data: this.data_atual
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


  carregarCantoresDoDia() { //CANTORES do dia para carregar preview (cards)
    this.capturarDataHora();
    return new Promise(resolve => {
      this.cantores = [];
      let dados = {
        requisicao: 'cantores_info',
        data: this.data_atual
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.cantores.push(i);
          }
          console.log(this.cantores);
        }
        this.palcosComApres();
        resolve(true);
      });
    });

  }

  carregarCouvert() { //COUVERTS com datas futuras
    this.capturarDataHora();
    //this.load.present();
    return new Promise(resolve => {
      this.couverts = [];
      let dados = {
        requisicao: 'couverts',
        data: this.data_atual
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          this.sit_couvert = '1'
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.couverts.push(i);
          }
          console.log(this.couverts);
        }
        //this.load.dismiss();
        resolve(true);
      });
    });
  }

  carregarPalco() { // palcos que terá shows (maior que a data atual)
    return new Promise(resolve => {
      this.palcos = [];
      let dados = {
        requisicao: 'palcos',
        data: this.data_atual
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          this.sit_show = '1'
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.palcos.push(i);
          }
          console.log(this.palcos);
        }
        this.load.dismiss();
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

  palcosComApres(){ //palcos com apresentação do dia
    var aux = []
    for (let i = 0; i < this.cantores.length; i++) {
      const element = this.cantores[i]["palco_id"]
      aux.push(element)
    }

    this.palco_dia = [ ...new Set( aux ) ];
    console.log("palcos " + this.palco_dia);

  }
  
  cantoresPorPalco(palco){
    this.cantores_consulta = []
    var aux = []
    for (let i = 0; i < this.cantores.length; i++) {
      if(palco == this.cantores[i]['palco_id']){
        const element = this.cantores[i];
        aux.push(element)
      }
    }
    this.cantores_consulta = aux;
    console.log("cantores_con " + this.cantores_consulta);
  }


  carregarArrays(){ //carregar arrays (results da api)
    this.carregarCouvertDoDiaInfo();
    this.carregarCouvert();
    this.carregarCantoresDoDia();
    this.carregarPalco();
  }


  
  

  ngOnInit() {
    this.carregarArrays();

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
        token.value
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