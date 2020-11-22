import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'suporte',
    loadChildren: () => import('../app/page/suporte/suporte.module').then( m => m.SuportePageModule)
  },
  {
    path: 'detalhado-couvert',
    loadChildren: () => import('../app/page/detalhado/detalhado-couvert/detalhado-couvert.module').then( m => m.DetalhadoCouvertPageModule)
  },
  {
    path: 'detalhado-evento',
    loadChildren: () => import('../app/page/detalhado/detalhado-evento/detalhado-evento.module').then( m => m.DetalhadoEventoPageModule)
  },
  {
    path: 'favorito-alta',
    loadChildren: () => import('./page/favorito-alta/favorito-alta.module').then( m => m.FavoritoAltaPageModule)
  },  {
    path: 'foto-criar',
    loadChildren: () => import('./page/foto-criar/foto-criar.module').then( m => m.FotoCriarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
