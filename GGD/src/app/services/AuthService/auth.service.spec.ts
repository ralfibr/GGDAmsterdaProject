import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpTestingController} from "@angular/common/http/testing";


describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
  }));

  it(' It should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
    httpMock = TestBed.get(HttpTestingController);
  });

});
