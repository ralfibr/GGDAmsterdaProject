import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../module/employee';
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from '@angular/router';
import { UserService} from "../../services/user.service";
/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Employee detail component is the detail of each employee where the admin or employee can edit and delete an employee
 */

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
@Input() employeeIndex: number;
@Input() selectedEmployee: Employee;
employeelist: Employee[];

  constructor(private service: EmployeeService, private router: Router , private  activatedRoute: ActivatedRoute, private serviceUser: UserService) { }

  ngOnInit() {
    this.service.getEmployeeList().subscribe(
      (data) => {
        this.employeelist = data;
        console.log(data);
      }, (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      }
    );

  }

  /**
   * @param id
   * @param selected
   * Delete employee by giving his id to employee service
   */
 deleteEmployee( id: number, selected: string) {
   confirm('wil je zeker ' + selected + ' verwijderen?');
   this.service.removeEmployee(id).subscribe(
   );
 }

  /**
   * Update and save employee by giving the selected employee tp yhe employee servcie
   */
  save() {
      this.service.save(this.selectedEmployee);
  }

  /**
   * Create admin function
   * @param id
   */
  createAdmin(id) {
    this.serviceUser.save(this.selectedEmployee);
    this.service.removeEmployee(id).subscribe(
    );
  }
}
