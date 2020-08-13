import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/services/post';
import { Router } from '@angular/router';
import { LoadComponent } from 'src/app/components/load/load.component';

@Component({
  selector: 'app-detalhado',
  templateUrl: './detalhado.page.html',
  styleUrls: ['./detalhado.page.scss'],
})
export class DetalhadoPage implements OnInit {

  data = localStorage.getItem('data').toUpperCase();

  resultado = []

  constructor(private provider: Post, private router: Router, private load: LoadComponent) { }

  agenda() {
    this.router.navigate(["/agenda"]);
  }

  //realizar consulta das informações do cantor
  carregarCantor() {
    this.load.present();
    return new Promise(resolve => {
      this.resultado = [];
      let dados = {
        requisicao: 'cantores_detalhados',
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
          this.load.dismiss();
          console.log(this.resultado);
        }
        this.load.dismiss();
        resolve(true);
      });
    });

  }

  ngOnInit() {
    this.carregarCantor();
  }

}
