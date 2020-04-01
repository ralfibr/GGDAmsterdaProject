import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';
import { Employee } from '../module/employee';
import {EmployeeService} from '../../services/employee.service';

/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Employee overview component is the list of employees and when user
 * click on employee he get the employee detail info
 */

CUSTOM_ELEMENTS_SCHEMA.name.big();
@Component({
  selector: 'app-employee-overview',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.css']
})
export class EmployeeOverviewComponent implements OnInit {
private selectedItem: Employee;
selectedRow: number;
employees: Employee[] = [];
  constructor(private service: EmployeeService) { }

  ngOnInit() {
     this.service.getEmployeeList().subscribe(
      (data) => {
        this.employees = data;
        console.log(data);
      }, (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      }
    );
  }
  setIndex(i) {
    this.selectedRow = i;
  }

  public onClick(item) {
    this.selectedItem = item;
  }
}
