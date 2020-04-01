/**
 * Main @Author: Danial Iqbal.
 * Class: iS202.
 * Project: Enterprise Web Application.
 */

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Image} from '../image';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionsurveyDataService {
  private sourceURL: string = '../../../assets/testPictures.json';

  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get<Image[]>(this.sourceURL).pipe(catchError(this.handleError));
  }

  handleError(error) {
    if (error instanceof HttpErrorResponse) {
      console.log('An error occured on the serverside of the HTTPClient.');
    } else {
      console.log('An error occured on the clientside of the HTTPClient.');
    }

    return throwError(error);
  }

}

