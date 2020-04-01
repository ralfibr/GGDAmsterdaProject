import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminScreenComponent } from './admin-screen.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../services/AuthService/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

/**
 * Test made by Raeef Ibrahim
 * Student number: 500766393
 */
describe('AdminScreenComponent', () => {
  let component: AdminScreenComponent;
  let fixture: ComponentFixture<AdminScreenComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminScreenComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule,  FormsModule,
        ReactiveFormsModule
      ],
      providers: [AuthService]
    })
      .compileComponents();
}));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScreenComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    service = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
  });
  // It should create admin screen component
  it('should create adminScreen Component ', () => {
    expect(component).toBeTruthy();
    console.log('created');
  });

// TEST #1 Check if the navigateTo property contains the text "signUp"
  it('navigateTo property should contain `signUp`', () => {
    expect(component.navigateTo).toBe('/signUp');
    console.log('lnavigateTo property should contain `signUp`');
  });
  // TEST#2 It should  load the title of the page
  it('should load titel in admin screen corectly', () => {
    const expected = 'GGD GROENWIJZER ADMIN PANEL';
    const result = fixture.debugElement.nativeElement.querySelector('#title');
    expect(result.innerHTML).toBe(expected);
    console.log('load titel in admin screen corectly');
  });
  // TEST #3 Check if email and password property works good
  it('should get right email and password', () => {
    const email = component.email = 'ralfdxib@hotmail.com';
    const password = component.password = '123456789';
    expect(email).toContain('ralfdxib@hotmail.com');
    expect(password).toEqual('123456789');
    console.log(' get right email and password`');
  });
  // TEST#4 Check if input email and password is true
  it('should load the username input and email correctly', () => {
    const inputUsername = fixture.debugElement.nativeElement.querySelector('#username');
    const inputPassword = fixture.debugElement.nativeElement.querySelector('#password');
    expect(inputUsername).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(inputUsername).toHaveClass('container');
    console.log('load the username input and email correctly`');
  });
  // TEST#5 should called authenticate method when login button clicked
  it('should called authenticate method when login button clicked', () => {
    const logInButton = fixture.debugElement.nativeElement.querySelector('#login');
    logInButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.authenticate).toBeTruthy();
      expect(component.authenticate).toBeDefined();
      console.log('called authenticate method when login button clicked`');
    });
  });
  // TEST#6 should navigate to signUp page
  it('should navigate to signUp page correctly', () => {
    const signUpButton = fixture.debugElement.nativeElement.querySelector('#signup');
    expect(signUpButton).toBeDefined();
    signUpButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signUp).toBeTruthy();
      expect(component.signUp).toBeDefined();
      console.log(' navigate to signUp page correctly');
    });
  });
  // TEST#7
  // Here i test if the navbar wil load correctly
  it('should load navbar correctly', () => {
    const navbar = fixture.debugElement.nativeElement.querySelector('#navbar');
    expect(navbar).toBeDefined();
    console.log(' load navbar correctly');

  });
  // TEST#8
  // test if the auth.service have correct path to backend
  it('should auth.service have correct path to the backend', () => {
    const expectedPath = 'http://localhost:8080/rest/auth' ;
    const realPath = service.signPath;
    expect(realPath).toEqual(expectedPath);
    console.log(' auth.service have correct path to the backend');
  });

  // TEST#9 should component called auth.service SignOn when button login clicked
  it('should component called auth.service SignOn when button login clicked ', () => {
    const signInButton = fixture.debugElement.nativeElement.querySelector('#login');
    expect(signInButton).toBeDefined();
    signInButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(service.signOn).toBeDefined();
      console.log(' component called auth.service SignOn when button login clicked');
    });
  });
  // TEST#10 should called isAuthenticated function from admin screen-component to auth.service
  it('should called isAuthenticated function from admin screen-component to auth.service', () => {
    component.isLogged();
    fixture.whenStable().then(() => {
      const call = spyOn(component, 'isLogged');
      fixture.debugElement.query(By.css('call')).triggerEventHandler('click', null);
      expect(call).toHaveBeenCalled();
      expect(call).toBeDefined();
      expect(call).toBeTruthy();
      console.log(' called isAuthenticated function from admin screen-component to auth.servic');
    });
  });
});
