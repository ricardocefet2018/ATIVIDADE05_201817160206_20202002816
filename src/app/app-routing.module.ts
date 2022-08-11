import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tipos',
    loadChildren: () => import('./pages/tipos/tipos.module').then( m => m.TiposPageModule)
  },
  {
    path: 'gerenciar-tipo',
    loadChildren: () => import('./pages/gerenciar-tipo/gerenciar-tipo.module').then( m => m.GerenciarTipoPageModule)
  },
  {
    path: 'contas',
    loadChildren: () => import('./pages/contas/contas.module').then( m => m.ContasPageModule)
  },
  {
    path: 'gerenciar-conta',
    loadChildren: () => import('./pages/gerenciar-conta/gerenciar-conta.module').then( m => m.GerenciarContaPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
