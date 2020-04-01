import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPageComponent } from './entry-page.component';
import { ProjectDataService } from '../../services/ProjectData/project-data.service';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { FormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

// Tests writen by Robert Neijmeijer -> 500808138
describe('EntryPageComponent', () => {
  let component: EntryPageComponent;
  let fixture: ComponentFixture<EntryPageComponent>;
  // const textHome = 'Welkom bij GGD Groenwijzer! <br><br> Amsterdam beoogt met dit project meer inzicht te krijgen in het effect van' +
  // ' ruimtelijke ingrepen, variërend van stadsparken tot kleine ‘green spots’ in de buurt, op de gezondheid van de' +
  // 'bewoners van de stad.';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntryPageComponent],
      imports: [FormsModule,RouterTestingModule,HttpClientModule],
      providers: [ProjectDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Test that the description is correct
  //Unit test 1 writen by Robert Neijmeijer -> 500808138
  it('We should have a description',() =>{
    fixture.detectChanges();
    fixture.isStable();
    expect(component).toBeTruthy();
    const expected = component.textHome;
    const real = fixture.nativeElement.querySelector('#description');
    expect(real.textContent).toContain(expected);

  });
  // Check that the description is in a paragraph
//Unit test 2 writen by Robert Neijmeijer -> 500808138
  it('Check that the description is in a paragraph',()=>{
    fixture.detectChanges();
    const real = fixture.nativeElement.querySelector('p');
    expect(real.textContent).toContain('Welkom');
  })

  //Test that we have the image
  //Unit test 3 writen by Robert Neijmeijer -> 500808138
  it('We should have an image',() =>{
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const expected = "assets/Img/amsterdam.jpg";
    const real = fixture.nativeElement.querySelector('#image').src;
    expect(real).toContain(expected);
  })
  // Test that the starting value of the input is empty (Equals to '')
//Unit test 4 writen by Robert Neijmeijer -> 500808138
  it('The input field shoulnt have a starting value', () =>{
    expect(component).toBeTruthy();
    const expected = '';
    const real = fixture.nativeElement.querySelector('#inputField');
    expect(real.value).toEqual(expected);
  })
  // Check that the placeholder text of the input field is correct
//Unit test 5 writen by Robert Neijmeijer -> 500808138
  it('Check that the placeholder of the input field is correct',()=>{
    expect(component).toBeTruthy();
    const expected = "Uw inlog code";
    const real = fixture.nativeElement.querySelector('#inputField');
    expect(real.placeholder).toEqual(expected);
  })
  // Check that when the submit button is clicked that the correct method is called
//Unit test 6 writen by Robert Neijmeijer -> 500808138
  it('Check that the button calls the correct method',()=>{
    expect(component).toBeTruthy();
    let button = fixture.nativeElement.querySelector('#submitButton');
    button.click();
    fixture.whenStable().then(()=>{
      expect(component.onCLickSubmit).toHaveBeenCalled();
    })
  })
  // Check that when the onClickSubmit is called we get a alert window if a wrong project code is given
//Unit test 7 writen by Robert Neijmeijer -> 500808138
  it('Check that a window alert is called when user has given a wrong project code',()=>{
    spyOn(window, 'alert');
    component.onCLickSubmit(865431);
    expect(window.alert).toHaveBeenCalledWith("Geen geldige project code!");
  })
  // Check that we are linked through if the user has enterd a correct project code
//Unit test 8 writen by Robert Neijmeijer -> 500808138
  it('Checks that we change route if a valid project code has been given',()=>{
    spyOn(component.router,'navigateByUrl');
    component.addProjectTest();
    component.onCLickSubmit(111);
    expect(component.router.navigateByUrl).toHaveBeenCalled();
    component.removeProjectTest();
  })
  // Check that the input field only accepts numbers
//Unit test 9 writen by Robert Neijmeijer -> 500808138
  it('The input should only accept numbers',()=>{
    let input = fixture.nativeElement.querySelector('#inputField');
    input.value = "ABCD";
    expect(input.value).toBe("");
    input.value = "123";
    expect(input.value).toBe("123");
  })
  // Check that the text on both the buttons is correct
//Unit test 10 writen by Robert Neijmeijer -> 500808138
  it('Checkt that both the buttons on the page hold the correct text',()=>{
    let buttonSubmit = fixture.nativeElement.querySelector("#submitButton");
    let buttonHowTo = fixture.nativeElement.querySelector("#buttonInstruction");

    let buttonSubmitText = "Submit";
    let buttonHowToText = "Hoe werkt het?";

    expect(buttonSubmit.textContent).toBe(buttonSubmitText);
    expect(buttonHowTo.textContent).toBe(buttonHowToText);
  })

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
