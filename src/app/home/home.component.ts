import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { GlobalComponent } from '../global-component';

// <img src="../../assets/cen3031logo.PNG" alt="cinque terre" center>
=======
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
>>>>>>> 3a6184e7 (create post and login/logout)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loggedIn: boolean = false;
  userName = "";
  pfpurl: string = "";
<<<<<<< HEAD
=======
  unitTest = 1;
>>>>>>> 3a6184e7 (create post and login/logout)

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) {}
  
  ngOnInit() {
<<<<<<< HEAD
    this.loggedIn = GlobalComponent.globalStatus;
    this.userName = GlobalComponent.globalUsername;
    if (this.loggedIn) {
      console.log(this.userName + " logged in")
      this.httpClient.get('/api/users/' + this.userName)
      .subscribe((res) => {
        this.pfpurl = res['profilepicturepath']
=======
    if (localStorage.getItem("currentUsername") != null) {
      this.userName = localStorage.getItem("currentUsername");
      this.loggedIn = true;
      console.log(this.userName + " logged in")
      this.httpClient.get('/api/users/' + this.userName)
      .subscribe((res) => {
        if (res['profilepicturepath'] != "") {
          this.pfpurl = res['profilepicturepath']
        } else {
          this.pfpurl = "../../assets/defaultpfp.jpg"
        }
>>>>>>> 3a6184e7 (create post and login/logout)
      })
    }
  }

<<<<<<< HEAD
  createPost() {
    if (!this.loggedIn) {
      this._router.navigateByUrl('/login')
      return
    }
    
    this.httpClient.get('/api/users/' + this.userName)
    .subscribe((res) => {console.log(res['email'])})
  }

}
=======
  logout() {
    localStorage.removeItem('currentUsername');
  }
}
>>>>>>> 3a6184e7 (create post and login/logout)
