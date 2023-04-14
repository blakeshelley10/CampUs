import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/home/home.component'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() postData: PostData;
  faved: boolean = false;

  favEvent() {
    this.faved = !this.faved;
  }
}
