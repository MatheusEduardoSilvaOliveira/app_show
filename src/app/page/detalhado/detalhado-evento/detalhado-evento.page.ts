import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';

@Component({
  selector: 'app-detalhado-evento',
  templateUrl: './detalhado-evento.page.html',
  styleUrls: ['./detalhado-evento.page.scss'],
})
export class DetalhadoEventoPage implements OnInit {

  vlr_digitado = ""
  palco = localStorage.getItem('palco_id');

  cantores_consulta = [] //nome cantores

  data_show = [] //datas do palco
  data_atual = localStorage.getItem('data_atual');
  cantores = []
  palcos = []

  palco_dados = []

  maps;

  segment = '0'

  constructor(private provider: Post, private router: Router, private load: LoadComponent) { }

  home(){
    this.router.navigate(['/home']);
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

    //realizar consulta das informações do cantor
    carregarCantor() {
      return new Promise(resolve => {
        this.cantores = [];
        let dados = {
          requisicao: 'cantores_detalhados',
          palco: this.palco,
        };
  
        this.provider.dadosApi(dados, 'api.php').subscribe(data => {
  
          if (data['result'] == '0') {
            console.log("Array retornou vazio");
          } else {
            for (let i of data['result']) {
              this.cantores.push(i);
            }
            console.log(this.cantores);
            //this.maps = this.cantores[0]['palco_maps']
            this.agruparDataDeShow();
            //this.nomeCantoresCadastrados();
            this.cantores_consulta = this.cantores;
            
          }
          resolve(true);
          this.load.dismiss();
        });
      });
  
    }

    //carregar dados do PALCO
    carregarDadosPalco() {
      this.load.present();
      this.carregarCantor();
      return new Promise(resolve => {
        this.palco_dados = [];
        let dados = {
          requisicao: 'palco_dados',
          palco_id: this.palco,
        };
  
        this.provider.dadosApi(dados, 'api.php').subscribe(data => {
  
          if (data['result'] == '0') {
            console.log("Array retornou vazio");
          } else {
            for (let i of data['result']) {
              this.palco_dados.push(i);
            }
          }
          console.log(this.palco_dados)
          this.maps = this.palco_dados[0]["palco_maps"]
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
    this.carregarDadosPalco();
  }

}
