/**
 * Main @Author: Danial Iqbal.
 * Class: iS202.
 * Project: Enterprise Web Application.
 */

/**
 * Partial @Author: Mark van Manen.
 * Class: iS202.
 * Project: Enterprise Web Application.
 */

/**
 * Partial @Author: Teun Stout.
 * Class: iS202.
 * Project: Enterprise Web Application.
 */

import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopUpQuestionFormComponent } from '../pop-up-question-form/pop-up-question-form.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { QuestionsurveyDataService } from '../../services/QuestionSurveyData/questionsurvey-data.service';
import { EnumNamingMartixService } from '../../services/Result-AdditionalInfo/enum-naming-martix.service';
import { MatrixService } from '../../services/Result-AdditionalInfo/matrix.service';
import { DatabaseConnectionService } from '../../services/Result-AdditionalInfo/database-connection.service';
import { ProjectDataService } from '../../services/ProjectData/project-data.service';
import {Subscription} from 'rxjs';
import {error} from "util";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})

export class QuestionFormComponent implements OnInit {
  // Mark van Manen
  private cookieValue: string;
  // Danial Iqbal
  private images = [];
  private imagesSubscription: Subscription;
  private currentIndexToShow: number = 0;
  private showNextQuestionButton = true;
  private showPreviousQuestionButton = false;
  private showSumbitButton = false;
  // Teun Stout
  valueOfSlider = 1;

  // Danial Iqbal
  // All entities from the question form stored in different variables.
  natureSubject: string = 'Natuur Beleven';
  gardeningSubject: string = 'Tuinieren';
  restAndRelaxationSubject: string = 'Rust & Ontspanning';
  meetingSubject: string = 'Ontmoeten';
  movingSubject: string = 'Bewegen';

  // Danial Iqbal
  // All descriptions from the entities above stored in different variables.
  natureDescription: string = 'U vindt het belangrijk dat u in het groen in uw buurt de natuur kunt beleven. Bijvoorbeeld door het zien van mooie herfstkleuren of voorjaarsbloeiers. U bent graag in contact met de natuur, bijvoorbeeld door naar vogels, bijen of vlinders te kijken en te luisteren. U kunt ook denken aan lekkere geuren, zoals van geurige bloemen of paddenstoelen.';
  meetingDescription: string = 'U vindt het fijn als het groen in uw buurt ontmoeten stimuleert. Bijvoorbeeld doordat u gemakkelijk buurtgenoten tegenkomt en een praatje met ze kan maken. U kunt ook denken aan plekken om af te spreken met vrienden en familie, of plekken waar activiteiten voor de buurt georganiseerd kunnen worden.';
  restAndRelaxationDescription: string = 'U vindt het belangrijk dat het groen in uw buurt rust en ontspanning biedt. Dit kan bijvoorbeeld zijn omdat het er stil is. Of doordat het u de mogelijkheid biedt om even weg te zijn van thuis. U kunt er even rustig in het zonnetje zitten. U kunt ontspannen naar andere mensen kijken op een prettige plek.';
  movingDescription: string = 'U vindt het belangrijk dat het groen in uw buurt de mogelijkheid biedt om te bewegen. Bijvoorbeeld door wandel- en fietsroutes, een plek om de hond uit te laten, een plek waar gespeeld kan worden of een plek om te sporten.';
  gardeningDescription: string = 'U vindt het belangrijk dat u zelf kunt tuinieren in het groen in uw buurt. Tuinieren kan u het gevoel geven dat u nuttig bezig bent en dat u dicht bij de natuur staat. Denk aan het onderhouden van een (moes)tuin of zaadjes planten en zien groeien. U leert over de natuur. Er kunnen verschillende kleurrijke planten en bloemen zijn. U kunt dit ook samen met anderen doen.';

  // Danial Iqbal
  // All possible choises from the preference meter stored in different variables.
  strongPreferenceChoise: string = 'Sterke Voorkeur';
  lightPreferenceChoise: string = 'Lichte Voorkeur';
  neutralPreferenceChoise: string = 'Neutrale Voorkeur';

  // Danial Iqbal
  // All entities or so called 'subjects' from the question form stored in tuple.
  allSubjects: [string[], string[], string[], string[], string[], string[], string[], string[], string[], string[]] =
    [
      [this.natureSubject, this.gardeningSubject],
      [this.restAndRelaxationSubject, this.meetingSubject],
      [this.natureSubject, this.movingSubject],
      [this.gardeningSubject, this.restAndRelaxationSubject],
      [this.meetingSubject, this.movingSubject],
      [this.gardeningSubject, this.meetingSubject],
      [this.restAndRelaxationSubject, this.natureSubject],
      [this.movingSubject, this.gardeningSubject],
      [this.natureSubject, this.meetingSubject],
      [this.movingSubject, this.restAndRelaxationSubject]
    ];

