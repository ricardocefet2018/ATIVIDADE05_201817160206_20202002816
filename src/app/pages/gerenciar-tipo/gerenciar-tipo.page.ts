import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BaseClass } from 'src/app/models/baseClass';
import { Tipo } from 'src/app/models/tipo';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-gerenciar-tipo',
  templateUrl: './gerenciar-tipo.page.html',
  styleUrls: ['./gerenciar-tipo.page.scss'],
})
export class GerenciarTipoPage extends BaseClass implements OnInit {
  title: String;
  tipoForm = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  tipo: Tipo = new Tipo();

  constructor(
    protected router: Router,
    protected loadingController: LoadingController,
    protected alertController: AlertController,
    protected toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private tipoService: TipoService
  ) {
    super(router, loadingController, alertController, toastController);
    this.title = activatedRoute.snapshot.paramMap.get('id')
      ? 'Editar tipo'
      : 'Cadastrar tipo';
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.exibirLoader();
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.tipoService
        .buscarPorId(id)
        .then((json) => {
          this.tipo = <Tipo>json;
          this.tipoForm.get('descricao').setValue(this.tipo.descricao);
          this.fecharLoader();
        })
        .catch((err) => {
          this.tipoForm.disable();
          this.fecharLoader();
          console.log(err);
          this.exibirMensagem('Houve um erro ao buscar esse tipo!', true);
        });
    }
  }

  submitForm() {
    this.tipoService
      .isExist(this.tipoForm.get('descricao').value)
      .then((isExists) => {
        if (isExists) {
          this.tipoForm.get('descricao').setErrors({ isExists: true });
        } else {
          this.tipoForm.get('descricao').setErrors({ isExists: false });
          this.tipo.descricao = this.tipoForm.get('descricao').value;
          this.tipoService.salvar(this.tipo).then(() => {
            this.exibirMensagem('Tipo salvo com sucesso!');
            this.router.navigate(['../tipos']);
          });
        }
      });
  }
}
