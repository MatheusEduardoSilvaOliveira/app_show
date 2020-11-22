import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotoCriarPage } from './foto-criar.page';

const routes: Routes = [
  {
    path: '',
    component: FotoCriarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotoCriarPageRoutingModule {}
