import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'detalhado-evento',
    loadChildren: () => import('./page/detalhado/detalhado-evento/detalhado-evento.module').then( m => m.DetalhadoEventoPageModule)
  },
  {
    path: 'detalhado-couvert',
    loadChildren: () => import('./page/detalhado/detalhado-couvert/detalhado-couvert.module').then( m => m.DetalhadoCouvertPageModule)
  },  {
    path: 'suporte',
    loadChildren: () => import('./page/suporte/suporte.module').then( m => m.SuportePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
