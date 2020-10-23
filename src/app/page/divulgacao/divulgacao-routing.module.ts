import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivulgacaoPage } from './divulgacao.page';

const routes: Routes = [
  {
    path: '',
    component: DivulgacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivulgacaoPageRoutingModule {}
