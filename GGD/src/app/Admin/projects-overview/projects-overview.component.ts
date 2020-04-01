import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { ProjectDataService } from 'src/app/services/ProjectData/project-data.service';
import { ProjectService } from 'src/app/services/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatabaseConnectionService } from 'src/app/services/Result-AdditionalInfo/database-connection.service';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.css']
})
export class ProjectsOverviewComponent implements OnInit {

  projects: ProjectService[] = []; // List of projects
  selectedItem: ProjectService; // Selected project
  selectedRow: number; // Selected row
  editMode:boolean = false; // Are we in edit mode

  // Load all the projects from the projectDataService
  constructor(public projectData: ProjectDataService, public dialog: MatDialog) {
    this.projectData.LoadProjects().subscribe(
      (data) => {this.projects = data;}
    );
   }
   // Load all the projects from the projectDataService
  ngOnInit() {
    //this.projectData.LoadProjects();
    this.projectData.LoadProjects().subscribe(
      (data) => {this.projects = data;}
    );
  }
  // Set the selected project
  public onClick(item) {
    this.selectedItem = item;
    console.log(this.selectedItem);
    this.openDialog();
  }

  // Open the dialog holding the selected project information
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialog,
      {
        width: '750px', // Size of the project Dialog
        // Give the data to the ProjectDialog class
        data: {projectId:this.selectedItem.projectId, name:this.selectedItem.name,location:this.selectedItem.location,
          imgResource:this.selectedItem.imgResource,description:this.selectedItem.description,
          size:this.selectedItem.size,beginDate:this.selectedItem.beginDate,endDate:this.selectedItem.endDate,editMode:this.editMode}
      });
  }

  removeFromList(toUpdate:Observable<ProjectService>){
    // toUpdate.subscribe(
    //   data => {
    //     console.log("Data = " + data.projectId);
    //     console.log(this.projects);
    //     let project = data;
    //     this.projects.splice( this.projects.findIndex(p => p.projectId == project.projectId),1);
    //     this.projects.push(project);
    //   }
    // );
  }

  setIndex(i) {
    this.selectedRow = i;
  }
}

@Component({
  selector: 'ProjectDialog',
  templateUrl: 'project-dialog.component.html',
  styleUrls: ['./dialog.css']
})
// The project dialog hols the information of the currently selected project
export class ProjectDialog {

  constructor(
    public connection:DatabaseConnectionService,public dialogRef: MatDialogRef<ProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public editdialog: MatDialog) {}

    // Gets called on the cancel button, closes the popup
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Opens the edit project pop up
  toggleEditMode() {
    const dialogRefEdit = this.editdialog.open(EditProjectDialog,
      {
        width: '750px',
        data: {allData: this.dialogRef.componentInstance.data}
      });
  }
  // Downloads the excel of the selected project
  downloadExcel(){
    console.log("downloading excel");
    this.connection.getExcelFileOfProject(this.data.projectId);
  }
}
@Component({
  selector: 'EditProjectDialog',
  templateUrl: 'edit-project-dialog.html',
  styleUrls: ['./dialog.css']
})
// The project edit dialog
export class EditProjectDialog implements OnInit{
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  current:ProjectService = new ProjectService;
  name =  new FormControl;
  description = new FormControl;
  location = new FormControl;
  size = new FormControl;
  beginDate = new FormControl;
  endDate = new FormControl;

  constructor(public service:ProjectDataService,public projectOverview:ProjectsOverviewComponent,public dialogRefEdit: MatDialogRef<EditProjectDialog>, @Inject(MAT_DIALOG_DATA) public editData: any,
  private _ngZone: NgZone) {}

  // Closes the edit project dialog
  onNoClick(): void {
    this.dialogRefEdit.close();
  }

  // Set all the variables to the selected project variables
  ngOnInit(){
    this.name.setValue(this.editData.allData.name,{});
    this.current.name = this.editData.allData.name;
    this.description.setValue(this.editData.allData.description,{});
    this.current.description = this.editData.allData.description;
    this.location.setValue(this.editData.allData.location,{});
    this.current.location = this.editData.allData.location;
    this.size.setValue(this.editData.allData.size,{});
    this.current.size = this.editData.allData.size;
    this.beginDate.setValue(this.editData.allData.beginDate,{});
    this.current.beginDate = this.editData.allData.beginDate;
    this.endDate.setValue(this.editData.allData.endDate,{});
    this.current.endDate = this.editData.allData.endDate;
  }

  // Set the variables to the new values and add the project to the list
  saveProject(){
    let project = this.service.GetProjectById(this.editData.allData.projectId);
    project.name = this.name.value;
    project.description = this.description.value;
    project.location = this.location.value;
    project.size = this.size.value;
    project.beginDate = this.beginDate.value;
    project.endDate = this.endDate.value;
    console.log(project);
    let observable = this.service.AddProject(project);
    this.projectOverview.removeFromList(observable);
    this.dialogRefEdit.close();
  }

  // Resize for the text areas
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
