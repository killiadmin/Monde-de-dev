import {Articles_listComponent} from "./features/articles/components/list/articles_list.component";
import {AuthGuard} from "./auth/auth.guard";
import {Article_detailsComponent} from "./features/articles/components/details/article_details.component";
import {HomeComponent} from './features/home/components/home.component';
import {LoginComponent} from "./features/login/components/login.component";
import {NewComponent} from "./features/articles/components/new/new.component";
import {NgModule} from '@angular/core';
import {ProfileComponent} from "./features/user/components/profile/profile.component";
import {RegisterComponent} from "./features/register/components/register.component";
import {RouterModule, Routes} from '@angular/router';
import {Themes_listComponent} from "./features/themes/components/list/themes_list.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', title: 'Connexion', component: LoginComponent},
  {path: 'register', title: 'Inscription', component: RegisterComponent},
  {path: 'articles', title: 'Liste des articles', component: Articles_listComponent, canActivate: [AuthGuard]},
  {path: 'themes', title: 'Liste des thèmes', component: Themes_listComponent, canActivate: [AuthGuard]},
  {path: 'articles/details/:id', title: 'Détails de l\'article', component: Article_detailsComponent, canActivate: [AuthGuard]},
  {path: 'articles/new', title: 'Création d\'un article', component: NewComponent, canActivate: [AuthGuard]},
  {path: 'profil', title: 'Profil de l\'utilisateur', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
