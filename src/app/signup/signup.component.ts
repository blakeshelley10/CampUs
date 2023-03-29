import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Observable, of, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  errormessage:any;

  type: string = "password";
  public Firstname = ''
  public Lastname = ''
  public Email = ''
  public Username = ''
  public Passwordhash = ''

  missingField: boolean = false;

  isText: boolean = false;
  eyeIcon: string= "fa fa-eye";
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }

  constructor(
   private httpClient : HttpClient,
   private _router: Router
  ) {}

  ngOnInit(){
    this.fetchUsers;
  }
  onUsersFetch(){
    this.fetchUsers;
  }

  // adds a user with the given registered info
  addUser(){
    if(this.Firstname != "" && this.Lastname != "" && this.Email != "" && this.Passwordhash != "" && this.Username != "")
    {
      this.missingField = false;
      this.httpClient.post('/api/users/register', {
        "Firstname": this.Firstname,
        "Lastname": this.Lastname,
        "Email": this.Email,
        "Passwordhash": this.Passwordhash,
        "Username": this.Username})
        .pipe(map((res)=> {
          console.log("user registered successfully");
          this._router.navigateByUrl('/confirm-reg')
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

  deleteUser()
  {
    this.httpClient.delete('/api/users/testtest1').subscribe((res) => {console.log})
  }
    
  private fetchUsers(){
    //this.httpClient.get('/api/users',{observe: 'body', responseType: 'json'})
    // .pipe(map((res)=> {
    //   const users = [];
    //   for(const key in res)
    //   {
    //     if(res.hasOwnProperty(key)){
    //       users.push({...res[key], id: key})
    //     }
    //   }
    //   return users;
    // }))
    //.subscribe((res) => {console.log})
  }

  // handle 400 error
  private handleError(error: HttpErrorResponse) {
    let errormessage = '';
    if (error.status == 401) {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errormessage = "Username already taken. Try another one.";
    }
    else if (error.status == 402) {
      console.error(
        `Backend returned code ${error.status}, body was: , error.error`);
        errormessage = "Password does not meet the requirements. Please try again.";
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errormessage = "Unexpected error. Please try again.";
    }
    return throwError(() => new Error(errormessage));
  }
}