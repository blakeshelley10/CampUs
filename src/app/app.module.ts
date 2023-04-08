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
import { NewpostComponent } from './newpost/newpost.component';

=======
<<<<<<< Updated upstream
=======
import { NewpostComponent } from './newpost/newpost.component';


>>>>>>> Stashed changes
>>>>>>> main

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ConfirmRegComponent,
<<<<<<< HEAD
    ProfileComponent,
    NewpostComponent
=======
<<<<<<< Updated upstream
    ProfileComponent
=======
    ProfileComponent,
    NewpostComponent
>>>>>>> Stashed changes
>>>>>>> main
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
