import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  img_cantores = null

  segment = '0'
  img_carregada = 0;

  data_br;

  share_array_cantor: string

  constructor(private provider: Post, private router: Router, private load: LoadComponent, private socialSharing: SocialSharing) { }

  showRota(){
    this.router.navigate(['/tabs/show']);
  }

  formatDataBr(data){
    this.data_br = []
    var dia = data.substring(8,10)
    console.log(dia)
    var mes = data.substring(5,7)
    console.log(mes)
    var ano = data.substring(0,4)
    console.log(ano)
    this.data_br = dia + '/' + mes + '/' + ano
  }


  compartilhar(data){
    this.share_array_cantor = ""
   
    for (let i = 0; i < this.cantores.length; i++) {
      if(this.cantores[i]["evento_data"] == data){
        this.share_array_cantor = this.share_array_cantor + this.cantores[i]["cantor_nome"] + "\n"
      } 
    }
    this.formatDataBr(data)
    console.log(this.share_array_cantor)
    this.socialSharing.share("Local: " + this.palco_dados[0]["palco_nome"] + "\n" +
                            "Dia " + this.data_br + "\n \n" + 
                            "Cantores: " + "\n" + this.share_array_cantor + "\n" + 
                            "Fonte: Aplicativo Campina Music", '', this.palco_dados[0]["palco_img"]);
  }


  buscar(ev: any) {
    this.agruparDataDeShow();
    this.cantores_consulta = this.cantores;

    const val = ev.target.value;
    console.log(val);
    if (val.trim() != '') {
      this.cantores_consulta = this.cantores.filter((item) => {
        console.log("item" + item);
        return (item.cantor_nome.toString().toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
        //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

      const aux_data = []
      for (let i = 0; i < this.cantores_consulta.length; i++) {
        aux_data.push(this.cantores_consulta[i]["evento_data"]);
      }
      this.data_show = [...new Set(aux_data)];
      console.log("data" + this.data_show)

      const aux_cantor = []
      for (let i = 0; i < this.data_show.length; i++) {
        for(let y = 0; y < this.cantores.length; y++){
          if(this.data_show[i] == this.cantores[y]["evento_data"]){
            aux_cantor.push(this.cantores[y]);
          }
        }
      }
      console.log("aux_cantor" + aux_cantor)
      this.cantores_consulta = aux_cantor;
  
      console.log("1 " + this.cantores_consulta[0])
      
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
        });
      });
  
    }

    //realizar consulta das imagens dos cantores
    carregarImgCantor() {
      return new Promise(resolve => {
        this.img_cantores = [];
        let dados = {
          requisicao: 'cantores_detalhados_img',
          palco: this.palco,
        };
  
        this.provider.dadosApi(dados, 'api.php').subscribe(data => {
  
          if (data['result'] == '0') {
            console.log("Array retornou vazio");
          } else {
            for (let i of data['result']) {
              this.img_cantores.push(i);
            }
            console.log(this.img_cantores);
            this.agruparDataDeShow(); 
            this.img_carregada = 1
          }
          resolve(true);
        });
      });
  
    }

    //carregar dados do PALCO
    carregarDadosPalco() {
      this.load.present();
      this.carregarImgCantor();
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
          this.load.dismiss();
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
