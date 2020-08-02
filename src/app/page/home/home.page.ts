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

  data_atual;
  cantores = []

  constructor(private router: Router, private provider: Post) { }

  agenda() {
    this.router.navigate(['/agenda']);
  }

  divulgacao() {
    this.router.navigate(["/divulgacao"]);
  }


  slidesDidLoad(slides: IonSlides) {
    if (this.cantores.length != 0) {
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
    console.log("data_cell" + data_servidor)
  }


  carregarCantoresDoDia() {
    this.capturarDataHora();
    return new Promise(resolve => {
      this.cantores = [];
      let dados = {
        requisicao: 'cantores_do_dia',
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
        resolve(true);
      });
    });

  }

  ngOnInit() {
    this.carregarCantoresDoDia();
  }

}