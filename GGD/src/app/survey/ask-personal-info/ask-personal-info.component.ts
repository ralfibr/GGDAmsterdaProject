/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from 'src/app/services/ProjectData/project-data.service';
import { MatrixService } from 'src/app/services/Result-AdditionalInfo/matrix.service';
import { NgForm } from '@angular/forms';
import { TempAdditionalInfoService } from 'src/app/services/Result-AdditionalInfo/template/temp-additional-info.service';
import { DatabaseConnectionService } from 'src/app/services/Result-AdditionalInfo/database-connection.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-ask-personal-info',
  templateUrl: './ask-personal-info.component.html',
  styleUrls: ['./ask-personal-info.component.css']
})
export class AskPersonalInfoComponent {
  private projectName;                                                                // name of project
  private additonalInfo: TempAdditionalInfoService = new TempAdditionalInfoService(); // instance of info template

  constructor(private projectData: ProjectDataService, private database: DatabaseConnectionService, public router: Router) {
    this.projectName = projectData.selectedProject.name;
  }

  // Gets called if you go to the next page
  additionalinfo(form: NgForm) {
    // Checks if you want to go give information
    if (form.form.value.checkBox !== true) {
      // If yes put the data in a variable and send it to the database connection where they send it to the database
      this.additonalInfo.idProject = this.projectData.selectedProject.projectId;
      this.additonalInfo.email = form.form.value.emailAdress;
      this.additonalInfo.age = form.form.value.age;
      this.additonalInfo.gender = form.form.value.gender;
      this.additonalInfo.postal = form.form.value.postal;
      this.database.postInformationUser(this.additonalInfo);
    }
  }

  public navigateToSurvey() {
    console.log('Methode Called');
    // tslint:disable-next-line: no-unused-expression
    this.router.navigateByUrl('/survey');
  }
}
