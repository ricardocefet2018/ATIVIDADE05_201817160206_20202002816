import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    senha: new FormControl('', Validators.required),
  });

  fail = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    console.log(this.loginForm);
    if (localStorage.getItem('userId')) {
      this.router.navigate(['/menu']);
    }
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.fail = false;
      this.usuarioService
        .login(
          this.loginForm.get('email').value,
          this.loginForm.get('senha').value
        )
        .then((user) => {
          if (user.id) {
            localStorage.setItem('userId', user.id.toString());
            this.router.navigate(['/menu']);
          } else {
            this.fail = true;
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
