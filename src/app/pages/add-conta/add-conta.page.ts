import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { BaseClass } from 'src/app/models/baseClass';
import { Conta } from 'src/app/models/conta';
import { Tipo } from 'src/app/models/tipo';
import { ContaService } from 'src/app/services/conta.service';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-add-conta',
  templateUrl: './add-conta.page.html',
  styleUrls: ['./add-conta.page.scss'],
})
export class AddContaPage extends BaseClass implements OnInit {
  formGroup: FormGroup;
  tipos: Tipo[];
  conta: Conta;
  descricaoUnica: boolean;

  constructor(
    protected router: Router,
    protected loadingController: LoadingController,
    protected alertController: AlertController,
    protected toastController: ToastController,
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private tipoService: TipoService
  ) {
    super(router, loadingController, alertController, toastController);
    this.formGroup = this.formBuilder.group({
      data: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      valor: ['', [Validators.required, Validators.min(1)]],
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      situacao: [true],
    });
  }

  ngOnInit() {
    this.descricaoUnica = false;
    this.conta = new Conta();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tipoService.list().then((tipos) => {
      this.tipos = <Tipo[]>tipos;
      if (id != null) {
        this.exibirLoader();
        this.contaService
          .getById(parseInt(id))
          .then((json) => {
            this.conta = <Conta>json;

            let data = new Date(this.conta.data);
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

            this.formGroup.get('descricao').setValue(this.conta.descricao);
            this.formGroup.get('valor').setValue(this.conta.valor);
            this.formGroup.get('data').setValue(`${dia}/${mes}/${ano}`);
            this.formGroup.get('tipo').setValue(this.conta.tipo.id);
            this.formGroup
              .get('situacao')
              .setValue(this.conta.situacao.toString());
            this.fecharLoader();
          })
          .catch((err) => {
            console.log(err);

            this.exibirMensagem('Erro ao buscar conta', true);
            this.fecharLoader();
          });
      }
    });
  }

  async submitForm() {
    this.conta.descricao = this.formGroup.value.descricao;
    this.conta.valor = this.formGroup.value.valor;
    this.conta.data = new Date(this.formGroup.value.data).toISOString();
    this.conta.tipo = (await this.tipoService.buscarPorId(
      this.formGroup.value.tipo
    )) as Tipo;
    this.conta.situacao =
      this.formGroup.value.situacao == 'true' ? true : false;

    if (this.descricaoUnica == true) {
      this.exibirMensagem('Descrição já existente');
    } else {
      this.contaService
        .salvar(this.conta)
        .then(() => {
          this.exibirMensagem('Conta cadastrada com sucesso!');
          this.navController.navigateBack('/contas');
        })
        .catch((err) => {
          console.log(err);
          this.exibirMensagem('Erro ao cadastrar conta', true);
        });
    }
  }

  async verificarDescricao() {
    this.contaService
      .isExists(this.formGroup.value.descricao)
      .then((json) => {
        if (json) {
          this.descricaoUnica = true;
        } else {
          this.descricaoUnica = false;
        }
      })
      .catch((err) => {
        this.exibirMensagem(
          'Erro ao verificar a descrição da conta: ' + err.message
        );
      });
  }
}
