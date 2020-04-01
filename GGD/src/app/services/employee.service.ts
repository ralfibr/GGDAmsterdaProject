import { Injectable } from '@angular/core';
import { Employee } from '../Admin/module/employee';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from "@angular/router";
/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Employee service send and receive employee data from the backend
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  aantalShares: number;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.aantalShares = 0;
  }

  /**
   *  Get employee list from spring boot backend
   */
 getEmployeeList() {
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees').pipe(catchError(this.handleError));
    this.getEmployeeList;

}

  /**
   * Remove an emoployee from backend by giving employee ID
   * @param id
   */
  public removeEmployee(id: number) {
    return this.httpClient.delete('http://localhost:8080/employees/' + id).pipe(catchError(this.handleError));
  }

  /**
   * Save employee in the backend by giving employee
   * @param employees
   */
  save(employees: Employee) {
    return this.httpClient.post('http://localhost:8080/employees/', employees).subscribe((data) => {
      console.log(data);
    },
    (error) => {
      alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
    }); }

  /**
   * Handle error
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    let message: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {

      message = error.error.message;
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 0) {
        message = 'backend error: status: ' + error.message;
      } else {
        message = 'backend error: status: ' + error.status + ' - ' + error.error.message;
      }

      console.error(message);
    }
    // return an observable with a user-facing error message
    return throwError(message);
  }

  /**
   * Here we make a copy from the invite employee link and copy it to the clipboard
   * @param inputElement
   */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    window.alert('link gekopieerd naar klembord');
    this.aantalShares ++;
    console.log(this.aantalShares);
  }
}
