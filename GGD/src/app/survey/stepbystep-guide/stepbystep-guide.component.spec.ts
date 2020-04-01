import { By } from '@angular/platform-browser';
import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { StepbystepGuideComponent } from './stepbystep-guide.component';

describe('StepbystepGuideComponent', () => {
  let component: StepbystepGuideComponent;
  let fixture: ComponentFixture<StepbystepGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepbystepGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepbystepGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Unit Test #1 - Made by: Danial Iqbal, Study: Software Engineering and Class: iS202
  it('A Unit Test do determine if the component´s mainHeaderOfPage content is actually the same as we expect.', () => {
    expect(component).toBeTruthy();
    const expectedResult = 'Hoe werkt het?';
    const realResult = fixture.debugElement.nativeElement.querySelector('#mainHeaderOfPage');
    expect(realResult.innerHTML).toBe(expectedResult);
  });

  // Unit Test #2 - Made by: Danial Iqbal, Study: Software Engineering,  Class: iS202
  it('A Unit Test do determine if the component´s Numeric-button displays the same text as we expect.', () => {
    expect(component).toBeTruthy();
    const expectedResult = 'Ik heb een numerieke code ingevoerd.';
    const realResult = fixture.debugElement.nativeElement.querySelector('#numeric');
    expect(realResult.innerHTML).toBe(expectedResult);
  });

  // Unit Test #3 - Made by: Danial Iqbal, Study: Software Engineering,  Class: iS202
  it('A Unit Test do determine if the component´s QR-button redirects to the corresponding method (qrCodeDisplay)', async(() => {
    expect(component).toBeTruthy();
    spyOn(component, 'qrCodeDisplay');

    const qrCodeButton = fixture.debugElement.nativeElement.querySelector('#qr');
    qrCodeButton.click();

    fixture.whenStable().then(() => {
      expect(component.qrCodeDisplay).toHaveBeenCalled();
    });
  }));

  // Unit Test #4 - Made by: Danial Iqbal, Study: Software Engineering,  Class: iS202
  it('A Unit Test do determine if the component doesnt give a visual display of the explaination of the QR-code/Numeric method by default.', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.allSteps'))).toBeNull();
  });

  // Unit Test #5 - Made by: Danial Iqbal, Study: Software Engineering,  Class: iS202
  it('A Unit Test do determine if the component really displays the value of the Numeric Explaination when clicked on.', () => {
    expect(component).toBeTruthy();
    spyOn(component, 'numericDisplay');

    const numericButton = fixture.debugElement.nativeElement.querySelector('#numeric');
    numericButton.click();
    fixture.detectChanges();
    expect(component.showNumericExplaination.valueOf).toBeTruthy();
  });

  // Unit Test #6 - Made by: Danial Iqbal, Study: Software Engineering,  Class: iS202 - Doesn't work yet.
  // it('A Unit Test do determine if the component doesnt display the explaination of the QR-code/Numeric method by default.', () => {
  //   expect(component).toBeTruthy();
  //
  //   spyOn(component, 'numericDisplay');
  //   const numericButton = fixture.debugElement.nativeElement.querySelector('#numeric');
  //   numericButton.click();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.qrCodeDisplay).toHaveBeenCalled();
  //   });
  //
  //   const expectedResult = ' (Numeriek Nummer)';
  //   const realResult = component.chosenOption;
  //   fixture.detectChanges();
  //   expect(realResult).toBe(expectedResult);
  //   expect(realResult).toBeDefined();
  // });

  // Unit Test #7 - Made by: Danial Iqbal, Study: Software Engineering and Class: iS202
  it('A Unit Test do determine if the component´s FAQ-button displays the same text as we expect.', () => {
    expect(component).toBeTruthy();
    const expectedResult = 'Vragen &amp; Antwoorden';
    const realResult = fixture.debugElement.nativeElement.querySelector('#faq');
    expect(realResult.innerHTML).toBe(expectedResult);
  });

  // Unit Test #8 - Made by: Danial Iqbal, Study: Software Engineering and Class: iS202
  it('A Unit Test do determine if the component´s FAQ-button displays the same text as we expect.', () => {
    expect(component).toBeTruthy();
    const expectedResult = 'Vragen &amp; Antwoorden';
    const realResult = fixture.debugElement.nativeElement.querySelector('#faq');
    expect(realResult.innerHTML).toBe(expectedResult);
  });


  // Unit Test #8 - Made by: Danial Iqbal, Study: Software Engineering and Class: iS202
  it('A Unit Test do determine if header above the visual display remains undefined if no option is chosen.', () => {
    expect(component).toBeTruthy();
    expect(component.chosenOption).toBeUndefined();
  });

  // Unit Test #9 - Made by: Danial Iqbal, Study: Software Engineering and Class: iS202
  it('A Unit Test to check if te opposite option (when clicked on the Numeric-button) stays hidden.', async(() => {
    expect(component).toBeTruthy();

    const numericButton = fixture.debugElement.nativeElement.querySelector('#numeric');
    numericButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.showQrCodeExplaination).toEqual(false);
    });
  }));

  // Unit Test #10 - Made by: Danial Iqbal, Study: Software Engineering and Class: iS202
  it('A Unit Test do determine if the component´s headersOfParagraph (intro) is rendered in a H2 format.', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Intro');
  });
});
