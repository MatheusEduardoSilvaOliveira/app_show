import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalhado',
  templateUrl: './detalhado.page.html',
  styleUrls: ['./detalhado.page.scss'],
})
export class DetalhadoPage implements OnInit {

  resultado = []

  constructor(private provider: Post, private router: Router, public loadingController: LoadingController) { }

  agenda() {
    this.router.navigate(["/agenda"]);
  }

  //realizar consulta das informações do cantor
  carregar_cantor() {
    return new Promise(resolve => {
      this.resultado = [];
      let dados = {
        requisicao: 'cantor_detalhado',
        data: localStorage.getItem('data'),
        palco: localStorage.getItem('palco')
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {

        if (data['result'] == '0') {
          console.log("Array retornou vazio");
        } else {
          for (let i of data['result']) {
            this.resultado.push(i);
          }
          console.log(this.resultado);
        }
        resolve(true);
      });
    });

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Conectando...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
    this.presentLoading();
    this.carregar_cantor();
  }

}
