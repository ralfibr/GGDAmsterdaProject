import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPersonalInfoComponent } from './ask-personal-info.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

describe('AskPersonalInfoComponent', () => {
  let component: AskPersonalInfoComponent;
  let fixture: ComponentFixture<AskPersonalInfoComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AskPersonalInfoComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskPersonalInfoComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Check if paragraph contains thank you message
  // Unit test 9 writen by Teun Stout -> 500807530
  it('Check if paragraph containt (TEST 9)', () => {
    fixture.detectChanges();
    const expectedtext = fixture.nativeElement.querySelector('p');
    expect(expectedtext.textContent).toContain('Hartelijk bedankt');
  });

  // check if router is beeing called
  // Unit test 10 writen by Teun Stout -> 500807530
  it('Test if the router is being called (TEST 10)', () => {
    spyOn(component.router, 'navigateByUrl');
    component.navigateToSurvey();
    expect(component.router.navigateByUrl).toHaveBeenCalled();
  });
});
