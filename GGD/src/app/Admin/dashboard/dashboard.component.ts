import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/AuthService/auth.service';
import {ProjectService} from "../../services/project.service";
import {ProjectDataService} from "../../services/ProjectData/project-data.service";
import {User} from "../module/user";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {InviteAdminComponent} from "../invite-admin/invite-admin.component";
/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Dashboard is the first page in admin control where the user can see how many projects and users an how many shares
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
antallprojecten: ProjectService[];
antall: number;
aantalUsers: number;
invite: InviteAdminComponent;
users: User[];
  constructor(private service: AuthService , private  projectService: ProjectDataService , private userService: UserService , private  employeService: EmployeeService) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(
      (data) => {
        this.aantalUsers = data.length
        this.users = data;
        console.log(data.length);
      }, (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      }
    );
    this.projectService.LoadProjects().subscribe(
      (data) => {this.antallprojecten = data;
                 data.length = this.antall; }
    );
    this.antallprojecten = this.projectService.backendProjects;
    this.antall = this.antallprojecten.length;
  }

}
