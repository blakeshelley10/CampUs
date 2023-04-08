import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
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
}
