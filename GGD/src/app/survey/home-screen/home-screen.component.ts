/** @Authors Teun Stout,  */
import { Component, OnInit, Input } from '@angular/core';
import { ProjectDataService } from '../../services/ProjectData/project-data.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  project:ProjectService;
  constructor(public projectData: ProjectDataService) {}

  ngOnInit() {
  }

}
