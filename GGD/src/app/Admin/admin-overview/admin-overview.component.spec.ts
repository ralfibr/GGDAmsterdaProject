import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOverviewComponent } from './admin-overview.component';

describe('AdminOverviewComponent', () => {
  let component: AdminOverviewComponent;
  let fixture: ComponentFixture<AdminOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Check if the component has been compiled successfully
  it('should create the admin overview component', () => {
    expect(component).toBeTruthy();
  });

  it('componentLink property should contain /admin', () => {
    expect(component.componentLink).toBe('/admin');
  });
});
