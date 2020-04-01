import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepbystep-guide',
  templateUrl: './stepbystep-guide.component.html',
  styleUrls: ['./stepbystep-guide.component.css']
})
export class StepbystepGuideComponent implements OnInit {
  public chosenOption: string;
  showQrCodeExplaination: boolean = false;
  showNumericExplaination: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  qrCodeDisplay() {
    this.chosenOption = ' (QR-Code)';
    this.showNumericExplaination = false;
    this.showQrCodeExplaination = true;

  }

  numericDisplay() {
    this.chosenOption = ' (Numeriek Nummer)';
    this.showQrCodeExplaination = false;
    this.showNumericExplaination = true;

  }

}
