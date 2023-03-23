import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  type: string = "password";
  public Username = ''
  public Passwordhash = ''
  
  isText: boolean = false;
  eyeIcon: string= "fa fa-eye";

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }

  constructor(
    private httpClient : HttpClient,
    private _router: Router
  ) {}

  private checkUser(){
    // confirm if valid user
    
    if(this.Username != "" && this.Passwordhash != "") {
      // request type?
      //this.httpClient.post('/api/users', {
      //  "Passwordhash": this.Passwordhash,
      //  "Username": this.Username})
      //  .subscribe((res) => {console.log(res)} )
    }
    else{

    }
  }
}
