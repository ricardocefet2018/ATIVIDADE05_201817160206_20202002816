import { Component, OnInit } from '@angular/core';
import { Conta } from 'src/app/models/conta';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
})
export class ContasPage implements OnInit {
  contas: Conta[];
  situacaoConta: boolean;

  constructor(
    private contaService: ContaService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    let json = await this.contaService.listar();
    this.contas = <Conta[]>json.map((conta) => {
      let data = new Date(conta.data);
      let dia =
        data.getDate() < 10
          ? '0' + data.getDate().toString()
          : data.getDate().toString();
      let mes =
        data.getMonth() + 1 < 10
          ? '0' + (data.getMonth() + 1).toString()
          : (data.getMonth() + 1).toString();
      let ano =
        data.getFullYear() < 10
          ? '0' + data.getFullYear().toString()
          : data.getFullYear().toString();
      conta.data = `${dia}/${mes}/${ano}`;
      return conta;
    });

    this.fecharLoader();
  }

  exibirLoader() {
    this.loadingController
      .create({
        message: 'Carregando...',
      })
      .then((res) => {
        res.present();
      });
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController
        .dismiss()
        .then()
        .catch((err) => {
          console.log('Erro: ', err);
        });
    }, 100);
  }

  async excluir(id: number) {
    let json = await this.contaService.getById(id);
    const conta = <Conta>json;
    this.confirmarExclusao(conta);
  }

  async confirmarExclusao(conta: Conta) {
    this.alertController
      .create({
        header: 'Confirma a exclusão?',
        message: conta.descricao,
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Confirmar',
            cssClass: 'danger',
            handler: () => {
              this.contaService
                .delete(conta.id)
                .then(() => {
                  this.carregarLista();
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

  async exibirMensagem(msg: string) {
    this.toastController
      .create({
        message: msg,
        duration: 1500,
      })
      .then((toast) => {
        toast.present();
      });
  }
}
