<<<<<<< HEAD
import { Component } from '@angular/core';
import { GlobalComponent } from '../global-component';
=======
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
>>>>>>> 3a6184e7 (create post and login/logout)

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
<<<<<<< HEAD
export class ProfileComponent {
  pfpurl = "../../assets/defaultpfp.jpg"
=======
export class ProfileComponent implements OnInit {
  pfpurl = ""
  user = localStorage.getItem('currentUsername');
  
  constructor(
    private httpClient : HttpClient,
    private _router: Router
   ) {}

  ngOnInit() {
    if (localStorage.getItem("currentUsername") == null) {
      this._router.navigateByUrl('/home')
    }
  }
>>>>>>> 3a6184e7 (create post and login/logout)
}
