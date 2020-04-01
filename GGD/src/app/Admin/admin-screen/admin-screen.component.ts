import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/AuthService/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import {Subscription} from 'rxjs';

/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Admin screen component is the first page to the admin panel
 *  where the admin or employee can log in or navigate to signUp page
 */

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent implements OnInit {
  user: User = new User();
  returnUrl: string;
  error: string;
  signOnSubscription: Subscription;
  errorMessage: string;
  navigateTo: string;
  email: string;
  password: string;
  navigated: boolean;

  constructor(private service: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.returnUrl = params.return || '/');
    this.navigateTo = '/signUp';
    this.email = this.user.email;
    this.password = this.user.password;
  }

  /**
   * Invoke SignIn function in auth service
   */
  authenticate() {
    if (this.user.email && this.user.password) {
      this.signOnSubscription = this.service.signOn(this.user.email, this.user.password).subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('admin-overview');
        },
        (error) => {
          this.errorMessage = error.error.message;
        });
    }
    }

  /**
   * navigate to the signUp page
   */
  signUp() {
    this.router.navigateByUrl(this.navigateTo);
    this.navigated = !this.navigated;
}

  /**
   * check if the user is logged from auth service
   */
  isLogged() {
   return this.service.isAuthenticated();
}
}
