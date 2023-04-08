import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmRegComponent } from './confirm-reg/confirm-reg.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
=======
import { NewpostComponent } from './newpost/newpost.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
>>>>>>> 3a6184e7 (create post and login/logout)

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent},
  {path:'confirm-reg', component: ConfirmRegComponent},
<<<<<<< HEAD
  {path:'profile', component: ProfileComponent}
=======
  {path:'profile', component: ProfileComponent},
  {path:'newpost', component: NewpostComponent}
>>>>>>> 3a6184e7 (create post and login/logout)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
