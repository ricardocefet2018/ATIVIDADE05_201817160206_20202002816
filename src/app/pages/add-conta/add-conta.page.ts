import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Conta } from 'src/app/models/conta';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-add-conta',
  templateUrl: './add-conta.page.html',
  styleUrls: ['./add-conta.page.scss'],
})
export class AddContaPage implements OnInit {
  formGroup: FormGroup;
  conta: Conta;
  descricaoUnica: boolean;

  constructor(private formBuilder: FormBuilder, private contaService: ContaService, private toastController: ToastController, private navController: NavController,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({
      data: ['',
          [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]],
      valor: ['',
          Validators.compose([
          Validators.required,
          Validators.minLength(3),
        
        ]),
      ],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.descricaoUnica = false;

    this.conta = new Conta();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.contaService.getById(parseInt(id)).then((json) => {
        this.conta = <Conta>json;

        this.formGroup.get('descricao').setValue(this.conta.descricao);
        this.formGroup.get('valor').setValue(this.conta.valor);
        this.formGroup.get('data').setValue(this.conta.data);
        this.formGroup.get('tipo').setValue(this.conta.tipo);
        this.formGroup.get('situacao').setValue(this.conta.situacao);
      });
    }
  }

  async submitForm() {
    this.conta.descricao = this.formGroup.value.descricao;
    this.conta.valor = this.formGroup.value.valor;
    this.conta.data = this.formGroup.value.data;
    this.conta.tipo = this.formGroup.value.tipo;
    this.conta.situacao = this.formGroup.value.situacao;

    if(this.descricaoUnica == true){
      this.exibirMensagem('Descrição já existente');
    }else{
      this.contaService
      .salvar(this.conta)
      .then(() => {
        this.exibirMensagem('Conta cadastrada com sucesso!');
        this.navController.navigateBack('/conta');
      })
      .catch((err) => {
        this.exibirMensagem('Erro ao cadastrar conta: ' + err.message);
      });
    }
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

  async verificarDescricao() {
    this.contaService.isExists(this.formGroup.value.descricao)
      .then((json) => {
        if (json) {
          this.descricaoUnica = true;
        } else {
          this.descricaoUnica = false;          
        }
      })
      .catch((err) => {
        this.exibirMensagem('Erro ao verificar a descrição da conta: ' + err.message);
      });

  }


}
