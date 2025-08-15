import {AuthService} from '../../../auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/articles']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';

      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;

          if (error.status === 409 && error?.error?.message) {
            this.error = error.error.message;
          } else if (error.status === 400 && error.error?.details?.password) {
            this.error = error.error.details.password;
          } else {
            this.error = 'Une erreur s\'est produite lors de l\'inscription';
          }
        }
      });
    }
  }
}
