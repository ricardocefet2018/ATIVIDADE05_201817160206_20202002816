import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.min(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
  });

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {}

  submitForm() {
    if (this.cadastroForm.valid) {
      this.usuarioService
        .cadastro(this.cadastroForm.getRawValue())
        .then((user) => {
          if (user.id) {
            this.router.navigate(['/login']);
          }
        });
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
