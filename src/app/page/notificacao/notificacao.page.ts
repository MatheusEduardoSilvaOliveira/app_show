import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.page.html',
  styleUrls: ['./notificacao.page.scss'],
})
export class NotificacaoPage implements OnInit {
  
  constructor(private router: Router, private photoViewer: PhotoViewer) { }

  visualizarImagem(){
    this.photoViewer.show('https://instagram.fcpv11-1.fna.fbcdn.net/v/t51.2885-15/e35/116423535_288846182346871_6804898047966358056_n.jpg?_nc_ht=instagram.fcpv11-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=YzwbUnBnA3wAX8-TNMm&tp=18&oh=75699a85c755e80022cc4129fcd562cd&oe=5FDC1FF0');
  }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  ngOnInit() {
  }

}
