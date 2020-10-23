import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-divulgacao',
  templateUrl: './divulgacao.page.html',
  styleUrls: ['./divulgacao.page.scss'],
})
export class DivulgacaoPage implements OnInit {

  constructor(private router: Router) { }

  suporte(){
    this.router.navigate(['/suporte']);
  }

  ngOnInit() {
  }

}
