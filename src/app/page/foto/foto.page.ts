import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/services/post';
import { IonSlides } from '@ionic/angular';
import { LoadComponent } from 'src/app/components/load/load.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit{
  @ViewChild('mySlider') slider: IonSlides;

  sliderConfigFotos= {
    //spaceBetween: -10,
    centeredSlides: true,
    //slidesPerView: 1.2
  }

  fotos: any = []

  constructor(private router: Router, private provider: Post, private load: LoadComponent) { }

  slidesDidLoad(slides: IonSlides) { // iniciar o play automatico do slide apenas quando preenchida tabela
    if (this.fotos.length > 1) {
      slides.startAutoplay();
    }
  }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  fotoCriar(){
    this.router.navigate(['/foto-criar']);
  }

  consultaFoto() {
    this.load.present()
    return new Promise(resolve => {
      let dados = {
        requisicao: 'foto_consulta',
        data_atual: localStorage.getItem('data_atual'),
      };
      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        console.log(data["result"])
        if(data["result"] == '0'){
          console.log('Array vazio')
        }
        else{
          for (let i of data['result']) {
            this.fotos.push(i);
          }
        }
        this.load.dismiss()
      });
      resolve(true);
    });
  }

  ngOnInit(){
    this.consultaFoto();
  }

}
