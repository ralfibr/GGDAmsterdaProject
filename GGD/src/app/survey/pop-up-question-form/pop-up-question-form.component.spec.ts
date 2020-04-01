import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpQuestionFormComponent } from './pop-up-question-form.component';

describe('PopUpQuestionFormComponent', () => {
  let component: PopUpQuestionFormComponent;
  let fixture: ComponentFixture<PopUpQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
