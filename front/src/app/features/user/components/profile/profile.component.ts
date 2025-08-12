import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ThemeService} from '../../../themes/services/theme.service';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/models/User.model';
import {UpdateUserRequest} from '../../interfaces/api/updateUserRequest.interface';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, AfterViewInit {
  user: User | null = null;
  profileForm: FormGroup;
  error = '';
  successMessage = '';

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngAfterViewInit(): void {
    this.forcePasswordFieldEmpty();
  }

  onPasswordFocus(): void {
    this.profileForm.patchValue({ password: '' });
    this.forcePasswordFieldEmpty();
  }

  loadUserProfile(): void {
    this.userService.getAuthenticatedMe().subscribe({
      next: (userData) => {
        this.user = userData;
        this.profileForm.patchValue({
          username: userData.username,
          email: userData.email,
          password: ''
        });
        this.forcePasswordFieldEmpty();
      }
    });
  }

  onSubmit(): void {
    this.clearMessages();

    if (this.profileForm.valid) {
      this.updateProfile();
    } else {
      this.markFormGroupTouched();
    }
  }

  updateProfile(): void {
    if (!this.profileForm.valid) {
      return;
    }

    const formValue = this.profileForm.value;
    const updateData: UpdateUserRequest = {
      username: formValue.username.trim(),
      email: formValue.email.trim()
    };

    const passwordValue = formValue.password?.trim();
    if (passwordValue && passwordValue.length > 0) {
      updateData.password = passwordValue;
    }

    this.userService.updateProfile(updateData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;

        this.profileForm.patchValue({
          username: updatedUser.username,
          email: updatedUser.email,
          password: ''
        });

        this.successMessage = 'Profil mis à jour avec succès !';
        this.forcePasswordFieldEmpty();
      },
      error: (err) => {
        this.handleUpdateError(err);
      }
    });
  }

  private handleUpdateError(error: HttpErrorResponse): void {
    if (error.status === 409) {
      this.error = error.error?.message;
    } else if (error.status === 400) {
      this.error = error.error?.message || 'Données invalides. Veuillez vérifier les champs.';
    } else if (error.status === 401) {
      this.error = 'Session expirée. Veuillez vous reconnecter.';
    } else {
      this.error = 'Une erreur est survenue lors de la mise à jour. Veuillez réessayer.';
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  get usernameError(): string {
    const control = this.profileForm.get('username');
    if (control?.errors && control?.touched && control.errors['required']) {
        return 'Le nom d\'utilisateur est requis';
    }

    return '';
  }

  get emailError(): string {
    const control = this.profileForm.get('email');
    if (control?.errors && control?.touched) {
      if (control.errors['required']) {
        return 'L\'email est requis';
      }

      if (control.errors['email']) {
        return 'L\'email doit être valide';
      }
    }
    return '';
  }

  unsubscribeFromTheme(themeId: number): void {
    if (!this.user) {
      return;
    }

    this.themeService.unsubscribeFromTheme(themeId).subscribe({
      next: () => {
        if (this.user && this.user.themes) {
          this.user.themes = this.user.themes.filter(theme => theme.id !== themeId);
        }
      }
    });
  }

  private forcePasswordFieldEmpty(): void {
    const passwordField = document.querySelector('input[formControlName="password"]') as HTMLInputElement;
    if (passwordField) {
      passwordField.value = '';
      this.profileForm.get('password')?.setValue('');
    }
  }

  private clearMessages(): void {
    this.error = '';
    this.successMessage = '';
  }
}
