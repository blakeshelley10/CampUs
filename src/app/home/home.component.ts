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
  posts: PostData[] = [];

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

    this.httpClient.get('/api/events')
      .subscribe((containers: any[]) => {
        containers.forEach((container, index) => {
          let post = new PostData;
          post.name = container.name;
          post.date = container.date;
          post.time = container.time;
          post.location = container.location;
          post.interests = container.interests;
          post.id = container.ID;
          //post.imageurl = container.imageurl;
          //post.fav = container.fav;
          this.posts.push(post);
          console.log(this.posts[index].id);
        })
      })
  }

  logout() {
    localStorage.removeItem('currentUsername');
  }

}

export class PostData {
  name: string;
  date: string;
  time: string;
  location: string;
  interests: string;
  id: string;
  imageurl: string;
  fav: string;
}