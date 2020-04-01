import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QrcodeComponent} from './qrcode.component';
import {FormsModule} from '@angular/forms';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

/**
 * @author Hooshang Kooshani
 * Student number: 500809310
 */

describe('QrcodeComponent', () => {
  let component: QrcodeComponent;
  let fixture: ComponentFixture<QrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrcodeComponent],
      imports: [FormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // test 1: Checks if title is correct
  it('checks if title is correct', () => {
    expect(component.title).toEqual('QR Generator');
  });
  // test 2: Checks if it renders the title in a h1 tag
  it('checks if it renders the title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('QR Generator');
  });
  // test 3: Checks if it renders the text of the button in a button tag
  it('checks if it renders the text of the button in a button tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Generate QR code');
  });
  // test 4: checks if the Generate qr button displays the correct error message when nothing is filled in
  it('checks if the Generate qr button displays the correct error message when nothing is filled in', () => {
    spyOn(window, 'alert');
    component.qrcodename = '';
    component.generateQRCode();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid url');
  });
  // test 5: Check if download is working
  it('checks if download is working', () => {
    component.display = true;
    fixture.detectChanges();
    const a = spyOn(component, 'downloadImage');
    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', null);
    expect(a).toHaveBeenCalled();
  });
  // test 6: checks if input always starts empty
  it('checks if input always starts empty', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').textContent).not.toContain('');
  });
  // test 7: checks if button calls correct function
  it('Checks if the download button calls the downloadImage() function.', () => {
    expect(component).toBeTruthy();
    const button = fixture.nativeElement.querySelector('.buttonQR');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.downloadImage()).toHaveBeenCalled();
    });
  });
});
