import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { GlobalComponent } from '../global-component';

// <img src="../../assets/cen3031logo.PNG" alt="cinque terre" center>

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loggedIn: boolean = false;
  userName = "";
  pfpurl: string = "";
<<<<<<< Updated upstream

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) {}
  
  ngOnInit() {
    this.loggedIn = GlobalComponent.globalStatus;
    this.userName = GlobalComponent.globalUsername;
    if (this.loggedIn) {
      console.log(this.userName + " logged in")
      this.httpClient.get('/api/users/' + this.userName)
      .subscribe((res) => {
        this.pfpurl = res['profilepicturepath']
      })
    }
  }

  createPost() {
    if (!this.loggedIn) {
      this._router.navigateByUrl('/login')
      return
    }
    
    this.httpClient.get('/api/users/' + this.userName)
    .subscribe((res) => {console.log(res['email'])})
  }
=======
  unitTest = 1;
>>>>>>> Stashed changes

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) {}
  
  ngOnInit() {
    this.loggedIn = GlobalComponent.globalStatus;
    this.userName = GlobalComponent.globalUsername;
    if (this.loggedIn) {
      console.log(this.userName + " logged in")
      this.httpClient.get('/api/users/' + this.userName)
      .subscribe((res) => {
        this.pfpurl = res['profilepicturepath']
      })
    }
  }

  createPost() {
    if (!this.loggedIn) {
      this._router.navigateByUrl('/login')
      return
    }
    
    this.httpClient.get('/api/users/' + this.userName)
    .subscribe((res) => {console.log(res['email'])})
  }

}