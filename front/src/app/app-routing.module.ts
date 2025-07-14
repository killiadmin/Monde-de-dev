import {AuthComponent} from "./pages/auth/auth.component";
import {HomeComponent} from './pages/home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AuthComponent, data: {mode: 'login'}},
  {path: 'register', component: AuthComponent, data: {mode: 'register'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
