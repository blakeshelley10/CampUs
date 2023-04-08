import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
>>>>>>> 3a6184e7 (create post and login/logout)
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
=======
      imports: [HttpClientTestingModule,
                FormsModule ],
>>>>>>> 3a6184e7 (create post and login/logout)
      declarations: [ SignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
