/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thank-you-message',
  templateUrl: './thank-you-message.component.html',
  styleUrls: ['./thank-you-message.component.css']
})
export class ThankYouMessageComponent implements OnInit {
  // Hardcoded text for in the page
  algemeenText = 'Dit was het onderzoek van de GGD, door u input kunnen wij zorgen voor een Amsterdam dat beter bij de burger past.';
  gegevensText = 'Uw gegevens worden enkelt gebruikt om updates te sturen. Nadat het project is afgelopen worden u gegevens verwijderd.';

  constructor(private router: Router) { }

  // after 10 seconds redirect to home
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 10000);
  }

}
