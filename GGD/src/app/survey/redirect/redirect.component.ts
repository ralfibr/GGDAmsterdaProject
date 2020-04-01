import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../../services/ProjectData/project-data.service';
import { ProjectService } from '../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  project: ProjectService;
  public projectCode;
  constructor(public projectData: ProjectDataService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const code = parseInt(this.route.snapshot.paramMap.get('code'));
    this.projectCode = code;
    //this.project = new ProjectService;
    this.projectData.LoadProjects();
    console.log(",mkkdsd");
    this.redirectQRCode(this.projectCode);
  }

  public redirectQRCode(code1: number) {
    setTimeout(() => {
      if (this.projectData.GetProjectById(code1) != null) {
        console.log(this.projectData.GetProjectById(code1));
        this.project = this.projectData.GetProjectById(code1);
        this.router.navigateByUrl("/home");
      } else {
        this.router.navigateByUrl("");
      }
    }, 500);

  }
}
