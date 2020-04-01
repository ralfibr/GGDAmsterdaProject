/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladminsOverviewComponent } from './alladmins-overview.component';
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";

describe('AlladminsOverviewComponent', () => {
  let component: AlladminsOverviewComponent;
  let fixture: ComponentFixture<AlladminsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlladminsOverviewComponent ],
      imports: [FormsModule],
      providers: [MatDialog, Overlay, HttpClient, HttpHandler, Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlladminsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test', () => {
    expect(component).toBeTruthy();
  });

  it('Test to check if the headerAdminOverzicht content is the same as we expect.', () => {
    expect(fixture).toBeTruthy();
    const expectedResult = 'Admin Overzicht';
    const realResult = fixture.debugElement.nativeElement.querySelector('#headerAdminOverzicht');
    expect(realResult.innerHTML).toBe(expectedResult);
  });

  it('Test to check if selectedEmployee remains undefined if no back-end is running.', () => {
    expect(component).toBeTruthy();
    expect(component.selectedEmployee).toBeUndefined();
  });
});
