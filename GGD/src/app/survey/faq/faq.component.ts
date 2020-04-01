import { Component, OnInit } from '@angular/core';
import {ResponsiveService} from '../../services/responsive.service';
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  public isMobile: boolean;
  constructor(private responsiveService: ResponsiveService, public router: Router) {
  }

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();
    if (this.isMobile) {
      console.log('Mobile device detected');
    } else {
      console.log('Desktop detected');
    }
  }

  // resizes content if it is viewed on a mobile phone
  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  public submitFeedback(selectedValue: number ) {
    if (selectedValue === 0) {
      window.alert('Selecteer een optie!');
    } else if (selectedValue > 2){
      window.alert('Deze optie is niet toegestaan!');
    } else {
      this.router.navigateByUrl('/#');
    }
  }
}
