/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import { Injectable } from '@angular/core';
import { DatabaseConnectionService } from './database-connection.service';
import { MatrixService } from './matrix.service';
import { async } from '@angular/core/testing';
import { timeout } from 'rxjs/operators';
import { TemplateResultService } from './template/Template-result.service';

@Injectable({
  providedIn: 'root'
})
export class BarchartDataService {

  private pieChartLabels: string[] = ['Rust & Ontspanning', 'Bewegen', 'Ontmoeten', 'Tuinieren ', 'Natuur beleven'];  // labels chart
  private pieChartDataOverall: number[];                                                                              // label for overall data
  private pieChartDataIndividual: number[];                                                                           // label for indivdual data
  private pieChartDataAdmin: number[];

  constructor(private database: DatabaseConnectionService, private matrix: MatrixService) { }

  getLabelsPiechart() {
    return this.pieChartLabels;
  }

  // Teun Stout
  // Individual data from matrix service
  getIndividualData() {
    this.pieChartDataOverall = [
      Math.floor(this.matrix.getTemplateResult().gardening),
      Math.floor(this.matrix.getTemplateResult().nature),
      Math.floor(this.matrix.getTemplateResult().restAndRelaxation),
      Math.floor(this.matrix.getTemplateResult().meetingPeople),
      Math.floor(this.matrix.getTemplateResult().exercise)
    ];
    return this.pieChartDataOverall;
  }
  // Teun Stout
  // Overall data from all the projects
  getOverallData() {
    this.pieChartDataIndividual = [
      Math.floor(this.database.totalResultOneProject.gardening),
      Math.floor(this.database.totalResultOneProject.nature),
      Math.floor(this.database.totalResultOneProject.restAndRelaxation),
      Math.floor(this.database.totalResultOneProject.meetingPeople),
      Math.floor(this.database.totalResultOneProject.exercise)
    ];
    return this.pieChartDataIndividual;
  }

  // totalresultoneproject als variable
  getProjectDataAdmin(projectid: number) {

    this.database.getOverallResultOneProject(projectid);
    this.pieChartDataAdmin = [
      Math.floor(this.database.totalResultOneProject.gardening),
      Math.floor(this.database.totalResultOneProject.nature),
      Math.floor(this.database.totalResultOneProject.restAndRelaxation),
      Math.floor(this.database.totalResultOneProject.meetingPeople),
      Math.floor(this.database.totalResultOneProject.exercise)
    ];

  }

  getOveralData() {
    this.database.getOverallData();
    this.pieChartDataIndividual = [
      Math.floor(this.database.overaalresult.gardening),
      Math.floor(this.database.overaalresult.nature),
      Math.floor(this.database.overaalresult.restAndRelaxation),
      Math.floor(this.database.overaalresult.meetingPeople),
      Math.floor(this.database.overaalresult.exercise)
    ];
    return this.pieChartDataIndividual;
  }

}