  // Danial Iqbal
  // All descriptions of the entities stored above stored in a tuple.
  allDescriptionsOfAllSubjects: [string[], string[], string[], string[], string[], string[], string[], string[], string[], string[]] =
    [
      [this.natureDescription, this.gardeningDescription],
      [this.restAndRelaxationDescription, this.meetingDescription],
      [this.natureDescription, this.movingDescription],
      [this.gardeningDescription, this.restAndRelaxationDescription],
      [this.meetingDescription, this.movingDescription],
      [this.gardeningDescription, this.meetingDescription],
      [this.restAndRelaxationDescription, this.natureDescription],
      [this.movingDescription, this.gardeningDescription],
      [this.natureDescription, this.meetingDescription],
      [this.movingDescription, this.restAndRelaxationDescription]
    ];

  // Danial Iqbal
  // All possible choises from the preference meter stored in an array.
  allChoises: string[] =
    [
      this.strongPreferenceChoise,
      this.lightPreferenceChoise,
      this.neutralPreferenceChoise,
      this.lightPreferenceChoise,
      this.strongPreferenceChoise
    ];

  constructor(
    // Danial Iqbal
    // Injecting the Dialog module and the QuestionsurveyDataService so we can approach them further on in the class.
    public dialog: MatDialog,
    private questionsurveyDataService: QuestionsurveyDataService,
    // Mark van Manen
    public router: Router,
    private cookie: CookieService,
    private enums: EnumNamingMartixService,
    private matrix: MatrixService,
    private database: DatabaseConnectionService,
    private thisProject: ProjectDataService
  ) {
    // Danial Iqbal
    // Subscribing to a data event of the observable because we need it in our question survey.
    this.imagesSubscription =
      this.questionsurveyDataService.
      getImages().
      subscribe(data => (this.images = data));
  }

  // Teun
  // on every next the data will be send to the matrix to instantiate it
  onNextSetMatrix() {
    const firstDicipline = this.enums.checkStringWithEnum(
      this.allSubjects[this.currentIndexToShow][0]
    );
    const secondDicipline = this.enums.checkStringWithEnum(
      this.allSubjects[this.currentIndexToShow][1]
    );

    // checks if value was moved, if not it's neutral and slider should == 0;
    if (
      this.valueOfSlider == null ||
      this.valueOfSlider == undefined ||
      this.valueOfSlider == 0
    ) {
      this.valueOfSlider = 1;
    }
    this.matrix.setMatrix(firstDicipline, this.valueOfSlider, secondDicipline);
  }

  // Teun
  updateValue(valueSlider: any) {
    this.valueOfSlider = valueSlider.value;
  }

  ngOnInit() {
    // Mark van Manen
    this.cookieValue = this.cookie.get('submitted');
  }

  // Danial Iqbal
  // Calling the pop-up component after clicking on the 'question mark' and transferring all relevant data.
  private openDialog() {
    this.dialog.open(PopUpQuestionFormComponent, {
      data: {
        allDescriptions: this.allDescriptionsOfAllSubjects[
          this.currentIndexToShow
          ],
        allSubjects: this.allSubjects[this.currentIndexToShow]
      }
    });
  }

  // Mark van Manen
  public checkCookie() {

    if (this.cookieValue === '1000') {
      window.alert('U hebt deze survey al eens voltooid.');
      this.router.navigateByUrl('');
    } else {
      this.cookie.set('submitted', '1');
    }

  }
  // Teun
  public SendMatrix() {
    this.onNextSetMatrix();                                                       // Save one matrix step
    this.matrix.ReciprocalMartix();                                               // Calculate the percentages
    this.matrix.setTemplateResultId(this.thisProject.selectedProject.projectId);  // set project id of matrix
    this.database.postIndividualResult(this.matrix.getTemplateResult());          // Save matrix
    this.database.getOverallResultOneProject(this.thisProject.selectedProject.projectId); // Get the projectdata beforehand

    // Danial Iqbal
    // Destroying our subscription after we are done with the question survey.
    this.ngOnDestroySubscription();
  }

  // Danial Iqbal
  // Unsubscribing from the imageSubscribtion.
  private ngOnDestroySubscription(): void {
    this.imagesSubscription.unsubscribe();
  }

  // Danial Iqbal
  // A function that determines what actions need to be taken if the 'next button' is clicked.
  private nextButtonClick() {
    // Teun
    this.onNextSetMatrix();

    // Danial Iqbal
    this.currentIndexToShow++;

    if (this.currentIndexToShow === 9) {
      this.showNextQuestionButton = false;
      this.showSumbitButton = true;
    }

    this.showPreviousQuestionButton = true;
  }

  // Danial Iqbal
  private previousButtonClick() {
    // Teun
    this.onNextSetMatrix();

    // Danial Iqbal
    this.currentIndexToShow--;

    if (this.currentIndexToShow === 0) {
      this.showPreviousQuestionButton = false;
    }

    if (this.currentIndexToShow > 0 && this.currentIndexToShow <= 8) {
      this.showPreviousQuestionButton = true;
      this.showSumbitButton = false;
      this.showNextQuestionButton = true;
    }
  }

}


