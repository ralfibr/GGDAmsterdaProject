import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouMessageComponent } from './thank-you-message.component';
import {MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";

describe('ThankYouMessageComponent', () => {
  let component: ThankYouMessageComponent;
  let fixture: ComponentFixture<ThankYouMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankYouMessageComponent ],
      providers: [Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create teej', () => {
    expect(component).toBeTruthy();
  });

});
