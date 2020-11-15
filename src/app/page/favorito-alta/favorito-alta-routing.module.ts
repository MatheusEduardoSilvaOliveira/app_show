import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritoAltaPage } from './favorito-alta.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritoAltaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritoAltaPageRoutingModule {}
