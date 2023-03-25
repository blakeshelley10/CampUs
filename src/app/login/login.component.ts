import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Observable, of, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  errormessage:any;
  missingField: boolean = false;

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

  // always returns 500 error
  userLogin(){
    // confirm if valid user
    if(this.Username != "" && this.Passwordhash != "") {
      this.missingField = false;
      this.httpClient.post('/api/users/login', {
        "Username": this.Username,
        "Passwordhash": this.Passwordhash})
        .pipe(map((res)=> {
          console.log("user logged in successfully");
          this._router.navigateByUrl('/home')
        }),
        catchError(this.handleError)
        )
        .subscribe((res) => {console.log(res)},(error)=>{
          this.errormessage = error;
        })
    }
    else{
      this.missingField = true;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage = '';
    if (error.status == 500) {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = `Username or password is incorrect. Please try again.`;
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = `Unexpected error. Please try again.`;
    }
    return throwError(() => new Error(errormessage));
  }
}
