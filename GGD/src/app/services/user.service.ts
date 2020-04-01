/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import { Injectable} from '@angular/core';
import {User} from '../Admin/module/user';
import {HttpClient} from '@angular/common/http';

// This Angular annotation marks this class as being available to be injected as dependency.
// providedIn root is telling it that this injecatable should be provided in root.
@Injectable({
  providedIn: 'root'
})

// This UserService class is to bind to backend to the frontend.
export  class UserService {
  constructor(private httpClient: HttpClient) {
  }

  // This function will send a HTTP GET request through the repository to get a list of all users.
  getUserList() {
    return this.httpClient.get<User[]>('http://localhost:8080/users');
  }

  // This function will send 2 received paramters to a DELETE request.
  public removeUser(email: string, id: number) {
    return this.httpClient.delete('http://localhost:8080/users/' + email + '/' + id);
  }

  // This function will save a new user to the database by using the post method.
  // The subscribe method is used to wait for the observable User to load the array.
  save(users: User) {
    return this.httpClient.post('http://localhost:8080/users/', users).subscribe((data) => {
        console.log(data);
      },
      (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      }); }
}
