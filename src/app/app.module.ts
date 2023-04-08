import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmRegComponent } from './confirm-reg/confirm-reg.component';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
=======
import { NewpostComponent } from './newpost/newpost.component';

>>>>>>> 3a6184e7 (create post and login/logout)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ConfirmRegComponent,
<<<<<<< HEAD
    ProfileComponent
=======
    ProfileComponent,
    NewpostComponent
>>>>>>> 3a6184e7 (create post and login/logout)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
