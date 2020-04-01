import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";

/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Invite admin with a link to the signUp page
 */

@Component({
  selector: 'app-invite-admin',
  templateUrl: './invite-admin.component.html',
  styleUrls: ['./invite-admin.component.css']
})
export class InviteAdminComponent implements OnInit {
link: string;
aantalShares: number;
  constructor(private employeeService: EmployeeService) {
    this.aantalShares = this.employeeService.aantalShares;
  }

  ngOnInit() {
    this.link = 'http://localhost:4200/signUp';
    this.aantalShares = 1;
  }

  /**
   * copy to clipboard function
   * @param inputElement
   */
  copyInputMessage(inputElement) {
   this.employeeService.copyInputMessage(inputElement);
  }
}
