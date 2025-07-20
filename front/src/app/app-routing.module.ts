import {Articles_listComponent} from "./pages/articles/list/articles_list.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {DetailsComponent} from "./pages/articles/details/details.component";
import {HomeComponent} from './pages/home/home.component';
import {NewComponent} from "./pages/articles/new/new.component";
import {NgModule} from '@angular/core';
import {ProfileComponent} from "./pages/user/profile/profile.component";
import {RouterModule, Routes} from '@angular/router';
import {Themes_ListComponent} from "./pages/themes/list/themes_list.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', title: 'Connexion', component: AuthComponent, data: {mode: 'login'}},
  {path: 'register', title: 'Inscription', component: AuthComponent, data: {mode: 'register'}},
  {path: 'articles', title: 'Liste des articles', component: Articles_listComponent},
  {path: 'themes', title: 'Liste des thèmes', component: Themes_ListComponent},
  {path: 'articles/details/:id', title: 'Détails de l\'article', component: DetailsComponent},
  {path: 'articles/new', title: 'Création d\'un article', component: NewComponent},
  {path: 'profile', title: 'Profil de l\'utilisateur', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
