import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from './login.component';
<<<<<<< HEAD
=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
>>>>>>> 3a6184e7 (create post and login/logout)

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
=======
      imports: [HttpClientTestingModule,
        FormsModule ],
>>>>>>> 3a6184e7 (create post and login/logout)
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< HEAD
  it('should create', () => {
    expect(component).toBeTruthy();
=======
  it('should get unit test value', () => {
    expect(component.unitTest).toBe(1);
>>>>>>> 3a6184e7 (create post and login/logout)
  });
});
