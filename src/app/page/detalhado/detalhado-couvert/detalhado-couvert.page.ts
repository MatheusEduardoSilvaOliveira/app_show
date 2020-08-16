import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';

@Component({
  selector: 'app-detalhado-couvert',
  templateUrl: './detalhado-couvert.page.html',
  styleUrls: ['./detalhado-couvert.page.scss'],
})
export class DetalhadoCouvertPage implements OnInit {

  couvert = []
  couvert_consulta = []
  data_couvert = []

  data_atual = localStorage.getItem('data_atual');

  estabe_dados;

  constructor(private provider: Post, private router: Router, private load: LoadComponent) { }

  
  buscar(ev: any) {
    this.couvert_consulta = this.couvert;

    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() != '') {
      this.couvert_consulta = this.couvert.filter((item) => {
        console.log("item" + item);
        return (item.cantor_nome.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //realizar consulta das informações do couvert
  carregarCouvert() {
    this.carregarDadosEstabe();
    //this.load.present();
    return new Promise(resolve => {
      this.couvert = [];
      let dados = {
        requisicao: 'couvert_detalhado',
        estabe_id: localStorage.getItem('estabe_id'),
        data: this.data_atual,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.couvert.push(i);
          }
          //this.load.dismiss();
          console.log(this.couvert);
          this.agruparDataDeCouvert();
          //this.nomeCantoresCadastrados();
          this.couvert_consulta = this.couvert;
        }
        resolve(true);
      });
    });

  }

  carregarDadosEstabe() {
    //this.load.present();
    return new Promise(resolve => {
      this.estabe_dados = [];
      let dados = {
        requisicao: 'estabe_dados',
        estabe_id: localStorage.getItem('estabe_id'),
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.estabe_dados.push(i);
          }
         //this.load.dismiss();
        }
        console.log(this.estabe_dados)
        resolve(true);
      });
    });

  }

  agruparDataDeCouvert() {
    const aux_data = []
    for (let i = 0; i < this.couvert.length; i++) {
        aux_data.push(this.couvert[i]["couvert_data"]);
    }
    this.data_couvert = [...new Set(aux_data)];

    console.log("data " + this.data_couvert);
  }

  ngOnInit() {
    this.carregarCouvert();
  }

}