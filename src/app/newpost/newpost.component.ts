import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Observable, of, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

/*
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
*/
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  unitTest = 1;
  loggedIn: boolean = false;
  selectedImageFile: File;
  errormessage:any;
  missingField: boolean = false;

  public EventName = ''
  public EventDate = ''
  public EventTime = ''
  public EventLocation = ''
  public EventInterest = ''

  constructor(
    private httpClient : HttpClient,
    private _router: Router
   ) {}

   ngOnInit() {
    // if (localStorage.getItem("currentUsername") == null) {
    //   this._router.navigateByUrl('/home')
    // } else {
    //   this.loggedIn = true;
    // }
   }
   onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    )
  }

  parseEventDate(string) {
    let date: string = this.EventDate.toString().substring(0,7)
    let day: string = this.EventDate.toString().substring(8,10)
    let suffix: string = this.EventDate.toString().substring(9,10)
    let year: string = this.EventDate.toString().substring(11,15)
    
    if (day == '11' || day == '12' || day == '13') {
      suffix = 'th';
    }
    else {
      switch (suffix) {
        case '1':
          suffix = 'st';
          break;
        case '2':
          suffix = 'nd';
          break;
        case '3':
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
          break;
      }
    }
    this.EventDate = date + ' ' + day + suffix + ' ' + year;
    console.log(this.EventDate);
  }

  createPost() {
    if(this.EventName != "" && this.EventDate != "" && this.EventTime != "" && this.EventLocation != "" && this.EventInterest != "") {
      this.missingField = false;
      this.httpClient.post('api/events', {
        "Name": this.EventName,
        "Date": this.EventDate,
        "Time": this.EventTime,
        "Location": this.EventLocation,
        "Interests": this.EventInterest})
        .pipe(map((res)=> {
          console.log(res);
          window.location.reload();
        }),
        catchError(this.handleError)
        )
        .subscribe((res) => {console.log(res)},(error)=>{
          this.errormessage = error;
        })
    } else {
      this.missingField = true;
    }
  }

  deletePost() {
    this.httpClient.delete('/api/events/No Image').subscribe((res) => {console.log})
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage = '';
    if (error.status == 500) {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = `Backend returned an error. Please try again.`;
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = `Unexpected error. Please try again.`;
    }
    return throwError(() => new Error(errormessage));
  }
  
  logout() {
    localStorage.removeItem('currentUsername');
  }
}
