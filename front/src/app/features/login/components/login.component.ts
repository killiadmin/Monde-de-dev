import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  returnUrl = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    if (this.authService.isAuthenticated() && this.returnUrl) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: () => {
          this.loading = false;
          const target = this.returnUrl && this.returnUrl.startsWith('/') ? this.returnUrl : '/articles';
          this.router.navigate([target]);
        },
        error: (error) => {
          this.loading = false;

          if (error.status === 401) {
            this.error = error.error?.message;
          } else {
            this.error = 'Une erreur est survenue lors de la connexion de votre espace';
          }
        }
      });
    }
  }
}
