import {AppComponent} from './app.component';
import {AuthFormComponent} from './shared/auth/auth-form/auth-form.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {NgModule} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { Articles_listComponent } from './pages/articles/list/articles_list.component';
import {MatCardModule} from "@angular/material/card";
import { DetailsComponent } from './pages/articles/details/details.component';
import { NewComponent } from './pages/articles/new/new.component';
import {MatSelectModule} from "@angular/material/select";
import { ProfileComponent } from './pages/user/profile/profile.component';
import {Themes_ListComponent} from './pages/themes/list/themes_list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthFormComponent,
    AuthComponent,
    Articles_listComponent,
    DetailsComponent,
    NewComponent,
    ProfileComponent,
    Themes_ListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    AuthFormComponent
  ]
})

export class AppModule {
}
