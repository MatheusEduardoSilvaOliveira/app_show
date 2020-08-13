import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import _ from 'lodash';
import { LoadComponent } from 'src/app/components/load/load.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  vlr_digitado = ""
  palco = "1"

  cantores_consulta = [] //nome cantores

  data_show = [] //datas do palco

  cantores = []
  palcos = []

  constructor(private provider: Post, private router: Router, private load: LoadComponent) { }

  home() {
    this.router.navigate(["/home"]);
  }

  buscar(ev: any) {
    this.cantores_consulta = this.cantores;

    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() != '') {
      this.cantores_consulta = this.cantores.filter((item) => {
        console.log("item" + item);
        return (item.cantor_nome.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  detalhado(data: string) {
    localStorage.setItem("data", data);
    localStorage.setItem("palco", this.palco);
    this.router.navigate(["/detalhado"]);
  }

  //realizar consulta das informações do cantor
  carregarCantor() {
    this.load.present();
    return new Promise(resolve => {
      this.cantores = [];
      let dados = {
        requisicao: 'cantores',
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.cantores.push(i);
          }
          this.load.dismiss();
          console.log(this.cantores);
          this.agruparDataDeShow();
          //this.nomeCantoresCadastrados();
          this.cantores_consulta = this.cantores;
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

  agruparDataDeShow() {
    const aux_data = []
    for (let i = 0; i < this.cantores.length; i++) {
      if (this.cantores[i]["palco_id"] == this.palco) {
        aux_data.push(this.cantores[i]["evento_data"]);
      }
    }
    this.data_show = [...new Set(aux_data)];

    console.log("data " + this.data_show);
  }

  ngOnInit() {
    this.carregarCantor();
    this.carregarPalco();
  }

}
