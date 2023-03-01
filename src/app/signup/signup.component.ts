import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  type: string = "password";
  public First_Name = '';
  public Last_Name = '';
  public Email = '';
  public Password = '';
  public Username = '';


  isText: boolean = false;
  eyeIcon: string= "fa fa-eye";

  hideShowPass(){

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }

  async addUser(){
    
  }
}


