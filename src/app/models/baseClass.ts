import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

export class BaseClass {
  constructor(
    protected router: Router,
    protected loadingController: LoadingController,
    protected alertController: AlertController,
    protected toastController: ToastController
  ) {}

  checkLogin() {
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['/login']);
    }
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
    }, 50);
  }

  async exibirMensagem(msg: string, wanring = false) {
    this.toastController
      .create({
        message: msg,
        duration: 1500,
        color: wanring ? 'warning' : 'primary',
      })
      .then((toast) => {
        toast.present();
      });
  }
}
