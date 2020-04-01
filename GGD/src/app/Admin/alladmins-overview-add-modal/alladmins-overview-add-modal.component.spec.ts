import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladminsOverviewAddModalComponent } from './alladmins-overview-add-modal.component';

describe('AlladminsOverviewAddModalComponent', () => {
  let component: AlladminsOverviewAddModalComponent;
  let fixture: ComponentFixture<AlladminsOverviewAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlladminsOverviewAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlladminsOverviewAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
