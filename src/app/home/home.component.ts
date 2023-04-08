import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loggedIn: boolean = false;
  userName = "";
  pfpurl: string = "";
  unitTest = 1;

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) {}
  
  ngOnInit() {
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
      })
    }
  }

  logout() {
    localStorage.removeItem('currentUsername');
  }
}
