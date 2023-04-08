import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CampUs';

  constructor(private _router: Router) { }

  @HostListener("window:load", ["$event"])
  clearOnLoad() {
    let session = sessionStorage.getItem('session');
    if (session == null) {
      localStorage.removeItem('currentUsername');
    }
    sessionStorage.setItem('session', 'true');
  }
  
  //public clearStorage(): void {
  //  let session = sessionStorage.getItem('session');
  //  if (session == null) {
  //    localStorage.removeItem('currentUsername');
  //  }
  //  sessionStorage.setItem('session', 'true');
  //  
  //}
  //window.addEventListener('load', clearStorage);
}


