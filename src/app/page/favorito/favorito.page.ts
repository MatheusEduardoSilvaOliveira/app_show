import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';
import { Post } from 'src/app/services/post';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage{

  cantores = []
  cantores_consulta = []
  img_cantores = []
  img_carregada = 0
  data_show = []
  palco_show = []
  palco_nome = []
  favorito_id;
  data_atual = localStorage.getItem('data_atual');

  constructor(private provider: Post, private router: Router, private load: LoadComponent) { }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  carregarFavoritos() {
    this.carregarImgFavorito();
    this.load.present();
    this.palco_nome = []
    return new Promise(resolve => {
      this.cantores = [];
      let dados = {
        requisicao: 'favorito',
        token_id: localStorage.getItem('token_id')
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.cantores.push(i);
          }
          this.agruparPalcoDeShow();
          this.nomePalco();
          this.cantores_consulta = this.cantores;

        }
        this.load.dismiss()
        resolve(true);
      });
    });

  }

  carregarImgFavorito() {
    if(this.img_carregada == 0){

      return new Promise(resolve => {
        this.img_cantores = [];
        let dados = {
          requisicao: 'favorito_img',
          token_id: localStorage.getItem('token_id')
        };
  
        this.provider.dadosApi(dados, 'api.php').subscribe(data => {
  
          if (data['result'] == '0') {
            console.log("Array retornou vazio");
          } else {
            for (let i of data['result']) {
              this.img_cantores.push(i);
            }
            this.img_carregada = 1
          }
          resolve(true);
        });
      });

    }
      
  }


  agruparDataDeShow(palco_id) {
    const aux_data = []
    for (let i = 0; i < this.cantores.length; i++) {
      if(this.cantores[i]["palco_id"] == palco_id){
        aux_data.push(this.cantores[i]["evento_data"]);
      }
    }
    this.data_show = [...new Set(aux_data)];
    this.data_show.sort();
    //console.log("data " + this.data_show.sort());
  }

  agruparPalcoDeShow(){
    const aux_palco = []
    for (let i = 0; i < this.cantores.length; i++) {
      aux_palco.push(this.cantores[i]["palco_id"]);
    }
    this.palco_show = [...new Set(aux_palco)];
    this.palco_show.sort();
    //console.log("palco " + this.palco_show);
  }

  nomePalco(){
    var palco_nome_aux = []
    for (let i = 0; i < this.palco_show.length; i++){
      for (let y = 0; y < this.cantores.length; y++) {
        if(this.palco_show[i] == this.cantores[y]["palco_id"]){
          palco_nome_aux.push(this.cantores[y]);
          break
        }
      }
    }
    this.palco_nome = palco_nome_aux
  }

  removeFavorito(palco_id, data) {
    var aux_favorito = []

    for (let i = 0; i < this.cantores_consulta.length; i++) {
     if(this.cantores_consulta[i]["palco_id"] === palco_id && this.cantores_consulta[i]["evento_data"] === data){
      aux_favorito.push(this.cantores_consulta[i]['favorito_id'])
      break
      }
    } 

    this.favorito_id = aux_favorito[0];
   
    return new Promise(resolve => {
      let dados = {
        requisicao: 'favorito_delete',
        id: this.favorito_id
      };
      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        console.log(data["result"])
        if(data["result"] == 'success'){
          aux_favorito = null
          this.favorito_id = null
          this.cantores_consulta = []
          this.carregarFavoritos();
        }
      });
      resolve(true);
      });
    }
    

  ionViewWillEnter(){
    this.img_carregada = 0
    this.carregarFavoritos();
  }

}
