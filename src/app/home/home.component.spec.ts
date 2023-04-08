import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

import { HomeComponent } from './home.component';
=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
>>>>>>> 3a6184e7 (create post and login/logout)

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
=======
      imports: [HttpClientTestingModule,
        FormsModule ],
>>>>>>> 3a6184e7 (create post and login/logout)
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< HEAD
  it('should create', () => {
    expect(component).toBeTruthy();
=======
  it('should get expected value', () => {
    expect(component.unitTest).toBe(1);
>>>>>>> 3a6184e7 (create post and login/logout)
  });
});
