import { Component } from '@angular/core';
import { GlobalComponent } from '../global-component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  pfpurl = "../../assets/defaultpfp.jpg"
}
