import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmRegComponent } from './confirm-reg/confirm-reg.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent},
<<<<<<< Updated upstream
  {path:'confirm-reg', component: ConfirmRegComponent}
=======
  {path:'confirm-reg', component: ConfirmRegComponent},
  {path:'profile', component: ProfileComponent},
  {path:'newpost', component: NewpostComponent},
  {path:'search', component: SearchComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
