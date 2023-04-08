import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Observable, of, from, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
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
    if (localStorage.getItem("currentUsername") == null) {
      this._router.navigateByUrl('/home')
    } else {
      this.loggedIn = true;
    }
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

  createPost() {
    if(this.EventName != "" && this.EventDate != "" && this.EventTime != "" && this.EventLocation != "" && this.EventInterest != "") {
      this.missingField = false;
      this.httpClient.post('api/events', {
        "Name": this.EventName,
        "Data": this.EventDate,
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
    this.httpClient.delete('/api/events/vef').subscribe((res) => {console.log})
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage = '';
    if (error.status == 500) {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = `Error somewhere`;
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
