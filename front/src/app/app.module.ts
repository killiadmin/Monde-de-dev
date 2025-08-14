import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Articles_listComponent} from './features/articles/components/list/articles_list.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Article_detailsComponent} from './features/articles/components/details/article_details.component';
import {HomeComponent} from './features/home/components/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './features/login/components/login.component';
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
import {NewComponent} from './features/articles/components/new/new.component';
import {MatSelectModule} from "@angular/material/select";
import {ProfileComponent} from './features/user/components/profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './features/register/components/register.component';
import {Themes_listComponent} from './features/themes/components/list/themes_list.component';
import {TokenInterceptor} from './auth/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    Articles_listComponent,
    Article_detailsComponent,
    NewComponent,
    ProfileComponent,
    Themes_listComponent,
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
