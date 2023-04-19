import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Observable, of, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public Searchword = ''
  errormessage:any;
  constructor(
    private httpClient : HttpClient,
    private _router: Router
   ) {}
  ngOnInit(): void {
    
  }

SearchEvents(){
  // search events for keyword
  // Change this to potentially be searching by selection instead of keyword
  if(this.Searchword != "")
    this.httpClient.post('/api/events/search', {
      "Identification": this.Searchword,
      "Name": this.Searchword,
      "Date": this.Searchword,
      "Time": this.Searchword,
      "Location": this.Searchword,
      "Interests": this.Searchword,
      "ProfilePicturePath": this.Searchword}).pipe(map((res)=> {
        console.log("search complete");
      }),
      catchError(this.handleError)
      )
      .subscribe((res) => {console.log(res)},(error)=>{
        this.errormessage = error;
      })
    {

    }
}
  

private handleError(error: HttpErrorResponse) {
  let errormessage = '';
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
      errormessage = `Unexpected error. Please try again.`;
  return throwError(() => new Error(errormessage));
}

}