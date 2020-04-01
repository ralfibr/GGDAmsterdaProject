/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TemplateResultService } from './template/Template-result.service';
import { TempAdditionalInfoService } from './template/temp-additional-info.service';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {

  private DATABASE_PATH = 'http://localhost:8080/';
  public totalResultOneProject: TemplateResultService = new TemplateResultService();
  private _overaalresult: TemplateResultService;

  constructor(private http: HttpClient) { }

  // download an excel
  getExcelFileOfProject(projectCode: number) {
    const connection = this.http.get(this.DATABASE_PATH + 'result/excel/' + projectCode);
    connection.subscribe(
      (Response) => {
        console.log(Response);
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  // Average of a result
  getOverallResult(): Observable<TemplateResultService> {
    this.totalResultOneProject.projectId = -1;
    const connection = this.http.get<TemplateResultService>(this.DATABASE_PATH + 'result/all');
    connection.subscribe(
      Response => {
        console.log('OVerall Results => ' + Response);
        this.totalResultOneProject.projectId = Response.projectId;
        this.totalResultOneProject.restAndRelaxation = Response.restAndRelaxation;
        this.totalResultOneProject.exercise = Response.exercise;
        this.totalResultOneProject.gardening = Response.gardening;
        this.totalResultOneProject.meetingPeople = Response.meetingPeople;
        this.totalResultOneProject.nature = Response.nature;
      },
      error => {
        console.log(error);
      }
    );
    return connection;
  }
  // Result of 1 project
  getOverallResultOneProject(projectid: number) {
    const connection = this.http.get<TemplateResultService>(this.DATABASE_PATH + 'result/all/' + projectid);
    connection.subscribe(
      Response => {
        console.log('OVerall Results => ' + Response);
        this.totalResultOneProject.projectId = Response.projectId;
        this.totalResultOneProject.restAndRelaxation = Response.restAndRelaxation;
        this.totalResultOneProject.exercise = Response.exercise;
        this.totalResultOneProject.gardening = Response.gardening;
        this.totalResultOneProject.meetingPeople = Response.meetingPeople;
        this.totalResultOneProject.nature = Response.nature;
      },
      error => {
        console.log(error);
      }
    );
    return connection;
  }

  getOverallData() {
    const connection = this.http.get<TemplateResultService>(this.DATABASE_PATH + 'result/all/');
    connection.subscribe(
      Response => {

        console.log('OVerall Results => ' + Response);
        this._overaalresult = Response;
      },
      error => {
        console.log(error);
      }
    );
  }
  // save individual result
  public postIndividualResult(result: TemplateResultService) {
    const connection = this.http.post<HttpResponse<TemplateResultService>>(this.DATABASE_PATH + 'result/saveR', result);
    connection.subscribe(
      Response => {
        console.log(Response);
      },
      error => {
        console.log(error);
      }
    );
  }

  // Save user information if user want's to do this
  public postInformationUser(info: TempAdditionalInfoService) {
    const connectionInformation = this.http.post<HttpResponse<TemplateResultService>>(this.DATABASE_PATH + 'result/saveI', info);
    console.log(info);
    connectionInformation.subscribe(
      Response => {
        console.log(Response);
      },
      error => {
        console.log(error);
      }
    );
  }

  get overaalresult(): TemplateResultService {
    return this._overaalresult;
  }
}
