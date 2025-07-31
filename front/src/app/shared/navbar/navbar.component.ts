import { AuthService } from "../../auth/auth.service";
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;

      this.showNavLinks = currentUrl !== '/login' && currentUrl !== '/register';

      if (this.showNavLinks) {
        this.showNavbar = currentUrl !== '/';
      } else {
        this.showNavbar = this._isDesktop() && currentUrl !== '/';
      }

      this.isMenuOpen = false;
    });
  }

  toggleMenu(): void {
    if (!this.showNavLinks) return;
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.auth.logout();
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  private _isDesktop(): boolean {
    return window.innerWidth > 768;
  }

  @HostListener('window:resize')
  onResize() {
    if (this._isDesktop() && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
