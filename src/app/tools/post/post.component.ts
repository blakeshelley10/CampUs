import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/home/home.component'
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @Input() postData: PostData;
  faved: boolean = false;
  public imgurl = '../../assets/cen3031logo.PNG';

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) {}
  
  ngOnInit() {
    this.httpClient.get('/api/events/profilepicture/' + this.postData.id)
    .subscribe((res) => {
      
    })

    //let idarray = [];
    //this.httpClient.get('/api/events/saved/' + localStorage.getItem('currentUsername'))
    //.subscribe((containers: any[]) => {
    //  containers.forEach((container, index) => {
    //    idarray.push(container.ID);
    //  })
    //})
    //const found = idarray.find(x => x.ID === this.postData.id)
    //  if(found) {
    //    this.faved = true;
    //  } else {
    //    this.faved = false;
    //  }
  }

  favEvent() {
    this.faved = !this.faved;
    this.postData.fav = this.faved;
    let user = localStorage.getItem("currentUsername");
    console.log(this.postData.id)
    console.log(this.faved)
    if (this.faved) {
      this.httpClient.post('/api/events/saved/' + user + '/' + this.postData.id, {})
      .subscribe((res) => {console.log("event saved")})
    }
  }
}
