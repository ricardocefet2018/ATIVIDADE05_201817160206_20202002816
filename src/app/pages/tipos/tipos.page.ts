import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BaseClass } from 'src/app/models/baseClass';
import { Tipo } from 'src/app/models/tipo';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.page.html',
  styleUrls: ['./tipos.page.scss'],
})
export class TiposPage extends BaseClass implements OnInit {
  tipos: Tipo[];

  constructor(
    protected router: Router,
    protected loadingController: LoadingController,
    protected alertController: AlertController,
    protected toastController: ToastController,
    private tipoService: TipoService
  ) {
    super(router, loadingController, alertController, toastController);
  }

  ngOnInit() {
    this.checkLogin();
  }

  async ionViewWillEnter() {
    this.atulizarTipos();
  }

  async atulizarTipos() {
    this.exibirLoader();
    this.tipoService
      .list()
      .then((tiposList) => {
        this.tipos = tiposList as Tipo[];
      })
      .catch((err) => {
        console.log(err);
        this.exibirMensagem('Houve um erro ao atualizar a lista.', true);
      })
      .finally(() => {
        this.fecharLoader();
      });
  }

  async excluirTipo(id: number) {
    this.tipoService.buscarPorId(id).then((json) => {
      const tipo = <Tipo>json;
      this.confirmarExclusao(tipo);
    });
  }

  async confirmarExclusao(tipo: Tipo) {
    this.alertController
      .create({
        header: 'Confirma a exclusão?',
        message: tipo.descricao,
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Confirmar',
            cssClass: 'danger',
            handler: () => {
              this.tipoService
                .excluir(tipo.id)
                .then(() => {
                  this.atulizarTipos();
                  this.exibirMensagem('Registro excluído com sucesso!');
                })
                .catch((err) => {
                  this.exibirMensagem('Erro ao excluir registro');
                });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
