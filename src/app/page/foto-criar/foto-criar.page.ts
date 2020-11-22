import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Post } from 'src/app/services/post';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'app-foto-criar',
  templateUrl: './foto-criar.page.html',
  styleUrls: ['./foto-criar.page.scss'],
})
export class FotoCriarPage implements OnInit{

  token_id = localStorage.getItem('token_id');
  data_atual = localStorage.getItem('data_atual');
  local_nome = '';

  segment;
  couvert: any = [];
  palco: any = [];
  segment_array: any = [];
  photo = '';
  descricao: string = '';

  constructor(private router: Router, private provider: Post, private load: LoadComponent, private toast: ToastComponent, private alert: AlertComponent) { }

  fotoRota(){
    this.router.navigate(['/tabs/foto']);
  }

  async takePicture(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = image.dataUrl
    console.log(this.photo);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail);
    console.log(this.local_nome);
    if(ev.detail.value[0] == 0){
      this.segment_array = this.couvert
      this.local_nome = ''
    }
    else{
      this.segment_array = this.palco
      this.local_nome = ''
    }
  }

  enviarFoto() {
    this.load.present()
    let array_aux: any = []
    if(this.segment == 0){
      array_aux  = this.couvert
    }
    else{
      array_aux  = this.palco
    }

    let local_id;
    for (let i = 0; i < array_aux.length; i++) {
      if(this.local_nome == array_aux[i]["local_nome"]){
        local_id = array_aux[i]["local_id"]
      }
      break
    }

    console.log(local_id)
    if(this.segment == 0){

      return new Promise(resolve => {
        let dados = {
          requisicao: 'foto_insert_couvert',
          foto_img: this.photo,
          foto_legenda: this.descricao,
          data_atual: this.data_atual,
          foto_sit: 0,
          fk_token: this.token_id,
          fk_estabe: local_id,
        };
  
        this.provider.dadosApi(dados, 'api.php').subscribe(data => {
          if (data['id'] != '0') {
            this.toast.presentToast('Enviado! Será publicada em alguns instantes', 'success');
          }
          else{
            this.toast.presentToast('Erro! Tente novamente mais tarde', 'danger');
          }
          this.load.dismiss()
          this.photo = ''
          this.descricao = ''
          local_id = ''
          this.fotoRota()
          resolve(true);
        });
      });
    }

    if(this.segment == 1){
      console.log("segmente 1")

      return new Promise(resolve => {
        let dados = {
          requisicao: 'foto_insert_show',
          foto_img: this.photo,
          foto_legenda: this.descricao,
          data_atual: this.data_atual,
          foto_sit: 0,
          fk_token: this.token_id,
          fk_palco: local_id,
        };
  
        this.provider.dadosApi(dados, 'api.php').subscribe(data => {
  
          if (data['id'] != '0') {
            this.toast.presentToast('Enviado! Será publicada em alguns instantes', 'success');
          }
          else{
            this.toast.presentToast('Erro! Tente novamente mais tarde', 'danger');
          } 
          this.load.dismiss()
          this.photo = ''
          this.descricao = ''
          local_id = ''
          this.fotoRota()
          resolve(true);
        });
      });
    }

  }

  carregarCouvert() {
    return new Promise(resolve => {
      this.couvert = [];
      let dados = {
        requisicao: 'couvert_apresentacao',
        data_atual: this.data_atual,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.couvert.push(i);
          }
        }
        console.log(this.couvert)
        this.verificaEvento();
        resolve(true);
      });
    });
  }

  carregarPalco() {
    return new Promise(resolve => {
      this.palco = [];
      let dados = {
        requisicao: 'palco_apresentacao',
        data_atual: this.data_atual,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.palco.push(i);
          }
        }
        this.verificaEvento()
        console.log(this.palco)
        resolve(true);
      });
    });
  }

  verificaEvento(){
    if(this.palco.length == 0 && this.couvert.length == 0){
      this.alert.presentAlert('Nenhum evento programado para hoje.');
      this.fotoRota();
    }
  }

  ngOnInit(){
    this.carregarPalco();
    this.carregarCouvert();
  }

}
