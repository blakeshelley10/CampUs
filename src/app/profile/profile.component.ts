import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Observable, of, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errormessage:any;
  pfpurl = "";
  user = localStorage.getItem('currentUsername');
  public pfpFile = File;
  pfp_posted: boolean = false;
  
  constructor(
    private httpClient : HttpClient,
    private _router: Router
   ) {}

  ngOnInit(): void {
   
  }
  
  // ADD USERNAME CHECKING AND VERIFY IF THE CURRENT FILE SOLUTION WORKS
  pfpUpload(){
      if(this.pfpFile != null)
      {
        this.httpClient.post('/api/upload/profilepicture/' + this.user,{
          "Upload": this.pfpFile}).pipe(map((res)=> {
            console.log("pfp uploaded");
          }),
          catchError(this.handleError)
          )
          .subscribe((res) => {console.log(res)},(error)=>{
            this.errormessage = error;
          })
        {
        }
      }
      document.getElementById("demo").innerHTML = "New Picture Submitted";
  }


  private handleError(error: HttpErrorResponse) {
    let errormessage = '';
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = `Unexpected error. Please try again.`;
    return throwError(() => new Error(errormessage));
  }
}
