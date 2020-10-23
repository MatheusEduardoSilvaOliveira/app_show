import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Post } from 'src/app/services/post';
import { LoadComponent } from 'src/app/components/load/load.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;

  sliderConfigCantor= {
    spaceBetween: -10,
    centeredSlides: false,
    slidesPerView: 1.6
  }

  palco_dia = [] //palcos com apresentação do dia
  cantores = [] //cantores com apresentação no dia
  palcos = [] //palcos com shows
  cantores_consulta = []

  constructor(private router: Router, private provider: Post, private load: LoadComponent) { }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  eventoDetalhado(palco_id) { // clicar sobre o cantor do ion-card EVENTO e abrir programação
    localStorage.setItem("palco_id", palco_id);
    this.router.navigate(['/detalhado-evento']);
  }

  carregarPalco() { // palcos que terá shows (maior que a data atual)
    this.load.present();
    return new Promise(resolve => {
      this.palcos = [];
      let dados = {
        requisicao: 'palcos',
        data: localStorage.getItem('data_atual')
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
        this.carregarCantoresDoDia();
        resolve(true);
      });
    });
  }

  carregarCantoresDoDia() { //CANTORES do dia para carregar preview (cards)
    return new Promise(resolve => {
      this.cantores = [];
      let dados = {
        requisicao: 'cantores_info',
        data: localStorage.getItem('data_atual')
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

  palcosComApres(){ //palcos com apresentação do dia
    var aux = []
    for (let i = 0; i < this.cantores.length; i++) {
      const element = this.cantores[i]["palco_id"]
      aux.push(element)
    }

    this.palco_dia = [ ...new Set( aux ) ];
    console.log("palcos " + this.palco_dia);
    this.load.dismiss();
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
    this.carregarPalco();
  }

}
