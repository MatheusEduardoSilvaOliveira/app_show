import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Post } from 'src/app/services/post';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('mySlider') slider: IonSlides;

  sliderConfigCantor= {
    centeredSlides: false,
    slidesPerView: 1.6
  }

  sliderConfigCouvert= {
    centeredSlides: true,
    slidesPerView: 1.6
  }

  palco_dia = [] //palcos com apresentação do dia

  data_atual;
  cantores = []
  couverts = []
  palcos = []
  cantores_consulta = []

  constructor(private router: Router, private provider: Post) { }

  eventoDetalhado(palco) {
    localStorage.setItem("palco", palco);
    this.router.navigate(['/detalhado-evento']);
  }

  couvertDetalhado(estabe_id) {
    localStorage.setItem("estabe_id", estabe_id);
    this.router.navigate(['/detalhado-couvert']);
  }

  slidesDidLoad(slides: IonSlides) {
    if (this.couverts.length != 0) {
      slides.startAutoplay();
    }
  }

  capturarDataHora() {
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


  carregarCantoresDoDia() { //cantores do dia para carregar preview (cards)
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

  carregarCouvertDoDia() { //couvert do dia para carregar preview (cards)
    this.capturarDataHora();
    return new Promise(resolve => {
      this.cantores = [];
      let dados = {
        requisicao: 'couvert_info',
        data: this.data_atual
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
      });
    });
  }

  carregarPalco() {
    return new Promise(resolve => {
      this.palcos = [];
      let dados = {
        requisicao: 'palcos',
        data: this.data_atual
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.palcos.push(i);
          }
          console.log(this.palcos);
        }
        resolve(true);
      });
    });
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

  ngOnInit() {
    this.carregarCantoresDoDia();
    this.carregarPalco();
    this.carregarCouvertDoDia();
  }

}