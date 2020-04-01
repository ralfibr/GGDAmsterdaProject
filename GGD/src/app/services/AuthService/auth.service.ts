/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Auth service organised signIn and SignUp and checked if the user isAuthenticated for the admin panel
 *
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as admin from 'firebase-admin';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../../../models/user';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  currentUser: User = null;
  currentToken: string = null;
  jwtService = new JwtHelperService();

  signPath: string;
  constructor(   private httpClient: HttpClient, private router: Router  ) {
    this.updateUserInformation();
    this.signPath = 'http://localhost:8080/rest/auth';
  }

  /**
   * Here the user can signOn with his email and password and send request to the backend on path /rest/auth
   * @param email
   * @param password
   * @param targetUrl
   */
  public signOn(email: string, password: string, targetUrl?: string) {
    console.log('login' + email + '/' + password);
    const oObservable = this.httpClient.post<HttpResponse<User>>('http://localhost:8080/rest/auth',
      {email, password},
      {observe: 'response'});
    oObservable.subscribe(response => {
        console.log('logged in', response);
        let token = response.headers.get('Authorization');
        if (token == null) {
          throw new Error('token was not present in the response');
        }
        token = token.replace('Bearer,', 'Bearer');
        sessionStorage.setItem('token', token);

        this.updateUserInformation();
      },
      (err) => {
        console.log('authentication error', err);
        this.currentUser = null;
        this.currentToken = null;
      });

    return oObservable;
  }

  /**
   *Check if user is isAuthenticated , this methoud wil return a boolean 
   */
  isAuthenticated(): boolean {
    return this.currentUser != null;
  }

  /**
   * SignUp function to create new admin and send it to the backend
   * @param email
   * @param password
   * @param firstname
   * @param lastname
   * @param number
   * @param Function
   * @param district
   * @param admin
   * @constructor
   */
  SignUp(email: string, password: string , firstname: string , lastname: string , number: string , Function: string , district: string, admin: boolean ) {
    const observable = this.httpClient.post('http://localhost:8080/rest/auth/users', { email, password , firstname , lastname , number , Function , district , admin}).pipe(share());
    observable.subscribe((data) => {
        console.log('created ', data);
        this.router.navigateByUrl('admin');
      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;
  }

  /**
   * signoff from the admin panel
   */
  public async signOff() {
    sessionStorage.removeItem('token');
    this.updateUserInformation();
    this.router.navigateByUrl('admin');
  }

  /**
   * Get the current username
   */
  getUserName() {
    return this.currentUser.email;
  }

  /**
   * Keep token user information on update
   */
  private updateUserInformation() {
    this.currentToken = sessionStorage.getItem('token');
    if (this.currentToken) {
      const decodedToken = this.jwtService.decodeToken(this.currentToken);
      this.currentUser = new User();
      this.currentUser.email = decodedToken.sub;
    } else {
      this.currentUser = null;
    }
  }
}
