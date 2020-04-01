/** @author Teun Stout & Robert Neijmeijer
 * Class: iS202.
 * Project: Enterprise Web Application.
 */

import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../../services/ProjectData/project-data.service';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { Project } from '../../Admin/module/project';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent {
  // text for the start
  textHome = 'Welkom bij GGD Groenwijzer! Amsterdam beoogt met dit project meer inzicht te krijgen in het effect van' +
  ' ruimtelijke ingrepen, variërend van stadsparken tot kleine ‘green spots’ in de buurt, op de gezondheid van de' +
  'bewoners van de stad.';

  constructor(public projectData: ProjectDataService, public router: Router) { }

  public onCLickSubmit(code: number ) {
    let project: ProjectService;
    if (this.projectData.GetProjectById(code) != null) {
      this.router.navigateByUrl('/home');
      project = this.projectData.GetProjectById(code);
    } else {
      window.alert('Geen geldige project code!');
    }
  }

  public addProjectTest(){
    //this.projectData.AddProject(1,"Test","assets/Img/jordaan.jpg","This is a test Project","Nederland");
    let newProject = new ProjectService;
    newProject.projectId = 111;
    this.projectData.backendProjects.push(newProject)
  }

  public removeProjectTest(){
    this.projectData.backendProjects.pop();
  }

}
