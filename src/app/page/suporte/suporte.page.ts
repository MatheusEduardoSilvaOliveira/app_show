import { Component, OnInit } from '@angular/core';
import { LoadComponent } from 'src/app/components/load/load.component';
import { Post } from 'src/app/services/post';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage implements OnInit {

  segment = '0'

  nome = '';
  contato = '';
  desc = '';
  data = localStorage.getItem('data_atual');

  constructor(private router: Router, private provider: Post, private load: LoadComponent, private toast: ToastComponent) { }

  zerarVariveis(){
    this.nome = '';
    this.contato = '';
    this.desc = '';
  }

  home(){
    this.router.navigate(['/home']);
  }

  validarCadastro(){
    if(this.nome == undefined || this.contato == undefined || this.desc == undefined){
      this.toast.presentToast('Verificar se todo o formulário foi preenchido.', 'danger'); //mensagem e cor
    }
    else if(this.nome == null || this.contato == null || this.desc == null){
      this.toast.presentToast('Verificar se todo o formulário foi preenchido.', 'danger'); //mensagem e cor
    }
    else if(this.nome == '' || this.contato == '' || this.desc == ''){
      this.toast.presentToast('Verificar se todo o formulário foi preenchido.', 'danger'); //mensagem e cor
    }
    else if(this.desc.length < 14){
      this.toast.presentToast('Assunto digitado muito curto.', 'warning'); //mensagem e cor
    }
    else{
      this.cadastrarChamado();
    }
  }

  cadastrarChamado() {
    this.load.present();
    return new Promise(resolve => {
      let dados = {
        requisicao: 'chamado_create',
        nome: this.nome,
        contato: this.contato,
        desc: this.desc,
        sit: '1',
        data: this.data
      };
      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        if (data['result'] == '0') {
          this.toast.presentToast('Erro! Entre em contato com o administrador.', 'danger'); //mensagem e cor
        } else {
          this.toast.presentToast('Enviado! Em breve entraremos em contato.', 'success'); //mensagem e cor
        }
        this.load.dismiss();
      });
      this.zerarVariveis();
      resolve(true);
      this.home();
    });

  }

  ngOnInit() {
  }

}
