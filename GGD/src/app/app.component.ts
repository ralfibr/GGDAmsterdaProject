import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GGD';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC57vLgducP7P0ckMy0Uf_nuv59_UZ9cPM',
      authDomain: 'ewaproject-981b5.firebaseapp.com',
    });
  }

}
