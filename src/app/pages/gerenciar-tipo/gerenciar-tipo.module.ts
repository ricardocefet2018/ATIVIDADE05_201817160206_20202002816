import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciarTipoPageRoutingModule } from './gerenciar-tipo-routing.module';

import { GerenciarTipoPage } from './gerenciar-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciarTipoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [GerenciarTipoPage],
})
export class GerenciarTipoPageModule {}
