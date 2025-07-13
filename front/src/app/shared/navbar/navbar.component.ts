import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  logoPath = 'assets/logo_p6.png';

  showNavbar = true;
  showNavLinks = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;

      this.showNavbar = currentUrl !== '/';
      this.showNavLinks = currentUrl !== '/login' && currentUrl !== '/register';
    });
  }
}
