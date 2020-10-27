import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  maps;
  whats = null;
  img_cantores = null;
  img_carregada = 0;

  data_br;

  share_array_cantor: string

  constructor(private provider: Post, private router: Router, private load: LoadComponent, private socialSharing: SocialSharing) { }

  couvertRota(){
    this.router.navigate(['/tabs/couvert']);
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
   
    for (let i = 0; i < this.couvert_consulta.length; i++) {
      if(this.couvert_consulta[i]["couvert_data"] == data){
        this.share_array_cantor = this.share_array_cantor + this.couvert_consulta[i]["cantor_nome"] + " - " + "Inícia ás " + this.couvert_consulta[i]["couvert_hora_ini"] + "\n"
      } 
    }
    this.formatDataBr(data)
    console.log(this.share_array_cantor)
    this.socialSharing.share("Local: " + this.estabe_dados[0]["estabe_nome"] + "\n" + 
                            "Dia " + this.data_br + "\n \n" + 
                            "Cantores: " + "\n" + this.share_array_cantor + "\n" + 
                            "Fonte: Aplicativo Campina Music", '', this.estabe_dados[0]["estabe_img"]);
  }

  /*
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
  */

  //realizar consulta das informações do couvert
  carregarCouvert() {
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
          console.log(this.couvert);
          this.agruparDataDeCouvert();
          this.couvert_consulta = this.couvert;
          
       
        }
        resolve(true);
        //this.load.dismiss();
      });
    });

  }

  carregarImgCouvert() {
    return new Promise(resolve => {
      this.img_cantores = [];
      let dados = {
        requisicao: 'couvert_detalhado_img',
        estabe_id: localStorage.getItem('estabe_id'),
        data: this.data_atual,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.img_cantores.push(i);
          }
          console.log(this.img_cantores);
          this.img_carregada = 1;
        }
        resolve(true);
      });
    });

  }

  carregarDadosEstabe() {
    this.carregarImgCouvert();
    this.load.present();
    this.carregarCouvert();
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
        }
        console.log(this.estabe_dados)
        this.maps = this.estabe_dados[0]["estabe_maps"]
        if(this.estabe_dados[0]["estabe_cel"] != null){
          this.whats = "https://api.whatsapp.com/send?1=pt_BR&phone=55" + this.estabe_dados[0]["estabe_cel"].replace(/[\s-()]/g, '');
        }
        //console.log(this.whats)
        resolve(true);
        this.load.dismiss();
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
    this.carregarDadosEstabe();
  }

}
