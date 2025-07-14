import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {
  mode: 'login' | 'register' = 'login';
  title = 'Se connecter';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.mode = data['mode'] ?? 'login';
      this.title = this.mode === 'register' ? 'Inscription' : 'Se connecter';
    });
  }
}
