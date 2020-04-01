import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InviteAdminComponent} from './invite-admin.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

/**
 * @author Hooshang Kooshani
 * Student number: 500809310
 */

describe('InviteAdminComponent', () => {
  let component: InviteAdminComponent;
  let fixture: ComponentFixture<InviteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteAdminComponent],
      imports: [HttpClientTestingModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test 1: Checks if it renders the title in a label tag
  it('checks if it renders the title in a label tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('Uitnodigingslink');
  });
  // test 2: Checks if link is correct
  it('checks if link is correct', () => {
    expect(component.link).toEqual('http://localhost:4200/signUp');
  });
  // test 3: Checks if correct text is displayed on copy button
  it('checks if link is correct', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('kopieer de link naar klembord');
  });
  // test 4: Checks if copyInputMessage() runs when button is clicked
  it('checks if link is correct', () => {
    spyOn(component, 'copyInputMessage');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.copyInputMessage).toHaveBeenCalled();
    });
  });
});
