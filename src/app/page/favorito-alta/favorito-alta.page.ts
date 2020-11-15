import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';
import { Post } from 'src/app/services/post';

@Component({
  selector: 'app-favorito-alta',
  templateUrl: './favorito-alta.page.html',
  styleUrls: ['./favorito-alta.page.scss'],
})
export class FavoritoAltaPage implements OnInit {

  favorito_qtd = []
  cantores = []
  cantores_img = []
  palcos = []
  data_show = []
  palco_show = []
  img_carregada = 0

  constructor(private router: Router, private provider: Post, private load: LoadComponent) { }

  favoritoRota(){
    this.router.navigate(['/tabs/favorito']);
    this.img_carregada = 0
  }

  eventoDetalhado(palco_id) { // clicar sobre o cantor do ion-card EVENTO e abrir programação
    localStorage.setItem("palco_id", palco_id);
    this.router.navigate(['/detalhado-evento']);
    this.img_carregada = 0
  }

  carregarFavoritoQtd(){ //carrgar shows "favoritados pelos usuários"
  this.favorito_qtd = [];
  this.load.present()
    return new Promise(resolve => {
      let dados = {
        requisicao: 'favorito_qtd',
        data_atual: localStorage.getItem('data_atual')
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.favorito_qtd.push(i);
          }
        }
        this.agruparPalcoDeShow();
        this.carregarFavoritoQtdCantorImg();
        resolve(true);
      });
    });
  }

  carregarFavoritoQtdCantor(){ //carrgar cantores
  this.cantores = [];
  return new Promise(resolve => {
    let dados = {
      requisicao: 'favorito_qtd_cantor',
      data_atual: localStorage.getItem('data_atual')
    };

    this.provider.dadosApi(dados, 'api.php').subscribe(data => {

      if (data['result'] == '0') {
        console.log("Array retornou vazio");
      } else {
        for (let i of data['result']) {
          this.cantores.push(i);
        }
      }
      resolve(true);
    });
  });
}

carregarFavoritoQtdCantorImg(){ //carrgar shows "favoritados pelos usuários"
this.cantores_img = [];
return new Promise(resolve => {
  let dados = {
    requisicao: 'favorito_qtd_cantor_img',
    data_atual: localStorage.getItem('data_atual')
  };

  this.provider.dadosApi(dados, 'api.php').subscribe(data => {

    if (data['result'] == '0') {
      console.log("Array retornou vazio");
    } else {
      for (let i of data['result']) {
        this.cantores_img.push(i);
      }
    }
    this.img_carregada = 1
    resolve(true);
  });
});
}

carregarPalco() { // palcos que terá shows (maior que a data atual)
  this.palcos = [];
  return new Promise(resolve => {
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
        this.palcos
        console.log(this.palcos);
        this.carregarFavoritoQtdCantor();
        this.load.dismiss();
      }

      resolve(true);
    });
  });
}

agruparDataDeShow(palco_id) {
  const aux_data = []
  for (let i = 0; i < this.favorito_qtd.length; i++) {
    if(this.favorito_qtd[i]["palco_id"] == palco_id){
      aux_data.push(this.favorito_qtd[i]["favorito_data"]);
    }
  }
  this.data_show = [...new Set(aux_data)];
  this.data_show.sort();
}

agruparPalcoDeShow(){
  const aux_palco = []
  for (let i = 0; i < this.favorito_qtd.length; i++) {
    aux_palco.push(this.favorito_qtd[i]["palco_id"]);
  }
  this.palco_show = [...new Set(aux_palco)];
  this.palco_show.sort();
}

  ngOnInit() {
    this.carregarFavoritoQtd();
    this.carregarPalco();
  }

}
