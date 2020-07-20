import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import _ from 'lodash';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  segment = "1";
  vlr_digitado = "";

  cantores = [] //nome cantores

  palco1 = [] //cantores do palco 1
  palco2 = [] //cantores do palco 2

  data1 = [] //datas do palco 1
  data2 = [] //datas do palco 2

  resultado = [];

  constructor(private provider: Post, private router: Router, public loadingController: LoadingController) {
    this.cantores;
    //this.palco2;
  }

  buscar(ev: any) {
    this.cantores = this.resultado;

    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() != '') {
      this.cantores = this.resultado.filter((item) => {
        console.log("item" + item);
        return (item.cantor_nome.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  home() {
    this.router.navigate(["/home"]);
  }

  detalhado(data: string) {
    localStorage.setItem("data", data);
    localStorage.setItem("palco", this.segment);
    this.router.navigate(["/detalhado"]);
  }

  //realizar consulta das informações do cantor
  carregar_cantor() {
    return new Promise(resolve => {
      this.resultado = [];
      let dados = {
        requisicao: 'cantor',
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.resultado.push(i);
          }
          console.log(this.resultado);
          this.agruparDataDeShow();
          this.agruparPalcoDeShow();
          //this.nomeCantoresCadastrados();
          this.cantores = this.resultado;
        }
        resolve(true);
      });
    });

  }

  agruparDataDeShow() {

    //destinguir em arrays datas dos cantos dos palcos 1 e 2
    const aux_d1 = []
    const aux_d2 = []
    for (let i = 0; i < this.resultado.length; i++) {
      if (this.resultado[i]["cantor_palco"] == "1") {
        aux_d1.push(this.resultado[i]["cantor_data"]);
      }
      else {
        aux_d2.push(this.resultado[i]["cantor_data"]);
      }
    }
    this.data1 = [...new Set(aux_d1)];
    this.data2 = [...new Set(aux_d2)];

    console.log("data1 " + this.data1);
    //console.log("data2 " + this.data2);
  }

  agruparPalcoDeShow() {
    //destinguir em arrays cantores em seus respectivos palcos
    const aux_p1 = []
    const aux_p2 = []
    for (let i = 0; i < this.resultado.length; i++) {
      if (this.resultado[i]["cantor_palco"] == "1") {
        aux_p1.push(this.resultado[i])
      }
      else {
        aux_p2.push(this.resultado[i])
      }
    }

    this.palco1 = aux_p1;
    this.palco2 = aux_p2;
    //console.log(aux_p1);

    console.log("palco1 " + this.palco1);
    //console.log("palco2 " + this.palco2);

  }

  /*
    nomeCantoresCadastrados() {
      const aux = []
      const aux_cantor_dt = []
      var aux_data = []
      for (let i = 0; i < this.palco1.length; i++) {
        //console.log("LENG " + this.palco1.length)
        aux.push(this.palco1[i]["cantor_nome"])
        aux_data = this.data1[i];
        console.log("VAOLOR PALCO 1" + this.palco1[i]["cantor_nome"]);
        for (let y = 0; y < this.palco1.length; y++) {
          console.log("this.data1[i] " + aux_data);
          if (aux_data == this.palco1[y]["cantor_data"]) {
            aux_cantor_dt.push(this.palco1[y])
            console.log("this.palco1[y]" + this.palco1[y])
            y++
          }
          else {
            continue
          }
        }
      }
      this.cantores = [...new Set(aux)];
      this.palco1 = aux_cantor_dt
      console.log("palco11111 " + this.palco1);
      console.log("cantoressssss" + this.cantores)

    }

  nomeCantoresCadastrados() {
    const aux = []
    for (let i = 0; i < this.palco1.length; i++) {
      aux.push(this.palco1[i]["cantor_nome"])
      console.log(aux)
    }
    this.cantores = [...new Set(aux)];
    console.log("funcao array cantores " + this.cantores);

  }*/

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Conectando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  ngOnInit() {
    this.carregar_cantor();
    this.presentLoading();
  }

}
