/**
 * @Authors Mark van Manen & Danial Iqbal
 * Student ID: 500808973
 */

import {Component, OnInit} from '@angular/core';
import { User } from '../module/user';
import { UserService} from '../../services/user.service';
import {Employee} from '../module/employee';
import {EmployeeService} from '../../services/employee.service';


@Component({
  selector: 'app-alladmins-overview',
  templateUrl: './alladmins-overview.component.html',
  styleUrls: ['./alladmins-overview.component.css']
})

export class AlladminsOverviewComponent implements OnInit {
  showAddAdminScreen = false;
  showUpdateAdminScreen = false;

  private selectedItem: User;
  selectedEmployee: Employee;
  selectedRow: number;
  users: User[] = [ ];
  employees: Employee[] = [ ];

  constructor(private service: UserService, private serviceEmployee: EmployeeService) { }

  // OnInit will get a list of users and bind it to users so it can be shown in a form.
  ngOnInit() {
    this.service.getUserList().subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      }, (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      }
    );
  }

  // In this function it will call to the UserService to delete a user with the corresponding email and id.
  // It wil firstly ask to confirm if you are sure to delete this user.
  // Then it will use removeUser to delete it, and also find its corresponding index to remove it from the list users as well.
  // By removing it not just from the database but also from the list will make it so it will update right away, you dont have to refresh the page to see it has been deleted.
  deleteUser(email: string, selected: string, id: number) {
    confirm('Weet je zeker dat je ' + selected + ' wilt verwijderen?');
    this.service.removeUser(email, id).subscribe(
      data => {
        const uIndex = this.users.findIndex(u => u.id === id);
        this.users.splice(uIndex, 1);
      }
    );
  }

  save() {
    this.service.save(this.selectedItem);
  }

  setIndex(i) {
    this.selectedRow = i;
  }

  public onClick(item) {
    this.selectedItem = item;
  }

  addAdminScreenDisplay() {
    this.showUpdateAdminScreen = false;
    this.showAddAdminScreen = true;
  }

  updateAdminScreenDisplay(){
    this.showAddAdminScreen = false;
    this.showUpdateAdminScreen = true;
  }


}
