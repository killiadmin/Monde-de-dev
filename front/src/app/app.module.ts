import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Articles_listComponent} from './features/articles/components/articles-list/articles_list.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DetailsComponent} from './pages/articles/details/details.component';
import {HomeComponent} from './pages/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'; // Ajout HttpClientModule
import {LoginComponent} from './pages/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NavbarComponent} from './shared/navbar/navbar.component';
import {NgModule} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {NewComponent} from './pages/articles/new/new.component';
import {MatSelectModule} from "@angular/material/select";
import {ProfileComponent} from './pages/user/profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './pages/register/register.component';
import {Themes_ListComponent} from './pages/themes/list/themes_list.component';
import {TokenInterceptor} from './auth/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    Articles_listComponent,
    DetailsComponent,
    NewComponent,
    ProfileComponent,
    Themes_ListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: []
})

export class AppModule {
}
