import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ThemeService} from '../../../themes/services/theme.service';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  error = '';

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.error = '';

    this.userService.getAuthenticatedMe().subscribe({
      next: (userData) => {
        this.user = userData;

        this.profileForm.patchValue({
          username: userData.username,
          email: userData.email
        });
      }
    });
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
}
