import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/AuthService/auth.service';

/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * SignUp component to implement the signUp function
 */

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router, private service: AuthService) {
  }

  admin: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  functie: string;

  ngOnInit() {
    this.admin = true;
  }

  /**
   * Navigate to the admin log in page
   */
  cancel() {
    this.router.navigate(['admin']);
  }


}
