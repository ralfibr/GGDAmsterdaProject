import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/AuthService/auth.service';

/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Admin overview is the side navigation menu in the admin panel
 */
@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent implements OnInit {
  show: boolean;
  show2: boolean;
  user: string;
  showProjects: boolean;
  showEmployee: boolean;
  showAdmins: boolean;
  showResult: boolean;
  showQr: boolean;
  componentLink = '/admin';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = 'Welkom';
  }

  /**
   * toggels are used to give true or false boolean and if the property true then let the component visible
   */
  toggle() {
    this.show2 = false;
    this.show = !this.show;
    this.showProjects = false;
    this.showResult = false;
    this.showEmployee = false;
    this.showAdmins = false;
    this.showQr = false;
  }

  toggle1() {
    this.show = false;
    this.showProjects = false;
    this.showResult = false;
    this.showEmployee = false;
    this.showAdmins = false;
    this.show2 = !this.show2;
    this.showQr = false;
  }

  toggleAdmins() {
    this.show = false;
    this.showProjects = false;
    this.showResult = false;
    this.showEmployee = false;
    this.show2 = false;
    this.showAdmins = !this.showAdmins;
    this.showQr = false;
  }

  /**
   * check if the user logged in
   */
  isLogged() {
    return this.authService.isAuthenticated();
  }

  toggleProjects() {
    this.show = false;
    this.show2 = false;
    this.showProjects = !this.showProjects;
    this.showEmployee = false;
    this.showAdmins = false;
    this.showResult = false;
    this.showQr = false;
  }

  toggleDashboard() {
    this.show = false;
    this.showProjects = false;
    this.showAdmins = false;
    this.show2 = false;
    this.showEmployee = false;
    this.showResult = false;
    this.showQr = false;
  }

  toggleEmployee() {
    this.show = false;
    this.show2 = false;
    this.showProjects = false;
    this.showAdmins = false;
    this.showEmployee = !this.showEmployee;
    this.showResult = false;
    this.showQr = false;
  }

  toggleResult() {
    this.show = false;
    this.show2 = false;
    this.showProjects = false;
    this.showAdmins = false;
    this.showEmployee = false;
    this.showResult = !this.showResult;
    this.showQr = false;
  }
  toggleQr() {
    this.show = false;
    this.show2 = false;
    this.showProjects = false;
    this.showAdmins = false;
    this.showEmployee = false;
    this.showResult = false;
    this.showQr = !this.showQr;
  }
}
