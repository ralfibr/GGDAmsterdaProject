import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  public isMobile = new Subject();
  public screenWidth: string;


  constructor() {
    this.checkWidth();
  }

  // gives true or false if it is a mobile or not
  onMobileChange(status: boolean) {
    this.isMobile.next(status);
  }

  // gets the status of window
  getMobileStatus(): Observable<any> {
    return this.isMobile.asObservable();
  }

  // checks the width of the window
  public checkWidth() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.screenWidth = 'sm';
      this.onMobileChange(true);
    } else {
      this.screenWidth = 'md';
    }
  }
}
