import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BaseClass } from 'src/app/models/baseClass';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage extends BaseClass implements OnInit {
  edit = false;
  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.min(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  constructor(
    protected router: Router,
    protected loadingController: LoadingController,
    protected alertController: AlertController,
    protected toastController: ToastController,
    private usuarioService: UsuarioService
  ) {
    super(router, loadingController, alertController, toastController);
  }

  ngOnInit() {
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['/menu']);
    } else {
      this.exibirLoader();
      console.log('onInit');
      this.usuarioService
        .getUserById(Number(localStorage.getItem('userId')))
        .then((json) => {
          const usuario = <Usuario>json;
          if (usuario) {
            this.cadastroForm.setValue({
              email: usuario.email,
              nome: usuario.nome,
              senha: usuario.senha,
            });
            this.cadastroForm.get('email').disable();
            this.edit = true;
            this.fecharLoader();
          }
        });
    }
  }

  submitForm() {
    if (this.cadastroForm.valid) {
      this.usuarioService
        .cadastro(this.cadastroForm.getRawValue())
        .then((user) => {
          if (user.id) {
            if (this.edit) {
              this.router.navigate(['/menu']);
            } else {
              this.router.navigate(['/login']);
            }
          }
        });
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
