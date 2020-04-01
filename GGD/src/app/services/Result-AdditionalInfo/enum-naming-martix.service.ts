/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EnumNamingMartixService {
  public REST_AND_RELAXATION = 0;       // Rust & Ontspanning
  public EXCERSISE = 1;                 // Bewegen
  public MEETING_PEOPLE = 2;            // Ontmoeten
  public GARDENING = 3;                 // Tuinieren
  public NATURE = 4;                    // Natuur beleven

  constructor() { }

  public checkStringWithEnum(name: string) {
    switch (name) {
      case 'Natuur Beleven':
        return this.NATURE;
      case 'Tuinieren':
        return this.GARDENING;
      case 'Rust & Ontspanning':
        return this.REST_AND_RELAXATION;
      case 'Ontmoeten':
        return this.MEETING_PEOPLE;
      case 'Bewegen':
        return this.EXCERSISE;
      default:
        return null;
    }
  }
}
