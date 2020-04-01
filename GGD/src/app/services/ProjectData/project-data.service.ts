import { Injectable, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import * as TestJson from '../../../assets/testProject.json';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { tap, map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService implements OnInit{
  projects: ProjectService[] = [];
  backendProjects: ProjectService[] = [];
  temp:ProjectService = new ProjectService;
  selectedProject: ProjectService = new ProjectService;

  private PATH = 'http://localhost:8080/';

  testJson: any = (TestJson as any).default;
  // Load the projects and save them in the backendProjects array
  constructor(private httpClient: HttpClient) {
    this.LoadProjects().subscribe(
      (data) =>{this.backendProjects = data;})
  }
    // Load the projects and save them in the backendProjects array
    ngOnInit() {
      this.LoadProjects().subscribe(
        (data) =>{this.backendProjects = data;})
   }
  
  // Generate dummy projects to be used for testing
  public GenerateDummyData(){
      for(let i =0; i<10;i++){
        console.log("Generating");
        this.temp.projectId = i;
        this.temp.name = "TestName" + i;
        this.temp.imgResource = "assets/Img/jordaan.jpg";
        this.temp.description = "TestDescription" + i;
        this.temp.location = "TestLocation" + i;
        this.temp.size = 100;
        this.temp.beginDate = "Nu";
        this.temp.endDate = "Toekomst";
        this.projects.push(this.temp);
        this.temp = new ProjectService;
      }
  }
  // Get and return the observable from the backend
  LoadProjects(){
    return this.httpClient.get<ProjectService[]>(this.PATH + "projects");
  }
  // Loop through all the projects and see if one project's id matches the given id, if so return it else return null
  public GetProjectById(id:number){
    for(let i = 0; i < this.backendProjects.length; i ++){
        if(this.backendProjects[i].projectId == id){
          this.selectedProject = this.backendProjects[i];
          return this.selectedProject;
        }
    }
    return null;
  }
  // Delete the project with the corresponding id
  public removeProjectById(id:number){
    return this.httpClient.delete<ProjectService>(this.PATH + "projects/" + id);
  }
  // Return the path of the selected project image
  public getProjectImage() {
    return this.selectedProject.imgResource;
  }
  // Add a project and return the observable
  public AddProject(project:ProjectService){
    console.log("Project to be created: " + project);
    let observable = this.httpClient.post<ProjectService>(this.PATH + "projects",project).pipe(share());
    observable.subscribe((data) => {
      console.log('created ', data);
    },
    (err) => {
      console.log('creation error', err);
    });
    return observable;
  }
  // Return all the projects
  public getProjects(){
    return this.backendProjects;
  }
}
