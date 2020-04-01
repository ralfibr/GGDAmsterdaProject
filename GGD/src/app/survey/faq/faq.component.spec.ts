/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';
import {ResponsiveService} from "../../services/responsive.service";
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [ ResponsiveService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create test1', () => {
    expect(component).toBeTruthy();
  });
  //Test 1 made by Mark van Manen 500808973
  it('Test to check if there is a titelFaq.', () => {
    fixture.detectChanges();
    fixture.isStable();
    expect(component).toBeTruthy();
    const expected = 'FAQ';
    const result = fixture.nativeElement.querySelector('#titelFaq');
    expect(result.textContent).toContain(expected);
  });

  //Test 2 made by Mark van Manen 500808973
  it('Test to check if titelFaq has a header1 tag.', () => {
    fixture.detectChanges();
    const result = fixture.nativeElement.querySelector('h1');
    expect(result.textContent).toContain('FAQ');
  });

  //Test 3 made by Mark van Manen 500808973
  it('Test to check if it contains an image.', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const expected = 'assets/Images/GGD-GROEN.jpg';
    const result = fixture.nativeElement.querySelector('#image').src;
    expect(result).toContain(expected);
  });

  //Test 4 made by Mark van Manen 500808973
  it('Test to check if the dropdown menu has its standard value.', () => {
    expect(component).toBeTruthy();
    const expected = 'Leeg';
    const result = fixture.nativeElement.querySelector('#behulpzaam');
    expect(result.value).toEqual(expected);
  });

  //Test 5 made by Mark van Manen 500808973
  it('Test to check if the label for the dropdown is correct.', () => {
    expect(component).toBeTruthy();
    const expected = "Was dit behulpzaam?: ";
    const result = fixture.nativeElement.querySelector('#behulpzaamLabel');
    expect(result.textContent).toEqual(expected);
  });

  //Test 6 made by Mark van Manen 500808973
  it('Test to check if the submit button calls the correct function.', () => {
    expect(component).toBeTruthy();
    const button = fixture.nativeElement.querySelector('#buttonSubmit');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.submitFeedback).toHaveBeenCalled();
    });
  });

  //Test 7 made by Mark van Manen 500808973
  it('Test to check if a window alert is shown whenever there is no option selected.', () => {
    spyOn(window, 'alert');
    component.submitFeedback(0);
    expect(window.alert).toHaveBeenCalledWith('Selecteer een optie!');
  });

  //Test 8 made by Mark van Manen 500808973
  it('Test to check if the route will be changed when a valid option is selected and submitted.', () => {
    spyOn(component.router, 'navigateByUrl');
    component.submitFeedback(1);
    expect(component.router.navigateByUrl).toHaveBeenCalled();
  });

  //Test 9 made by Mark van Manen 500808973
  it('Test to check that it only accepts the 3 given options.', () => {
    spyOn(window, 'alert');
    component.submitFeedback(10);
    expect(window.alert).toHaveBeenCalledWith('Deze optie is niet toegestaan!');
  });

  //Test 10 made by Mark van Manen 500808973
  it('Test to check if all questions have the correct text.', () => {
    const question1 = fixture.nativeElement.querySelector('#Q1');
    const question2 = fixture.nativeElement.querySelector('#Q2');
    const question3 = fixture.nativeElement.querySelector('#Q3');
    const question4 = fixture.nativeElement.querySelector('#Q4');

    const question1Text = 'Wat is de Gezonde Groenwijzer?';
    const question2Text = 'Hoe ziet de Gezonde Groenwijzer er uit?';
    const question3Text = 'Hoe zie ik de resultaten van mij en mijn buurt?';
    const question4Text = 'Hoe vaak kan ik de vragenlijst invullen?';

    expect(question1.textContent).toBe(question1Text);
    expect(question2.textContent).toBe(question2Text);
    expect(question3.textContent).toBe(question3Text);
    expect(question4.textContent).toBe(question4Text);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
