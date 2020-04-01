/**
 * Main @Author: Danial Iqbal.
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import {Component, Input, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-question-form',
  templateUrl: './pop-up-question-form.component.html',
  styleUrls: ['./pop-up-question-form.component.css'],


})
export class PopUpQuestionFormComponent implements OnInit {
  @Input() variabele: [string, string];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


}
