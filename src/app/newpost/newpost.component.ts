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
  userName = "";
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
      this.userName = localStorage.getItem("currentUsername");
    }
   }
   onPhotoSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
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

  parseEventDate() {
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
    //console.log(this.EventDate);
  }

  createPost() {
    this.parseEventDate();
    if(this.EventName != "" && this.EventDate != "" && this.EventTime != "" && this.EventLocation != "" && this.EventInterest != "") {
      this.missingField = false;
      this.httpClient.post('api/events/create/' + this.userName, {
        "Name": this.EventName,
        "Date": this.EventDate,
        "Time": this.EventTime,
        "Location": this.EventLocation,
        "Interests": this.EventInterest})
        .pipe(map((res)=> {
          console.log(res);
        }),
        catchError(this.handleError)
        )
        .toPromise()
        .then(() => {
          if (this.selectedImageFile != null) {
            console.log("image true");
            this.httpClient.get('api/events/create/' + this.userName)
            .subscribe((containers: any[]) => {
              let id = containers[containers.length - 1].ID;
              this.uploadImage(id);
            })
          }
        },
        (error)=>{
          this.errormessage = error;
        })
      
    } else {
      this.missingField = true;
    }
  }
  uploadImage(id: number) {
    
    const formData = new FormData();
    //formData.set("name", "myFile")
    //formData.set("file", this.selectedImageFile)
    formData.append("myFile", this.selectedImageFile);
    console.log("id: " + id);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    
    this.httpClient.post('api/upload/eventpicture/' + id, formData)
    .subscribe((res) => {console.log(res)})
    window.location.reload();
  }

  deletePost() {
    console.log(this.selectedImageFile.name)
    //this.httpClient.delete('/api/events/Test 2B').subscribe((res) => {console.log})
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